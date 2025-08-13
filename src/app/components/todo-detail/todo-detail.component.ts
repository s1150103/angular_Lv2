import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Todo } from '../../models/todo';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrl: './todo-detail.component.css'
})
export class TodoDetailComponent implements OnInit {
  todo: Todo | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private todoService: TodoService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getTodo();
  }

  getTodo(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.todoService.getTodo(id)
      .subscribe(todo => this.todo = todo);
  }

  goBack(): void {
    this.location.back();
  }

  editTodo(): void {
    if (this.todo) {
      this.router.navigate(['/todo/edit', this.todo.id]);
    }
  }

  deleteTodo(): void {
    if (this.todo) {
      this.todoService.deleteTodo(this.todo.id).subscribe(() => {
        this.router.navigate(['/todos']);
      });
    }
  }

  toggleCompleted(): void {
    if (this.todo) {
      this.todo.completed = !this.todo.completed;
      this.todoService.updateTodo(this.todo).subscribe();
    }
  }
}
