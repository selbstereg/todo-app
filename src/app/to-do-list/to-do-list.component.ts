import {Component, OnInit, Input, OnChanges, SimpleChanges} from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { faHeart } from '@fortawesome/fontawesome-free-regular'
import { NamedEntity } from './model/named-entity.model';
import { PLACEHOLDER_ADD_NEW_TO_DO, PRIORIZATION_DEBOUNCE_TIME_IN_MILLIS } from '../common/constants';
import { ToDo } from './model/to-do.model';
import { CrudClient } from '../common/services/crud-client.service';
import { MatDialog } from '@angular/material';
import { FavouriteEinkaufItems } from '../favourite-einkauf-items/favourite-einkauf-items.component';
import { filter } from 'rxjs/operators';
import { DebounceTimer } from '../common/utils/debounce-timer';

// TODO: This component does too many things. It should be split up.
@Component({
  selector: 'to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css']
})
export class ToDoListComponent implements OnInit, OnChanges {
  
  @Input() selectedToDoList: NamedEntity;

  readonly ITEM_ADDER_PLACEHOLDER = PLACEHOLDER_ADD_NEW_TO_DO;
  readonly faHeart = faHeart;
  priorizationDebounceTimer = new DebounceTimer(PRIORIZATION_DEBOUNCE_TIME_IN_MILLIS);
  toDos: ToDo[] = [];
  markedToDos: ToDo[] = [];
  isDragging = false;
  
  
  constructor(
    private crudClient: CrudClient,
    private dialogService: MatDialog
  ) {
    this.addToDo = this.addToDo.bind(this);
    this.fetchToDos = this.fetchToDos.bind(this);
    this.submitPriorityOrder = this.submitPriorityOrder.bind(this);
  }

  ngOnInit(): void {
    this.fetchToDos();
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (this.selectedToDoListChanged(changes)) {
      this.fetchToDos();
    }
  }
    
  onMouseDown() {
    this.isDragging = true;
  }

  onMouseUp() {
    this.isDragging =false
  }

  onRefresh() {
    this.fetchToDos();
  }

  // TODO: The logic to mark list items is duplicated (here and in favoureite-inkauf-items.component)
  onClickToDo(clickedToDo: ToDo) {
    if (this.isMarked(clickedToDo)) {
      this.markedToDos = this.markedToDos.filter(toDo => toDo !== clickedToDo);
    } else {
      this.markedToDos.push(clickedToDo);
    }
  }

  isMarked(clickedToDo: ToDo): boolean {
    return this.markedToDos.includes(clickedToDo);
  }

  styleMarkedToDos(toDo: ToDo) {
      return this.isMarked(toDo) ? 'marked-to-do' : '';
  }

  drop(event: CdkDragDrop<string[]>): void {
    this.isDragging = false;
    moveItemInArray(
      this.toDos,
      this.mapToReverseOrder(event.previousIndex),
      this.mapToReverseOrder(event.currentIndex)
    );
    this.priorizationDebounceTimer.stop();
    this.priorizationDebounceTimer.start(this.submitPriorityOrder);
  }

  mapToReverseOrder(index: number): number {
    return this.toDos.length - 1 - index;
  }

  submitPriorityOrder(): void {
    const updates: { toDoId: number, priority: number}[] = [];
    this.toDos.forEach(
      (toDo, index) => {
        if (toDo.priority !== index) {
          toDo.priority = index;
          updates.push({ toDoId: toDo.id, priority: toDo.priority });
        }
      }
    );
    if (updates.length && !this.isDragging) {
      this.crudClient.updatePriorities(updates).subscribe(
        this.fetchToDos,
        this.fetchToDos
      );
    }
  }

  toDoListIsEinkaufsliste(): boolean {
    return this.selectedToDoList.name.toUpperCase().includes('EINKAUF');
  }

  openFavouriteEinkaufItemsDialog(): void {
    this.dialogService.open(FavouriteEinkaufItems)
      .afterClosed()
      .pipe(
        filter(val => !!val)
      )
      .subscribe(
        (selectedItems: string[]) => selectedItems.forEach(this.addToDo)
      );
  }

  private fetchToDos(): void {
    this.crudClient.fetchToDos(this.selectedToDoList.id).subscribe(
      (toDos: ToDo[]) => {
        this.toDos = toDos
      }
    );
  }

  addToDo(toDoName: string): void {
    const toDo: ToDo = { name: toDoName, priority: this.calcHighestPrioPlusOne(), id: null };
    this.toDos.push(toDo);
    this.crudClient.addToDo(this.selectedToDoList.id, toDo).subscribe(
      this.fetchToDos,
      this.fetchToDos
    );
  }

  calcHighestPrioPlusOne(): number {
    const priorities: number[] = this.toDos.map(toDo => toDo.priority);
    if (!priorities.length) {
      return 0;
    }
    return Math.max(...priorities) + 1;
  }

  deleteToDo(toDo: ToDo): void {
    this.crudClient.deleteToDo(this.selectedToDoList.id, toDo.id).subscribe(
      this.fetchToDos,
      this.fetchToDos
    );
  }

  getToDosInReverseOrder(): ToDo[] {
    const toDosCopy = this.toDos.slice();
    return toDosCopy.reverse();
  }

  private selectedToDoListChanged(changes: SimpleChanges) {
    return changes.selectedToDoList;
  }

}
