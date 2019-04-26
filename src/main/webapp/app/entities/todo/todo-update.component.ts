import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { ITodo } from 'app/shared/model/todo.model';
import { TodoService } from './todo.service';
import { IUser, UserService } from 'app/core';

@Component({
    selector: 'jhi-todo-update',
    templateUrl: './todo-update.component.html'
})
export class TodoUpdateComponent implements OnInit {
    todo: ITodo;
    isSaving: boolean;

    users: IUser[];
    dueDate: string;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected todoService: TodoService,
        protected userService: UserService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ todo }) => {
            this.todo = todo;
            this.dueDate = this.todo.dueDate != null ? this.todo.dueDate.format(DATE_TIME_FORMAT) : null;
        });
        this.userService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IUser[]>) => mayBeOk.ok),
                map((response: HttpResponse<IUser[]>) => response.body)
            )
            .subscribe((res: IUser[]) => (this.users = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.todo.dueDate = this.dueDate != null ? moment(this.dueDate, DATE_TIME_FORMAT) : null;
        if (this.todo.id !== undefined) {
            this.subscribeToSaveResponse(this.todoService.update(this.todo));
        } else {
            this.subscribeToSaveResponse(this.todoService.create(this.todo));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ITodo>>) {
        result.subscribe((res: HttpResponse<ITodo>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackUserById(index: number, item: IUser) {
        return item.id;
    }
}
