import {Component, OnInit, Input, OnChanges, SimpleChanges} from '@angular/core';
import { faHeart } from '@fortawesome/fontawesome-free-regular'
import { NamedEntity } from './model/named-entity.model';
import { PLACEHOLDER_ADD_NEW_TO_DO, PRIORIZATION_DEBOUNCE_TIME_IN_MILLIS } from '../common/constants';
import { ToDo } from './model/to-do.model';
import { CrudClient } from '../common/services/crud-client.service';
import { MatDialog } from '@angular/material';
import { FavouriteEinkaufItems } from '../favourite-einkauf-items/favourite-einkauf-items.component';
import { filter } from 'rxjs/operators';
import { DebounceTimer } from '../common/utils/debounce-timer';
import { PriorityUpdate } from './drag-drop-list/drag-drop-list.component';

@Component({
  selector: 'to-do-list-page',
  templateUrl: './to-do-list-page.component.html',
  styleUrls: ['./to-do-list-page.component.css']
})
export class ToDoListPageComponent implements OnInit, OnChanges {
  
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
  }

  ngOnInit(): void {
    this.fetchToDos();
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (this.selectedToDoListChanged(changes)) {
      this.fetchToDos();
    }
  }
   
  onRefresh() {
    this.fetchToDos();
  }

  onPriorizationChanged(updates: PriorityUpdate[]): void {
    this.crudClient.updatePriorities(updates).subscribe(
      this.fetchToDos,
      this.fetchToDos
    );
  }

  // TODO: This is a hack. There should be to do list subtypes in the data model
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

  onToDoDeleted(toDoId: number): void {
    this.crudClient.deleteToDo(this.selectedToDoList.id, toDoId).subscribe(
      this.fetchToDos,
      this.fetchToDos
    );
  }

  private selectedToDoListChanged(changes: SimpleChanges) {
    return changes.selectedToDoList;
  }

}
