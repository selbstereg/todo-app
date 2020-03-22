import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'delete-dialog',
  templateUrl: './delete-dialog.component.html',
})
export class DeleteDialogComponent {
    @Inject(MAT_DIALOG_DATA) data: any;

    constructor(private dialogRef: MatDialogRef<DeleteDialogComponent>) {
    }

    getDialogText(): string {
        return this.data.text ? this.data.text : '';
    }

    confirm() {
        this.dialogRef.close(true);
    }

    cancel() {
        this.dialogRef.close(false);
    }
}

