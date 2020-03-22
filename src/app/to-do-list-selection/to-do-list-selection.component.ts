import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NamedEntity } from '../to-do-list/model/named-entity.model';
import { take } from 'rxjs/operators';
import { TO_DO_LISTS_ENDPOINT_URL, PLACEHOLDER_ADD_NEW_TO_DO_LIST } from '../common/constants';
import { ApiClient } from '../common/services/to-do-list.service';


@Component({
  selector: 'to-do-list-selection',
  templateUrl: './to-do-list-selection.component.html',
  styleUrls: ['./to-do-list-selection.component.css']
})
export class ToDoListSelectionComponent implements OnInit {
  
  @Output() selectToDoList = new EventEmitter<NamedEntity>();
  
  readonly ITEM_ADDER_PLACEHOLDER = PLACEHOLDER_ADD_NEW_TO_DO_LIST;
  toDoLists: NamedEntity[];

  // TODO: Remove httpClient and clean up class in general.
  constructor(private httpClient: HttpClient,
    private apiClient: ApiClient) {
  }
  
  ngOnInit(): void {
    this.fetchToDoLists();
  }

  fetchToDoLists() {
    this.apiClient.fetchToDoLists().subscribe((toDoLists: NamedEntity[]) => this.toDoLists = toDoLists);
  }

  onSelect(toDoList: NamedEntity) {
    this.selectToDoList.emit(toDoList);
  }

  onAddToDoList(listName: string) {
    this.apiClient.addToDoList(listName).subscribe((body: NamedEntity) => this.selectToDoList.emit(body));
  }

  // TODO: Add error toast, if list or to do can't be found
  deleteToDoList(toDoList: NamedEntity) {
    const url: string = TO_DO_LISTS_ENDPOINT_URL + toDoList.id;
    this.httpClient.delete(url).pipe(
      take(1)
    ).subscribe(() => this.fetchToDoLists());
  }
}
