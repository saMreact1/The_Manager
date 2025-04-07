import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { MatDialog } from '@angular/material/dialog';
import { TaskPreviewComponent } from '../task-preview/task-preview.component';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';
import { Router } from 'express';

@Component({
  standalone: false,
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {
  tasks: Task[] = [];
  // selectedTask: Task | null = null;
  showTaskForm: boolean = false;
  // showTaskPreview: boolean = false;
  isExpanded: boolean = true;

  task$ = this.taskService.task$;

  // displayedColumns: string[] = ['id', 'title', 'status', 'priority', 'actions'];

  constructor(private taskService: TaskService, private dialog: MatDialog) {}

  ngOnInit() {
    this.taskService.tasks$.subscribe(tasks => {
      this.tasks = tasks;
      // console.log('Tasks:', this.tasks);
    });
    this.loadTasks();
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['tasks']) {
      console.log('Task updated:', this.tasks);
    }
  }

  saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
  loadTasks() {
    if (typeof window !== 'undefined' && localStorage) {
      const storedTasks = localStorage.getItem('tasks');
      this.tasks = storedTasks ? JSON.parse(storedTasks) : [];
    }
  }

  addTask(task: Task) {
    this.taskService.addTask(task);
    // this.tasks.push(task);
    this.showTaskForm = false;
    this.saveTasks();
  }

  toggleTasks() {
    this.isExpanded = !this.isExpanded;
  }

  onStatusChange(event: Event, task: Task) {
    const selecetElement = event.target as HTMLSelectElement;
    task.status = selecetElement.value;
    // this.taskService.addTask(task);
    this.saveTasks();
  }

  openTask(task: Task) {
    this.dialog.open(TaskPreviewComponent, {
      data: task,
      width: '500px'
    });
    console.log('Task sent to modal:', task);
    
  }

  delTask(task: Task) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent);
    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.taskService.deleteTask(task.id);
      }
    });
  }
}
