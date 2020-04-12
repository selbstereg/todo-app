import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'delete-button',
  templateUrl: './delete-button.component.html',
  styleUrls: ['./delete-button.component.css']
})
export class DeleteButtonComponent {
  @Output() delete = new EventEmitter<void>();

  onClick() {
    this.delete.emit();
  }
}

