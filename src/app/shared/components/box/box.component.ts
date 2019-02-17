import { AfterContentChecked, Component, Input, OnInit } from '@angular/core';
import { BoxSettings } from 'src/app/core/interfaces/box-settings';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/core/services/snackbar.service';

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
      this.snackbarService.error(`Nie można edytować pola ${this.boxSettings.id === 1 ? 'startowego' : 'końcowego'}`);
    } else {
      this.router.navigate([ '../', 'settings', { outlets: { board: 'board', edit: `edit/${this.boxSettings.id}` } } ]).catch(() => {
        this.snackbarService.error('Błąd pobierania danych do edycji');
      });
    }
  }

  private initBoxBackground(): void {
    this.src = `../../../../assets/images/boxes/${this.boxSettings.id}.jpg`;
  }

  private initTooltip(): void {
    if (this.boxSettings.goTo && !this.editMode) {
      this.tooltip = `Przechodzisz na pole ${this.boxSettings.goTo}`;
    } else if (this.editMode) {
      this.tooltip = 'Kliknij, aby edytować';
    }
  }

  private checkPawnPosition(): void {
    this.pawnInBox = this.boxSettings.id === this.pawnPosition;
  }
}
