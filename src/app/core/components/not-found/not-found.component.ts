import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { SNACKBAR_MESSAGES } from 'src/app/core/constants/snackbar-messages';

@Component({
  templateUrl: './not-found.component.html',
  styleUrls: [ './not-found.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundComponent implements OnInit {

  public timeout = 10;

  constructor(private router: Router,
              private snackbarService: SnackbarService,
              private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.countingDown();
  }

  private countingDown(): void {
    const counting = setInterval(() => {
      this.timeout--;
      this.changeDetectorRef.detectChanges();
    }, 1000);
    setTimeout(() => {
      clearInterval(counting);
      this.router.navigate([ '../', 'home' ]).then(() => {
        this.snackbarService.success(SNACKBAR_MESSAGES.redirectSuccessful);
      });
    }, 10000);
  }
}
