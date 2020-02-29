import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'item-adder',
  templateUrl: './item-adder.component.html',
  styleUrls: ['./item-adder.component.css']
})
export class ItemAdderComponent {
  @Input() placeholder = '';
  @Output() addItem = new EventEmitter<string>();
  private input: string;

  onAddItem() {
    this.addItem.emit(this.input);
  }
}
