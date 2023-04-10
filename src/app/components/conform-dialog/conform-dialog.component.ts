import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-conform-dialog',
  templateUrl: './conform-dialog.component.html',
  styleUrls: ['./conform-dialog.component.css']
})
export class ConformDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {title: string, message: string, confirmButtonText: string}){}
}
