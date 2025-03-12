import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  private _snackbar = inject(MatSnackBar);

  constructor() { }

  open(message: string, type: 'success' | 'error' | 'info' = 'info', duration: number = 3000): void {

    let panelClass: string;

    switch (type) {
      case 'success':
        panelClass = 'success-snackbar';
        break;
      case 'error':
        panelClass = 'error-snackbar';
        break;
      case 'info':
      default:
        panelClass = 'info-snackbar';
        break;
    }
    this._snackbar.open(message, '', {
      duration: duration,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: [panelClass]
    });
  }
}
