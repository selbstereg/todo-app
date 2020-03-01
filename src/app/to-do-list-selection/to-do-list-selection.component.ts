import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NamedEntity } from '../to-do-list/model/named-entity.model';
import { environment } from 'src/environments/environment';
import { take } from 'rxjs/operators';
import { TO_DO_LISTS_ENDPOINT_URL } from '../common/constants';


@Component({
  selector: 'to-do-list-selection',
  templateUrl: './to-do-list-selection.component.html',
  styleUrls: ['./to-do-list-selection.component.css']
})
export class ToDoListSelectionComponent implements OnInit {
  
  private readonly ITEM_ADDER_PLACEHOLDER = "Neue To-Do Liste";

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
}
