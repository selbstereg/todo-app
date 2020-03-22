import {Component, OnInit, Input, OnChanges, SimpleChanges} from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NamedEntity } from './model/named-entity.model';
import { PLACEHOLDER_ADD_NEW_TO_DO } from '../common/constants';
import { ToDo } from './model/to-do.model';
import { ApiClient } from '../common/services/to-do-list.service';

@Component({
  selector: 'to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css']
})
export class ToDoListComponent implements OnInit, OnChanges {
  
  @Input() selectedToDoList: NamedEntity;

  readonly ITEM_ADDER_PLACEHOLDER = PLACEHOLDER_ADD_NEW_TO_DO;
  toDos: ToDo[] = [];
  
  constructor(private apiClient: ApiClient) {
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
    this.apiClient.fetchToDos(this.selectedToDoList.id).subscribe(
      (toDos: ToDo[]) => {
        this.toDos = toDos.reverse() // TODO: make the BE deliver the to dos in reverse order
      }
    );
  }

  addToDo(toDoName: string): void {
    const toDo: ToDo = { name: toDoName, priority: this.toDos.length, id: null };
    this.apiClient.addToDo(this.selectedToDoList.id, toDo).subscribe(() => this.fetchToDos());
  }

  deleteToDo(toDo: ToDo): void {
    this.apiClient.deleteToDo(this.selectedToDoList.id, toDo.id).subscribe(() => this.fetchToDos());
  }

  private selectedToDoListChanged(changes: SimpleChanges) {
    return changes.selectedToDoList;
  }

}
