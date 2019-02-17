import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { BoxSettings } from '../../../../core/interfaces/box-settings';
import { FormsService } from '../../../../core/services/forms.service';
import { FormGroup } from '@angular/forms';
import { BoxesService } from '../../../../core/services/boxes.service';
import { SnackbarService } from '../../../../core/services/snackbar.service';
import { GameStateService } from '../../../../core/services/game-state.service';

@AutoUnsubscribe()
@Component({
  selector: 'app-edit-box',
  templateUrl: './edit-box.component.html',
  styleUrls: ['./edit-box.component.scss'],
})
export class EditBoxComponent implements OnInit, OnDestroy {

  public boxSettings: BoxSettings;
  public editBoxForm: FormGroup;
  private readonly deleteGoToMessage = 'Usuń właściwość';
  public idsArray: [string, number?];

  constructor(private activatedRoute: ActivatedRoute,
              private formService: FormsService,
              private router: Router,
              private snackbarService: SnackbarService,
              private gameStateService: GameStateService,
              private boxesService: BoxesService) { }

  ngOnInit() {
    this.initForm();
    this.loadBoxSettings();
    this.redirectfNoDataOnPageReload();
  }

  ngOnDestroy() { }

  private initForm(): void {
    this.editBoxForm = this.formService.editBoxForm;
  }

  private loadBoxSettings(): void {
    this.activatedRoute.data.subscribe((data: { boxData: BoxSettings }) => {
      if (data.boxData) {
        this.boxSettings = data.boxData;
        this.initFormData();
        this.fillIdsArray();
      }
    });
  }

  private redirectfNoDataOnPageReload(): void {
    if (this.router.url.includes('/settings/(board:board//edit:edit/') && !this.boxSettings) {
      this.router.navigateByUrl('/settings/(board:board//edit:edit)').catch(() => {
        this.snackbarService.error('Błąd przekierowania do ustawień gry');
      });
    }
  }

  private fillIdsArray(): void {
    this.idsArray = [this.deleteGoToMessage];
    for (let id = 2; id <= 19; id++) {
      if (id !== this.boxSettings.id) {
        this.idsArray.push(id);
      }
    }
  }

  private initFormData(): void {
    if (this.editBoxForm) {
      this.editBoxForm.setValue({
        id: this.boxSettings.id,
        dead: this.boxSettings.dead,
        goToStart: this.boxSettings.goToStart,
        goTo: this.boxSettings.goTo,
      });
    }
  }

  @HostListener('document:keydown.enter')
  private saveBoxOptions(): void {
    if (this.editBoxForm.get('goTo').value === this.deleteGoToMessage) {
      this.editBoxForm.get('goTo').setValue(null);
    }

    if (this.editBoxForm.valid) {
      this.boxesService.saveBoxSettings(this.editBoxForm.value);
    }
  }

  public goToHomepage(): void {
    this.router.navigate(['../', 'home']).catch(() => {
      this.snackbarService.error('Wystąpił problem z przekierowaniem na strone główną');
    });
  }

  public startNewGame(): void {
    this.gameStateService.resetGameState();
    this.router.navigate(['../', 'game-panel']).catch(() => {
      this.snackbarService.error('Wystąpił problem z przekierowaniem do nowej gry');
    });
  }

  public restoreDefaultSettings(): void {
    this.boxesService.setBoxesDefaultSettings();
  }
}
