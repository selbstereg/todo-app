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
  movies = [];

  ngOnInit(): void {
    this.fetchTodos();
  }

  onAddTodoItem() {
    this.addTodoItem();
    this.theInput = '';
  }

  onDeleteTodoItem(item): void {
    this.deleteTodoItem(item);
  }

  onRefresh() {
    this.fetchTodos();
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
  }

  printToConsole() {
    console.log(this.movies);
  }

  private fetchTodos(): void {
    this.httpClient.get(this.TODOS_ENDPOINT_URL).pipe(
      take(1)
    ).subscribe((body: string[]) => this.movies = body);
  }

  private addTodoItem(): void {
    this.httpClient.post(this.TODOS_ENDPOINT_URL, this.theInput).pipe(
      take(1)
    ).subscribe(() => this.fetchTodos());
  }

  private deleteTodoItem(itemToDelete: string): void {
    const itemId: number = this.movies.findIndex((item) => item === itemToDelete);
    this.httpClient.delete(`${this.TODOS_ENDPOINT_URL}/${itemId}`).pipe(
      take(1)
    ).subscribe(() => this.fetchTodos());
  }

}
