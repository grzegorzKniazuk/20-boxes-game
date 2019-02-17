import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router, RouterEvent } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {

  constructor(private matSnackBar: MatSnackBar, private router: Router) {
  }

  public success(message: string): void {
    this.matSnackBar.open(message, '', {
      panelClass: 'snackbar-success',
    });
  }

  public error(message: string): void {
    this.matSnackBar.open(message, '', {
      panelClass: 'snackbar-error',
    });
  }

  public watchRouterEventsAndCloseSnackBars(): void {
    this.router.events.subscribe((event: RouterEvent) => {
      if (event) {
        this.matSnackBar.dismiss();
      }
    });
  }
}
