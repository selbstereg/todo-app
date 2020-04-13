import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { NamedEntity } from './to-do-list-page/model/named-entity.model';
import { CrudClient } from './common/services/crud-client.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  readonly faBars = faBars;
  selectedToDoList: NamedEntity = null;
  sideNavOpened = false;
  listTitle = '';
  
  constructor(private crudClient: CrudClient) {
  }

  ngOnInit(): void {
    this.crudClient.fetchToDoLists().subscribe(
      (toDoLists: NamedEntity[]) => this.setSelectedToDoList(toDoLists[0])
    );
  }

  openSideNav() {
    this.sideNavOpened = true;
  }

  closeSideNav() {
    this.sideNavOpened = false;
  }

  setSelectedToDoList(toDoList: NamedEntity) {
    this.selectedToDoList = toDoList;
    this.listTitle = toDoList.name;
  }

  onSelectToDoList(toDoList: NamedEntity) {
    this.closeSideNav();
    this.setSelectedToDoList(toDoList);
  }
}
