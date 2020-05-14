import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

// TODO: When the page is loaded, there is an error:
// "The selector "favourite-einkauf-items" did not match any elements"
// The reason is the bootstrapping of this component as specified in
// app.module.ts, but bootstrapping is necessary to be able to use the
// comp in mat dialogues. Fix this stuff.
@Component({
    selector: 'favourite-einkauf-items',
    templateUrl: './favourite-einkauf-items.component.html',
    styleUrls: ['./favourite-einkauf-items.component.css']
})
export class FavouriteEinkaufItems {
    items: string[] = [
        'Äpfel',
        'Aufbackbrötchen',
        'Bananen',
        'Brot',
        'Brotaufstrich',
        'Milch',
        'Pfandflaschen zurückgeben',
        'Shampoo',
        'Zahnpasta'
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

    onCancel(): void {
        this.dialogRef.close([]);
    }

}
