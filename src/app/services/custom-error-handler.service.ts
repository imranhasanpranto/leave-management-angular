import { Injectable, ErrorHandler, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CustomErrorHandler implements ErrorHandler{

  constructor(private snackbar: MatSnackBar, private zone: NgZone) { }

  handleError(error: unknown): void {
    this.zone.run(() => {
      this.snackbar.open(
        'Error was detected! We are already working on it!',
        'Close',
        {
          duration: 5000
        }
      );
    });
    console.warn(`Caught by Custom Error Handler:`, error);
  }
}
