import { Component, OnInit } from '@angular/core';
import { SnackbarService } from './core/services/snackbar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(private snackbarService: SnackbarService) {}

  ngOnInit() {
    this.snackbarService.watchRouterEventsAndCloseSnackBars();
  }
}
