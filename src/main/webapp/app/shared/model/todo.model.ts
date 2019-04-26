import { Moment } from 'moment';
import { IUser } from 'app/core/user/user.model';

export interface ITodo {
    id?: number;
    title?: string;
    category?: string;
    description?: string;
    dueDate?: Moment;
    isCompleted?: boolean;
    user?: IUser;
}

export class Todo implements ITodo {
    constructor(
        public id?: number,
        public title?: string,
        public category?: string,
        public description?: string,
        public dueDate?: Moment,
        public isCompleted?: boolean,
        public user?: IUser
    ) {
        this.isCompleted = this.isCompleted || false;
    }
}
