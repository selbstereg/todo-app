import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ToDo } from '../../model/to-do.model';
import { CrudClient } from 'src/app/common/services/crud-client.service';
import { MatDialog } from '@angular/material';
import { ToDoEditorComponent } from './to-do-editor/to-do-editor.component';



@Component({
    selector: 'to-do-ui',
    templateUrl: './to-do-ui.component.html',
    styleUrls: ['./to-do-ui.component.css']
})
export class ToDoUiComponent {
    @Input() toDo: ToDo;

    // TODO: it is cumbersome, to reach this event up by two components, so it can be
    // submitted to the BE with the to do list id. Check if there is a way to delete
    // the to do from the @OneToMany relation, without knowing the to do list.
    @Output() toDoDeleted = new EventEmitter<number>();

    constructor(private dialogService: MatDialog) {
    }

    onClick() {
        this.dialogService.open(ToDoEditorComponent, {
            minWidth: 280,
            data: {
                toDoToEdit: this.toDo
            }
        });
    }

    deleteToDo(): void {
        this.toDoDeleted.emit();
    }
}
