import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css']
})
export class ToDoListComponent implements OnInit {

  constructor(private httpClient: HttpClient,
    private changeDetector: ChangeDetectorRef) {
  }

  private readonly TODOS_ENDPOINT_URL = environment.backendUrl + '/api/todos';
  theInput = '';
  toDos = [];

  ngOnInit(): void {
    this.fetchToDos();
  }

  onAddToDoItem() {
    this.addToDoItem();
    this.theInput = '';
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

  printToConsole() {
    console.log(this.toDos);
  }

  private fetchToDos(): void {
    this.httpClient.get(this.TODOS_ENDPOINT_URL).pipe(
      take(1)
    ).subscribe((body: string[]) => this.toDos = body);
  }

  private addToDoItem(): void {
    this.httpClient.post(this.TODOS_ENDPOINT_URL, this.theInput).pipe(
      take(1)
    ).subscribe(() => this.fetchToDos());
  }

  private deleteToDoItem(itemToDelete: string): void {
    const itemId: number = this.toDos.findIndex((item) => item === itemToDelete);
    this.httpClient.delete(`${this.TODOS_ENDPOINT_URL}/${itemId}`).pipe(
      take(1)
    ).subscribe(() => this.fetchToDos());
  }

}
