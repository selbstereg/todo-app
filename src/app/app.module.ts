import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToDoListComponent } from './to-do-list/to-do-list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToDoListSelectionComponent } from './to-do-list-selection/to-do-list-selection.component';
import { ItemAdderComponent } from './common/item-adder/item-adder.component';
import { StopClickPropagation } from './common/stop-click-propagation';
import { DeleteButtonComponent } from './common/delete-button/delete-button.component';
import { SpinnerOverlay } from './common/spinner-overlay/spinner-overlay.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SpinnerOverlayService } from './common/spinner-overlay/spinner-overlay.service';
import { OverlayModule } from '@angular/cdk/overlay'

@NgModule({
  declarations: [
    AppComponent,
    ToDoListComponent,
    ToDoListSelectionComponent,
    ItemAdderComponent,
    StopClickPropagation,
    DeleteButtonComponent,
    SpinnerOverlay
  ],
  imports: [
    DragDropModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    OverlayModule
  ],
  providers: [SpinnerOverlayService],
  bootstrap: [AppComponent]
})
export class AppModule { }
