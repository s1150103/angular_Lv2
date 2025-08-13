import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const todos: Todo[] = [
      {
        id: 1,
        title: 'Learn Angular',
        description: 'Study Angular framework and its concepts',
        completed: false,
        createdAt: new Date('2024-01-01')
      },
      {
        id: 2,
        title: 'Build ToDo App',
        description: 'Create a fully functional ToDo application',
        completed: false,
        createdAt: new Date('2024-01-02')
      },
      {
        id: 3,
        title: 'Implement Reactive Forms',
        description: 'Convert template driven forms to reactive forms',
        completed: false,
        createdAt: new Date('2024-01-03')
      },
      {
        id: 4,
        title: 'Add Bootstrap Styling',
        description: 'Apply Bootstrap classes for better UI',
        completed: true,
        createdAt: new Date('2024-01-04')
      },
      {
        id: 5,
        title: 'Testing',
        description: 'Write and run tests for the application',
        completed: false,
        createdAt: new Date('2024-01-05')
      }
    ];
    return { todos };
  }

  genId(todos: Todo[]): number {
    return todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;
  }
}