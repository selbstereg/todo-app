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
  isInputEmpty: boolean = true;

  onAddItem() {
    this.addItem.emit(this.input);
    this.input = '';
  }

  onInputChange(input: string) {
    console.log("Is iput empty: ", input.length === 0);
    this.isInputEmpty = input.length === 0;
  }
}
