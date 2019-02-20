import { AfterContentChecked, Component, Input, OnInit } from '@angular/core';
import { BoxSettings } from 'src/app/core/interfaces/box-settings';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { SNACKBAR_MESSAGES } from 'src/app/core/constants/snackbar-messages';
import { CONSOLE_MESSAGES } from 'src/app/core/constants/console-messages';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: [ './box.component.scss' ],
})
export class BoxComponent implements OnInit, AfterContentChecked {

  @Input() public pawnPosition: number;
  @Input() public boxSettings: BoxSettings;
  @Input() public editMode: boolean;

  public src: string;
  public tooltip: string;
  public pawnInBox = false;

  constructor(private router: Router,
              private snackbarService: SnackbarService) {
  }

  ngOnInit() {
    this.initBoxBackground();
    this.initTooltip();
  }

  ngAfterContentChecked() {
    this.checkPawnPosition();
  }

  public selectBox(): void {
    if (this.boxSettings.id === 1 || this.boxSettings.id === 20) {
      this.snackbarService.error(this.boxSettings.id === 1 ? SNACKBAR_MESSAGES.disableEditStartField : SNACKBAR_MESSAGES.disableEditFinishField);
    } else {
      this.router.navigate([ '../', 'settings', { outlets: { board: 'board', edit: `edit/${this.boxSettings.id}` } } ]).catch(() => {
        this.snackbarService.error(SNACKBAR_MESSAGES.dataToEditError);
      });
    }
  }

  private initBoxBackground(): void {
    this.src = `../../../../assets/images/boxes/${this.boxSettings.id}.jpg`;
  }

  private initTooltip(): void {
    if (this.boxSettings.goTo && !this.editMode) {
      this.tooltip = `${CONSOLE_MESSAGES.goTo} ${this.boxSettings.goTo}`;
    } else if (this.editMode) {
      this.tooltip = 'Kliknij, aby edytować';
    }
  }

  private checkPawnPosition(): void {
    this.pawnInBox = this.boxSettings.id === this.pawnPosition;
  }
}
