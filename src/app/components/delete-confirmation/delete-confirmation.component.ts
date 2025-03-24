import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-confirmation',
  template: `
    <div class="container">
      <h2>Are you sure you want to delete this task?</h2>
      <button mat-button color="warn" (click)="confirmDelete()">Delete</button>
      <button mat-button (click)="cancel()">Cancel</button>
    </div>
  `,
  styleUrl: './delete-confirmation.component.css'
})
export class DeleteConfirmationComponent {
  constructor(private dialogRef: MatDialogRef<DeleteConfirmationComponent>) {}

  confirmDelete() {
    this.dialogRef.close(true);
  }

  cancel() {
    this.dialogRef.close(false);
  }
}
