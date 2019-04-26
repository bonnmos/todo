/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { TodoService } from 'app/entities/todo/todo.service';
import { ITodo, Todo } from 'app/shared/model/todo.model';

describe('Service Tests', () => {
    describe('Todo Service', () => {
        let injector: TestBed;
        let service: TodoService;
        let httpMock: HttpTestingController;
        let elemDefault: ITodo;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(TodoService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new Todo(0, 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', currentDate, false);
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign(
                    {
                        dueDate: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                service
                    .find(123)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: elemDefault }));

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should create a Todo', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0,
                        dueDate: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        dueDate: currentDate
                    },
                    returnedFromService
                );
                service
                    .create(new Todo(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a Todo', async () => {
                const returnedFromService = Object.assign(
                    {
                        title: 'BBBBBB',
                        category: 'BBBBBB',
                        description: 'BBBBBB',
                        dueDate: currentDate.format(DATE_TIME_FORMAT),
                        isCompleted: true
                    },
                    elemDefault
                );

                const expected = Object.assign(
                    {
                        dueDate: currentDate
                    },
                    returnedFromService
                );
                service
                    .update(expected)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'PUT' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should return a list of Todo', async () => {
                const returnedFromService = Object.assign(
                    {
                        title: 'BBBBBB',
                        category: 'BBBBBB',
                        description: 'BBBBBB',
                        dueDate: currentDate.format(DATE_TIME_FORMAT),
                        isCompleted: true
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        dueDate: currentDate
                    },
                    returnedFromService
                );
                service
                    .query(expected)
                    .pipe(
                        take(1),
                        map(resp => resp.body)
                    )
                    .subscribe(body => expect(body).toContainEqual(expected));
                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify([returnedFromService]));
                httpMock.verify();
            });

            it('should delete a Todo', async () => {
                const rxPromise = service.delete(123).subscribe(resp => expect(resp.ok));

                const req = httpMock.expectOne({ method: 'DELETE' });
                req.flush({ status: 200 });
            });
        });

        afterEach(() => {
            httpMock.verify();
        });
    });
});
