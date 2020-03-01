import { Component, ChangeDetectorRef } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { NamedEntity } from './to-do-list/model/named-entity.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  readonly faBars = faBars;
  private sideNavOpened = false;
  private selectedToDoList: NamedEntity = null;

  openSideNav() {
    this.sideNavOpened = true;
  }

  closeSideNav() {
    this.sideNavOpened = false;
  }

  onSelectToDoList(toDoList: NamedEntity) {
    this.closeSideNav();
    this.selectedToDoList = toDoList;
  }
}
