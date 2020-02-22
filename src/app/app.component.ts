import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private httpClient: HttpClient,
              private changeDetector: ChangeDetectorRef) {
  }

  private readonly TODOS_ENDPOINT_URL = 'http://obscure-hollows-92479.herokuapp.com/api/todos';
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
