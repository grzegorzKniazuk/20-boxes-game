import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { BoxSettings } from '../../../../core/interfaces/box-settings';
import { FormsService } from '../../../../core/services/forms.service';
import { FormGroup } from '@angular/forms';
import { BoxesService } from '../../../../core/services/boxes.service';
import { SnackbarService } from '../../../../core/services/snackbar.service';
import { GameStateService } from '../../../../core/services/game-state.service';
import { BoxDependencies } from '../../../../core/interfaces/box-dependencies';
import { merge, Observable } from 'rxjs';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';
import { BoxResolve } from '../../../../core/interfaces/box-resolve';

@AutoUnsubscribe()
@Component({
  selector: 'app-edit-box',
  templateUrl: './edit-box.component.html',
  styleUrls: ['./edit-box.component.scss'],
})
export class EditBoxComponent implements OnInit, OnDestroy {

  public boxSettings: BoxSettings;
  private boxDependencies: BoxDependencies;
  public editBoxForm: FormGroup;
  private readonly deleteGoToMessage = 'Usuń właściwość';
  public idsArray: [string, number?] = [this.deleteGoToMessage];

  constructor(private activatedRoute: ActivatedRoute,
              private formService: FormsService,
              private router: Router,
              private snackbarService: SnackbarService,
              private gameStateService: GameStateService,
              private boxesService: BoxesService) { }

  ngOnInit() {
    this.initForm();
    this.loadEditorBoxData();
    this.redirectfNoDataOnPageReload();
  }

  ngOnDestroy() { }

  private initForm(): void {
    this.editBoxForm = this.formService.editBoxForm;
  }

  private loadEditorBoxData(): void {
    merge(this.loadBoxSettings, this.loadBoxDependencies)
      .pipe(distinctUntilChanged())
      .subscribe((data: BoxResolve) => {
        if (data) {
          this.boxSettings = data.boxData;
          this.boxDependencies = data.boxDependencies;

          this.initFormData();
          this.fillIdsArray();
        }
    });
  }

  private get loadBoxSettings(): Observable<{ boxData: BoxSettings }> {
    return this.activatedRoute.data
      .pipe(filter((data: BoxResolve) => !!data.boxData && !!data.boxDependencies))
      .pipe(map((data: { boxData: BoxSettings }) => {
        return data;
      }));
  }

  private get loadBoxDependencies(): Observable<{boxDependencies: BoxDependencies}> {
    return this.activatedRoute.data
      .pipe(filter((data: BoxResolve) => !!data.boxData && !!data.boxDependencies))
      .pipe(map((data: { boxDependencies: BoxDependencies }) => {
        return data;
      }));
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
      if (id !== this.boxSettings.id && !this.boxDependencies.cannotMove.includes(id)) {
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
