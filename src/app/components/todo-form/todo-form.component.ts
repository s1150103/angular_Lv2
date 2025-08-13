import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Todo } from '../../models/todo';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrl: './todo-form.component.css'
})
export class TodoFormComponent implements OnInit {
  todoForm: FormGroup;
  isEditMode = false;
  todoId: number | null = null;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private todoService: TodoService
  ) {
    this.todoForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
      completed: [false]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id && id !== 'new') {
      this.isEditMode = true;
      this.todoId = Number(id);
      this.loadTodo();
    }
  }

  loadTodo(): void {
    if (this.todoId) {
      this.isLoading = true;
      this.todoService.getTodo(this.todoId).subscribe({
        next: (todo) => {
          this.todoForm.patchValue({
            title: todo.title,
            description: todo.description,
            completed: todo.completed
          });
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading todo:', error);
          this.isLoading = false;
          this.router.navigate(['/todos']);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.todoForm.valid) {
      this.isLoading = true;
      const formData = this.todoForm.value;

      if (this.isEditMode && this.todoId) {
        const updatedTodo: Todo = {
          id: this.todoId,
          title: formData.title,
          description: formData.description,
          completed: formData.completed
        };

        this.todoService.updateTodo(updatedTodo).subscribe({
          next: () => {
            this.isLoading = false;
            this.router.navigate(['/todo', this.todoId]);
          },
          error: (error) => {
            console.error('Error updating todo:', error);
            this.isLoading = false;
          }
        });
      } else {
        const newTodo: Todo = {
          id: 0,
          title: formData.title,
          description: formData.description,
          completed: formData.completed,
          createdAt: new Date()
        };

        this.todoService.addTodo(newTodo).subscribe({
          next: (todo) => {
            this.isLoading = false;
            this.router.navigate(['/todo', todo.id]);
          },
          error: (error) => {
            console.error('Error creating todo:', error);
            this.isLoading = false;
          }
        });
      }
    } else {
      this.markFormGroupTouched();
    }
  }

  onCancel(): void {
    this.location.back();
  }

  getFieldError(fieldName: string): string {
    const field = this.todoForm.get(fieldName);
    if (field && field.errors && field.touched) {
      if (field.errors['required']) return `${fieldName} is required.`;
      if (field.errors['minlength']) return `${fieldName} must be at least ${field.errors['minlength'].requiredLength} characters.`;
      if (field.errors['maxlength']) return `${fieldName} must not exceed ${field.errors['maxlength'].requiredLength} characters.`;
    }
    return '';
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.todoForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  private markFormGroupTouched(): void {
    Object.keys(this.todoForm.controls).forEach(key => {
      const control = this.todoForm.get(key);
      control?.markAsTouched();
    });
  }
}
