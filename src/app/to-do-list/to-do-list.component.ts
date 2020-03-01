import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Input} from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { NamedEntity } from './model/named-entity.model';

@Component({
  selector: 'to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css']
})
export class ToDoListComponent implements OnInit {

  constructor(private httpClient: HttpClient,
    private changeDetector: ChangeDetectorRef) {
  }

  private readonly TO_DOS_ENDPOINT_URL = environment.backendUrl + '/api/todos';
  private readonly ITEM_ADDER_PLACEHOLDER = "Neues To Do";
  @Input() selectedToDoList: NamedEntity;
  private toDos = [];

  ngOnInit(): void {
    this.fetchToDos();
  }

  onDeleteToDoItem(item): void {
    this.deleteToDoItem(item);
  }

  onRefresh() {
    this.fetchToDos();
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.toDos, event.previousIndex, event.currentIndex);
  }

  private fetchToDos(): void {
    this.httpClient.get(this.TO_DOS_ENDPOINT_URL).pipe(
      take(1)
    ).subscribe((body: string[]) => this.toDos = body);
  }

  private addToDoItem(toDoItem: string): void {
    this.httpClient.post(this.TO_DOS_ENDPOINT_URL, toDoItem).pipe(
      take(1)
    ).subscribe(() => this.fetchToDos());
  }

  private deleteToDoItem(itemToDelete: string): void {
    const itemId: number = this.toDos.findIndex((item) => item === itemToDelete);
    this.httpClient.delete(`${this.TO_DOS_ENDPOINT_URL}/${itemId}`).pipe(
      take(1)
    ).subscribe(() => this.fetchToDos());
  }

}
