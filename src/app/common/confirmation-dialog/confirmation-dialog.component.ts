import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html'
})
export class ConfirmationDialogComponent {

    constructor(
        private dialogRef: MatDialogRef<ConfirmationDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private data: any) {
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

