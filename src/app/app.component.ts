import { Component, OnDestroy, OnInit } from '@angular/core';
import { SnackbarService } from './core/services/snackbar.service';
import { Router, RouterEvent } from '@angular/router';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

@AutoUnsubscribe()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ],
})
export class AppComponent implements OnInit, OnDestroy {

  constructor(private snackbarService: SnackbarService, private router: Router) {
  }

  ngOnInit() {
    this.snackbarService.watchRouterEventsAndCloseSnackBars();
    this.watchRouterUrl();
  }

  ngOnDestroy() {
  }

  private watchRouterUrl(): void {
    this.router.events.subscribe((event: RouterEvent) => {
      if (event.url === '/settings') {
        this.router.navigateByUrl('/settings/(board:board//edit:edit)');
      }
    });
  }
}
