import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NamedEntity } from '../to-do-list/model/named-entity.model';
import { environment } from 'src/environments/environment';
import { take } from 'rxjs/operators';
import { TO_DO_LISTS_ENDPOINT_URL, PLACEHOLDER_ADD_NEW_TO_DO_LIST } from '../common/constants';


@Component({
  selector: 'to-do-list-selection',
  templateUrl: './to-do-list-selection.component.html',
  styleUrls: ['./to-do-list-selection.component.css']
})
export class ToDoListSelectionComponent implements OnInit {
  
  private readonly ITEM_ADDER_PLACEHOLDER = PLACEHOLDER_ADD_NEW_TO_DO_LIST;

  @Output() selectToDoList = new EventEmitter<NamedEntity>();
  private toDoLists: NamedEntity[];

  constructor(private httpClient: HttpClient) {
  }
  
  ngOnInit(): void {
    this.fetchToDoLists();
  }

  fetchToDoLists() {
    this.httpClient.get(TO_DO_LISTS_ENDPOINT_URL).pipe(
      take(1)
    ).subscribe((body: NamedEntity[]) => this.toDoLists = body);
  }

  onSelect(toDoList: NamedEntity) {
    this.selectToDoList.emit(toDoList);
  }

  onAddToDoList(listName: string) {
    this.httpClient.post(TO_DO_LISTS_ENDPOINT_URL, listName).pipe(
      take(1)
    ).subscribe((body: NamedEntity) => this.selectToDoList.emit(body));
  }
}
