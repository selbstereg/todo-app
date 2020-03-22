import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
    selector: 'favourite-einkauf-items',
    templateUrl: './favourite-einkauf-items.component.html',
    styleUrls: ['./favourite-einkauf-items.component.css']
})
export class FavouriteEinkaufItems {
    items: string[] = [
        'Äpfel',
        'Bananen',
        'Brot',
        'Brotaufstrich',
        'Käse',
        'Milch',
        'Veganer Brotaufstrich',
        'Wasser',
    ];
    selectedItems: string[] = [];

    constructor(private dialogRef: MatDialogRef<FavouriteEinkaufItems>) {
    }

    onClickItem(clickedItem: string): void {
        if(this.itemIsSelected(clickedItem)) {
            this.selectedItems = this.selectedItems.filter(item => item !== clickedItem);
        } else {
            this.selectedItems.push(clickedItem);
        }
    }

    styleSelectedItems(item: string) {
        return this.itemIsSelected(item) ? 'selected-item' : '';
    }

    itemIsSelected(item: string) {
        return this.selectedItems.includes(item);
    }

    onAddItems(): void {
        this.dialogRef.close(this.selectedItems.sort());
    }

}
