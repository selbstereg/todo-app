import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { TO_DO_LISTS_ENDPOINT_URL, TO_DOS_ENDPOINT_URL } from '../constants';
import { Observable, throwError, forkJoin } from 'rxjs';
import { ToDo } from 'src/app/to-do-list-page/model/to-do.model';
import { take, tap, catchError } from 'rxjs/operators';
import { SpinnerOverlayService } from './spinner-overlay.service';
import { NamedEntity } from 'src/app/to-do-list-page/model/named-entity.model';
import { ErrorHandler } from './error-handler.service';
import { PriorityUpdate } from 'src/app/to-do-list-page/drag-drop-list/drag-drop-list.component';


@Injectable()
export class CrudClient {

    constructor(
        private httpClient: HttpClient,
        private spinnerOverlayService: SpinnerOverlayService,
        private errorHandler: ErrorHandler
    ) {
    }

    // CREATE
    public addToDoList(listName: string): Observable<NamedEntity> {
        const request = () => this.httpClient.post(TO_DO_LISTS_ENDPOINT_URL, listName);

        return this.sendRequest(request) as Observable<NamedEntity>;
    }

    public addToDo(toDoListId: number, toDo: ToDo): Observable<ToDo> {
        const url: string = `${TO_DO_LISTS_ENDPOINT_URL}${toDoListId}/to-dos`;
        const request = () => this.httpClient.post(url, toDo);

        return this.sendRequest(request) as Observable<ToDo>;
    }

    // READ
    public fetchToDoLists(): Observable<NamedEntity[]> {
        const request = () => this.httpClient.get(TO_DO_LISTS_ENDPOINT_URL);

        return this.sendRequest(request) as Observable<NamedEntity[]>;
    }

    public fetchToDos(toDoListId: number): Observable<ToDo[]> {
        const url: string = `${TO_DO_LISTS_ENDPOINT_URL}${toDoListId}/to-dos`;
        const request = () => this.httpClient.get(url);

        return this.sendRequest(request) as Observable<ToDo[]>;
    }

    // UPDATE
    public updateToDo(toDo: ToDo) {
        const url: string = `${TO_DOS_ENDPOINT_URL}`;
        const request = () => this.httpClient.put(url, toDo);

        return this.sendRequest(request) as Observable<ToDo>;
    }

    public updatePriorities(updates: PriorityUpdate[]): Observable<number[]> {
        const requests: Observable<number>[] = updates.map(update => {
            const url: string = `${TO_DOS_ENDPOINT_URL}${update.toDoId}/priority`
            return this.httpClient.put(url, update.priority) as Observable<number>;
        })

        const request: () => Observable<number[]> = () => forkJoin(requests);

        return this.sendRequest(request) as Observable<number[]>;
    }

    // DELETE
    public deleteToDoList(toDoListId: number): Observable<NamedEntity> {
        const url: string = `${TO_DO_LISTS_ENDPOINT_URL}${toDoListId}`;
        const request = () => this.httpClient.delete(url);

        return this.sendRequest(request) as Observable<NamedEntity>;
    }

    public deleteToDo(toDoListId: number, toDoId: number): Observable<ToDo> {
        const url: string = `${TO_DO_LISTS_ENDPOINT_URL}${toDoListId}/to-dos/${toDoId}`;
        const request = () => this.httpClient.delete(url);

        return this.sendRequest(request) as Observable<ToDo>;
    }

    // private functions
    private sendRequest(request: () => Observable<Object>) {
        const jobId: number = this.startSpinner();

        return request().pipe(
            catchError(err => {
                this.stopSpinner(jobId);
                this.errorHandler.display(err);
                return throwError(err);
            }),
            take(1),
            tap(_ => this.stopSpinner(jobId))
        );
    }

    private stopSpinner = (jobId: number) => this.spinnerOverlayService.stop(jobId);
    private startSpinner = () => this.spinnerOverlayService.start();

}
