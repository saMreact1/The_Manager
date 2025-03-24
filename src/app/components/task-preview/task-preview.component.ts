import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-preview',
  templateUrl: './task-preview.component.html',
  styleUrl: './task-preview.component.css'
})
export class TaskPreviewComponent implements OnInit {
  

  constructor(
    public dialogRef: MatDialogRef<TaskPreviewComponent>,
    @Inject(MAT_DIALOG_DATA) public task: any
  ) { }

  ngOnInit() {
    console.log('Received task:', this.task); // 🔥 Debugging: Check received task
  }

  formatDate(date: string | Date | null): string {
    if (!date) return 'N/A';
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
    console.log('Formatted Date:', formattedDate);  // ✅ Log formatted date
    return formattedDate;
  }

  close(): void {
    this.dialogRef.close();
  }
}
