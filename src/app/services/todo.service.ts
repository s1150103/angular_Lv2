import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todosUrl = 'api/todos';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.todosUrl)
      .pipe(
        tap(_ => this.log('fetched todos')),
        catchError(this.handleError<Todo[]>('getTodos', []))
      );
  }

  getTodo(id: number): Observable<Todo> {
    const url = `${this.todosUrl}/${id}`;
    return this.http.get<Todo>(url).pipe(
      tap(_ => this.log(`fetched todo id=${id}`)),
      catchError(this.handleError<Todo>(`getTodo id=${id}`))
    );
  }

  updateTodo(todo: Todo): Observable<any> {
    return this.http.put(this.todosUrl, todo, this.httpOptions).pipe(
      tap(_ => this.log(`updated todo id=${todo.id}`)),
      catchError(this.handleError<any>('updateTodo'))
    );
  }

  addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.todosUrl, todo, this.httpOptions).pipe(
      tap((newTodo: Todo) => this.log(`added todo w/ id=${newTodo.id}`)),
      catchError(this.handleError<Todo>('addTodo'))
    );
  }

  deleteTodo(id: number): Observable<Todo> {
    const url = `${this.todosUrl}/${id}`;

    return this.http.delete<Todo>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted todo id=${id}`)),
      catchError(this.handleError<Todo>('deleteTodo'))
    );
  }

  searchTodos(term: string): Observable<Todo[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Todo[]>(`${this.todosUrl}/?title=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found todos matching "${term}"`) :
        this.log(`no todos matching "${term}"`)),
      catchError(this.handleError<Todo[]>('searchTodos', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(`TodoService: ${message}`);
  }
}