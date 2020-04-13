import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToDoListPageComponent } from './to-do-list-page/to-do-list-page.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToDoListSelectionComponent } from './to-do-list-selection/to-do-list-selection.component';
import { ItemAdderComponent } from './common/item-adder/item-adder.component';
import { StopClickPropagation } from './common/stop-click-propagation';
import { DeleteButtonComponent } from './common/delete-button/delete-button.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSpinner, MatDialogModule } from '@angular/material';
import { SpinnerOverlayService } from './common/services/spinner-overlay.service';
import { CrudClient } from './common/services/crud-client.service';
import { OverlayModule } from '@angular/cdk/overlay'
import { FavouriteEinkaufItems } from './favourite-einkauf-items/favourite-einkauf-items.component';
import { ConfirmationDialogComponent } from './common/confirmation-dialog/confirmation-dialog.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ErrorHandler } from './common/services/error-handler.service';

@NgModule({
  declarations: [
    AppComponent,
    ToDoListPageComponent,
    ToDoListSelectionComponent,
    ItemAdderComponent,
    StopClickPropagation,
    DeleteButtonComponent,
    FavouriteEinkaufItems,
    ConfirmationDialogComponent
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
    MatDialogModule,
    OverlayModule,
    MatSnackBarModule
  ],
  providers: [
    SpinnerOverlayService,
    CrudClient,
    ErrorHandler
  ],
  bootstrap: [
    AppComponent,
    MatSpinner,
    FavouriteEinkaufItems,
    ConfirmationDialogComponent
  ]
})
export class AppModule { }
