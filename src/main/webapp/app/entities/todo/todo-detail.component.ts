import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITodo } from 'app/shared/model/todo.model';

@Component({
    selector: 'jhi-todo-detail',
    templateUrl: './todo-detail.component.html'
})
export class TodoDetailComponent implements OnInit {
    @Input()
    public todo: ITodo;

    @Input()
    public modalService;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        /*this.activatedRoute.data.subscribe(({ todo }) => {
            this.todo = todo;
        });*/
        console.log(this.todo);
    }

    close() {
        this.modalService.dismisAll();
    }

    previousState() {
        window.history.back();
    }
}
