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
        const request = () => this.httpClient.get(TO_DO_LISTS_ENDPOINT_URL);

        return this.sendRequest(request) as Observable<NamedEntity[]>;
    }

    public fetchToDos(toDoListId: number): Observable<ToDo[]> {
        const url: string = `${TO_DO_LISTS_ENDPOINT_URL}${toDoListId}/to-dos`;
        const request = () => this.httpClient.get(url);

        return this.sendRequest(request) as Observable<ToDo[]>;
    }

    public addToDo(toDoListId: number, toDo: ToDo): Observable<ToDo> {
        const url: string = `${TO_DO_LISTS_ENDPOINT_URL}${toDoListId}`;
        const request = () => this.httpClient.post(url, toDo);

        return this.sendRequest(request) as Observable<ToDo>;
    }

    public deleteToDo(toDoListId: number, toDoId: number): Observable<ToDo> {
        const url: string = `${TO_DO_LISTS_ENDPOINT_URL}${toDoListId}/to-dos/${toDoId}`;
        const request = () => this.httpClient.delete(url);

        return this.sendRequest(request) as Observable<ToDo>;
    }

    private sendRequest(request: () => Observable<Object>) {
        this.showSpinner();

        return request().pipe(
            take(1),
            tap(this.hideSpinner)
        );
    }

    private hideSpinner = () => this.spinnerOverlayService.hideSpinner();
    private showSpinner = () => this.spinnerOverlayService.showSpinner();

}