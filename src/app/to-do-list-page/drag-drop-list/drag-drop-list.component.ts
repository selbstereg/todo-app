import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { DebounceTimer } from 'src/app/common/utils/debounce-timer';
import { PRIORITIZATION_DEBOUNCE_TIME_IN_MILLIS } from 'src/app/common/constants';
import { ToDo } from '../model/to-do.model';
import { CrudClient } from 'src/app/common/services/crud-client.service';

export interface PriorityUpdate {
  toDoId: number;
  priority: number;
}

@Component({
  selector: 'drag-drop-list',
  templateUrl: './drag-drop-list.component.html',
  styleUrls: ['./drag-drop-list.component.css']
})
export class DragDropListComponent {

  @Input() toDos: ToDo[] = [];

  @Output() prioritizationChanged = new EventEmitter<PriorityUpdate[]>();
  @Output() toDoDeleted = new EventEmitter<number>();

  prioritizationDebounceTimer = new DebounceTimer(PRIORITIZATION_DEBOUNCE_TIME_IN_MILLIS);
  markedToDos: ToDo[] = [];
  isDragging = false;
  
  
  constructor(
    private crudClient: CrudClient,
  ) {
    this.submitPriorityOrder = this.submitPriorityOrder.bind(this);
  }
    
  onMouseDown() {
    this.isDragging = true;
  }

  onMouseUp() {
    this.isDragging =false
  }

  // TODO: The logic to mark list items is duplicated (here and in favoureite-inkauf-items.component)
  onClickToDo(clickedToDo: ToDo) {
    if (this.isMarked(clickedToDo)) {
      this.markedToDos = this.markedToDos.filter(toDo => toDo !== clickedToDo);
    } else {
      this.markedToDos.push(clickedToDo);
    }
  }

  isMarked(clickedToDo: ToDo): boolean {
    return this.markedToDos.includes(clickedToDo);
  }

  styleMarkedToDos(toDo: ToDo) {
      return this.isMarked(toDo) ? 'marked-to-do' : '';
  }

  drop(event: CdkDragDrop<string[]>): void {
    this.isDragging = false;
    moveItemInArray(
      this.toDos,
      this.mapToReverseOrder(event.previousIndex),
      this.mapToReverseOrder(event.currentIndex)
    );
    this.prioritizationDebounceTimer.stop();
    this.prioritizationDebounceTimer.start(this.submitPriorityOrder);
  }

  mapToReverseOrder(index: number): number {
    return this.toDos.length - 1 - index;
  }

  submitPriorityOrder(): void {
    const updates: PriorityUpdate[] = [];
    this.toDos.forEach(
      (toDo, index) => {
        if (toDo.priority !== index) {
          toDo.priority = index;
          updates.push({ toDoId: toDo.id, priority: toDo.priority });
        }
      }
    );
    if (updates.length && !this.isDragging) {
      this.prioritizationChanged.emit(updates);
    }
  }

  deleteToDo(toDo: ToDo): void {
    this.toDoDeleted.emit(toDo.id);
  }

  getToDosInReverseOrder(): ToDo[] {
    const toDosCopy = this.toDos.slice();
    return toDosCopy.reverse();
  }

}
