import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Todo } from '../../models/todo';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];

  constructor(
    private todoService: TodoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getTodos();
  }

  getTodos(): void {
    this.todoService.getTodos()
      .subscribe(todos => this.todos = todos);
  }

  onSelect(todo: Todo): void {
    this.router.navigate(['/todo', todo.id]);
  }

  deleteTodo(todo: Todo): void {
    this.todos = this.todos.filter(t => t !== todo);
    this.todoService.deleteTodo(todo.id).subscribe();
  }

  addNew(): void {
    this.router.navigate(['/todo/new']);
  }

  editTodo(todo: Todo): void {
    this.router.navigate(['/todo/edit', todo.id]);
  }
}
