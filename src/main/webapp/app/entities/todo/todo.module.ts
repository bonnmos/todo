import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TodoSharedModule } from 'app/shared';
import { NgxPaginationModule } from 'ngx-pagination';

import {
    TodoComponent,
    TodoDetailComponent,
    TodoUpdateComponent,
    TodoDeletePopupComponent,
    TodoDeleteDialogComponent,
    todoRoute,
    todoPopupRoute
} from './';

const ENTITY_STATES = [...todoRoute, ...todoPopupRoute];

@NgModule({
    imports: [TodoSharedModule, RouterModule.forChild(ENTITY_STATES), NgxPaginationModule],
    declarations: [TodoComponent, TodoDetailComponent, TodoUpdateComponent, TodoDeleteDialogComponent, TodoDeletePopupComponent],
    entryComponents: [TodoComponent, TodoUpdateComponent, TodoDeleteDialogComponent, TodoDeletePopupComponent, TodoDetailComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TodoTodoModule {}
