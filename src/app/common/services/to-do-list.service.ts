import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { TO_DO_LISTS_ENDPOINT_URL } from '../constants';
import { Observable } from 'rxjs';
import { ToDo } from 'src/app/to-do-list/model/to-do.model';
import { take, tap } from 'rxjs/operators';
import { SpinnerOverlayService } from './spinner-overlay.service';
import { NamedEntity } from 'src/app/to-do-list/model/named-entity.model';


@Injectable()
export class ToDoListService {
    constructor(
        private httpClient: HttpClient,
        private spinnerOverlayService: SpinnerOverlayService
    ) {
    }

    public fetchToDoLists(): Observable<NamedEntity[]> {

        this.showSpinner();
        const toDoLists$ = (this.httpClient.get(TO_DO_LISTS_ENDPOINT_URL).pipe(
            take(1),
            tap(this.hideSpinner)
        ) as Observable<NamedEntity[]>);

        return toDoLists$;
    }

    public fetchToDos(toDoListId: number): Observable<ToDo[]> {
        const url: string = `${TO_DO_LISTS_ENDPOINT_URL}${toDoListId}/to-dos`;

        this.showSpinner();
        const toDoLists$ = (this.httpClient.get(url).pipe(
            take(1),
            tap(this.hideSpinner)
        ) as Observable<ToDo[]>);

        return toDoLists$;
    }

    public addToDo(toDoListId: number, toDo: ToDo): Observable<ToDo> {
        const url: string = `${TO_DO_LISTS_ENDPOINT_URL}${toDoListId}`;

        this.showSpinner();
        const toDo$ = this.httpClient.post(url, toDo).pipe(
            take(1),
            tap(this.hideSpinner)
        ) as Observable<ToDo>;

        return toDo$;
    }

    public deleteToDo(toDoListId: number, toDoId: number): Observable<ToDo> {
        const url: string = `${TO_DO_LISTS_ENDPOINT_URL}${toDoListId}/to-dos/${toDoId}`;

        this.showSpinner();
        const toDo$ = this.httpClient.delete(url).pipe(
            take(1),
            tap(this.hideSpinner) 
        ) as Observable<ToDo>;

        return toDo$;
    }

    private hideSpinner = () => this.spinnerOverlayService.hideSpinner();
    private showSpinner = () => this.spinnerOverlayService.showSpinner();

}