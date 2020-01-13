import {Component} from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  theInput = '';
  movies = [
    'Lampen kaufen',
    'Teppiche kaufen?',
    'Garderobe kaufen?',
    'Vorhänge anbringen',
    'Spiegel aufhängen',
    'Rote Kästen aufhängen',
    'Bilder kaufen',
    'Bilder + Kalender aufhängen',
    'überall Filzgleiter hinmachen',
    'Ummelden (Vermieterformular nicht vergessen)',
    'Lampen anbringen',
    'Adressen ändern bei Krankenkasse, bahn, ...',
    'Kühlschrank besorgen',
    'GEZ bescheid geben'
  ];

  addTodoItem() {
    this.movies.unshift(this.theInput);
    this.theInput = '';
  }

  deleteTodoItem(itemToDelete): void {
    this.movies = this.movies.filter(item => item !== itemToDelete);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
  }

  printToConsole() {
    console.log(this.movies);
  }
}
