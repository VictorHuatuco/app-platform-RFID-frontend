import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, Inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { NgxImageZoomModule } from 'ngx-image-zoom';

@Component({
  selector: 'app-alert-details-modal',
  standalone: true,
  imports: [CommonModule, NgxImageZoomModule, MatIcon, MatButton],
  templateUrl: './alert-details-modal.component.html',
  styleUrl: './alert-details-modal.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AlertDetailsModalComponent {
  constructor(
    public dialogRef: MatDialogRef<AlertDetailsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log("data alert datails",data);
  }

  close(): void {
    this.dialogRef.close();
  }
}
