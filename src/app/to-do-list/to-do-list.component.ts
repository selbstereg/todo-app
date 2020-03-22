import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Input, OnChanges, SimpleChanges} from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { NamedEntity } from './model/named-entity.model';
import { TO_DO_LISTS_ENDPOINT_URL, PLACEHOLDER_ADD_NEW_TO_DO } from '../common/constants';
import { ToDo } from './model/to-do.model';
import { ToDoListService } from '../common/services/to-do-list.service';

@Component({
  selector: 'to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css']
})
export class ToDoListComponent implements OnInit, OnChanges {
  
  @Input() selectedToDoList: NamedEntity;

  readonly TO_DOS_ENDPOINT_URL = environment.backendUrl + '/api/todos';
  readonly ITEM_ADDER_PLACEHOLDER = PLACEHOLDER_ADD_NEW_TO_DO;
  toDos: ToDo[] = [];
  
  constructor(private httpClient: HttpClient,
    private toDoListService: ToDoListService) {
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

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.toDos, event.previousIndex, event.currentIndex);
  }

  private fetchToDos(): void {
    console.log("fetching todos");
    this.toDoListService.fetchToDos(this.selectedToDoList.id).subscribe(
      (toDos: ToDo[]) => {
        this.toDos = toDos.reverse() // TODO: make the BE deliver the to dos in reverse order
        console.log("received todos");
      }
    );
  }

  addToDo(toDoName: string): void {
    console.log("Add todo");
    const toDo: ToDo = { name: toDoName, priority: this.toDos.length };
    this.toDoListService.addToDo(this.selectedToDoList.id, toDo).subscribe(() => this.fetchToDos());
  }

  deleteToDoItem(itemToDelete: NamedEntity): void {
    const url: string = TO_DO_LISTS_ENDPOINT_URL + this.selectedToDoList.id + '/to-dos/' + itemToDelete.id;
    this.httpClient.delete(url).pipe(
      take(1)
    ).subscribe(() => this.fetchToDos());
  }

  private selectedToDoListChanged(changes: SimpleChanges) {
    return changes.selectedToDoList;
  }

}
