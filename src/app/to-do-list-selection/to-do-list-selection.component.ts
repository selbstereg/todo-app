import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToDoList } from './model/to-do-list.model';
import { environment } from 'src/environments/environment';
import { take } from 'rxjs/operators';


@Component({
  selector: 'to-do-list-selection',
  templateUrl: './to-do-list-selection.component.html',
  styleUrls: ['./to-do-list-selection.component.css']
})
export class ToDoListSelectionComponent implements OnInit {
  
  private readonly TO_DO_LISTS_ENDPOINT_URL = environment.backendUrl + '/api/todo-lists';
  toDoLists: ToDoList[];

  constructor(private httpClient: HttpClient) {
  }
  
  ngOnInit(): void {
    this.fetchToDoLists();
  }

  fetchToDoLists() {
    this.httpClient.get(this.TO_DO_LISTS_ENDPOINT_URL).pipe(
      take(1)
    ).subscribe((body: ToDoList[]) => this.toDoLists = body);
  }
}
