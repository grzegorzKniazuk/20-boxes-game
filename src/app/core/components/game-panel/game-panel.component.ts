import { Component, OnDestroy, OnInit } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { GameStateService } from '../../services/game-state.service';
import { PawnService } from '../../services/pawn.service';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { BoxesService } from '../../services/boxes.service';
import { Router } from '@angular/router';
import { SnackbarService } from '../../services/snackbar.service';
import { MatDialog } from '@angular/material';
import { RulesComponent } from 'src/app/shared/components/rules/rules.component';
import { FormsService } from 'src/app/core/services/forms.service';
import { ConsoleComponent } from 'src/app/core/components/game-panel/console.component';

@AutoUnsubscribe()
@Component({
  templateUrl: './game-panel.component.html',
  styleUrls: [ './game-panel.component.scss' ],
})
export class GamePanelComponent extends ConsoleComponent implements OnInit, OnDestroy {

  public pawnPosition = 1;

  constructor(protected localStorage: LocalStorage,
              public gameStateService: GameStateService,
              private boxesService: BoxesService,
              private router: Router,
              protected snackbarService: SnackbarService,
              private matDialog: MatDialog,
              protected formService: FormsService,
              private pawnService: PawnService) {
    super(formService, localStorage, snackbarService);
  }

  ngOnInit() {
    this.newGame();
    this.initConsoleFilterForm();
    this.watchConsoleFormFilterChanges();
    this.loadSavedConsoleFilterRules();
  }

  ngOnDestroy() {
  }

  public newGame(): void {
    this.boxesService.initBoxesSettings();
    this.initPawnPosition();
    this.gameStateService.initPawnPosition();
    this.gameStateService.loadGameState();
    this.pawnService.loadPawnPosition();
    this.pawnService.initBoxesSettings();
  }

  public resetGame(): void {
    this.gameStateService.resetGameState();
  }

  public onPawnMove(drawnNumber: number) {
    this.pawnService.movePawnTo(drawnNumber);
  }

  public saveGameAndGoToHome(): void {
    this.router.navigate([ '../', 'home' ]).then(() => {
      this.snackbarService.success('Zapisano stan gry');
    }).catch(() => {
      this.snackbarService.error('Wystąpił problem z przekierowaniem na strone główną');
    });
  }

  public showRules(): void {
    this.matDialog.open(RulesComponent);
  }

  private initPawnPosition(): void {
    this.gameStateService.pawnPosition$.subscribe((pawnPosition: number) => {
      this.pawnPosition = pawnPosition;
    });
  }
}
