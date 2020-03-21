import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'delete-button',
  templateUrl: './delete-button.component.html',
})
export class DeleteButtonComponent {
  @Output() delete = new EventEmitter<void>();

  onClick() {
    this.delete.emit();
  }
}

