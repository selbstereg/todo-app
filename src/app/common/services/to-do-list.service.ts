import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { TO_DO_LISTS_ENDPOINT_URL } from '../constants';
import { Observable } from 'rxjs';
import { ToDo } from 'src/app/to-do-list/model/to-do.model';
import { take } from 'rxjs/operators';
import { SpinnerOverlayService } from './spinner-overlay.service';


@Injectable()
export class ToDoListService {
    constructor(
        private httpClient: HttpClient,
        private spinnerOverlayService: SpinnerOverlayService
    ) {
    }

    public fetchToDos(toDoListId: number): Observable<ToDo[]> {
        const url: string = `${TO_DO_LISTS_ENDPOINT_URL}${toDoListId}/to-dos`;

        this.spinnerOverlayService.showSpinner();
        const toDoLists$ = (this.httpClient.get(url).pipe(take(1)) as Observable<ToDo[]>);
        toDoLists$.subscribe(() => {
            console.log("service also received todos");
            this.spinnerOverlayService.hideSpinner();
        });

        return toDoLists$;
    }

}