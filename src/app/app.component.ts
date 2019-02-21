import { Component, OnDestroy, OnInit } from '@angular/core';
import { SnackbarService } from './core/services/snackbar.service';
import { NavigationError, Router, RouterEvent } from '@angular/router';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { SNACKBAR_MESSAGES } from 'src/app/core/constants/snackbar-messages';

@AutoUnsubscribe()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
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
      if (event instanceof NavigationError) {
        this.snackbarService.error(SNACKBAR_MESSAGES.redirectFailure);
      } else if (event.url === '/settings') {
        this.router.navigateByUrl('/settings/(board:board//edit:edit)').catch(() => {
          this.snackbarService.error(SNACKBAR_MESSAGES.redirectFailure);
        });
      }
    });
  }
}
