import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToDo } from 'src/app/to-do-list-page/model/to-do.model';
import { CrudClient } from 'src/app/common/services/crud-client.service';

@Component({
    selector: 'to-do-editor',
    templateUrl: './to-do-editor.component.html',
    styleUrls: ['./to-do-editor.component.css']
})
export class ToDoEditorComponent {

    toDo: ToDo;
    editedName = '';

    constructor(
        private crudClient: CrudClient,
        private dialogRef: MatDialogRef<ToDoEditorComponent>,
        @Inject(MAT_DIALOG_DATA) private data: any) {
            this.toDo = this.data.toDoToEdit;
            this.editedName = this.toDo.name;
    }

    saveToDo() {
        this.toDo.name = this.editedName;
        this.crudClient.updateToDo(this.toDo).subscribe();
        this.dialogRef.close();
    }

    cancel() {
      this.dialogRef.close();
    }
}
