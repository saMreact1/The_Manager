import { Component, EventEmitter, Output } from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskService } from "../../services/task.service";
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  standalone: false,
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent {
  @Output() taskCreated = new EventEmitter<Task>();
  @Output() closeForm = new EventEmitter();

  taskFromDate: Date; // to store the date from the date picker
  taskToDate: Date; // to store the date from the date picker

  constructor(private taskService: TaskService) {}

  newTask: Task = {
    id: Date.now(),
    title: '',
    description: '',
    status: 'Pending',
    priority: 'Low',
    timeline: {
      startDate: new Date(),
      endDate: new Date()
    }
  }

  // addTask() {
  //   const newTask: Task = {
  //     id: Date.now(),
  //     title: '',
  //     description: '',
  //     status: 'Pending',
  //     priority: 'Low',
  //     timeline: {
  //       startDate: this.taskFromDate ? new Date(this.taskFromDate) : null, // Save selected "From" date
  //       endDate: this.taskToDate ? new Date(this.taskToDate) : null       // Save selected "To" date
  //     }
  //   };
  
  //   console.log("New Task Created:", newTask); // ✅ Debugging log
  
  //   this.taskService.addTask(newTask);
  //   // this.dialogRef.close();
  // }

  createTask() {
    if (!this.newTask.title) {
      return;
    }
    // this.newTask.id = Date.now();
    
    const newTask = {
      id: Date.now(),
      title: this.newTask.title,
      description: this.newTask.description,
      status: 'Pending',
      priority: this.newTask.priority,
      timeline: {
        startDate: this.taskFromDate ? new Date(this.taskFromDate) : null, // Save selected "From" date
        endDate: this.taskToDate ? new Date(this.taskToDate) : null   
      }
    }
    // this.taskService.addTask(newTask);
    this.taskCreated.emit(newTask);
  }

  close() {
    this.closeForm.emit();
  }
}
