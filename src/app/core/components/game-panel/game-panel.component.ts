import { Component, OnDestroy, OnInit } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { GameStateService } from '../../services/game-state.service';
import { PawnService } from '../../services/pawn.service';
import { Router } from '@angular/router';
import { SnackbarService } from '../../services/snackbar.service';
import { MatDialog } from '@angular/material';
import { RulesComponent } from 'src/app/shared/components/rules/rules.component';
import { FormsService } from 'src/app/core/services/forms.service';
import { ConsoleComponent } from 'src/app/core/components/game-panel/console.component';
import { StoreService } from 'src/app/core/services/store.service';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { SNACKBAR_MESSAGES } from 'src/app/core/constants/snackbar-messages';

@AutoUnsubscribe()
@Component({
  templateUrl: './game-panel.component.html',
  styleUrls: [ './game-panel.component.scss' ],
})
export class GamePanelComponent extends ConsoleComponent implements OnInit, OnDestroy {

  constructor(protected localStorage: LocalStorage,
              private gameStateService: GameStateService,
              private router: Router,
              protected snackbarService: SnackbarService,
              private matDialog: MatDialog,
              protected formService: FormsService,
              public storeService: StoreService,
              private pawnService: PawnService) {
    super(formService, localStorage, snackbarService);
  }

  ngOnInit() {
    this.newGame();
    this.initConsole();
    this.checkDeadState();
    this.checkWinState();
  }

  ngOnDestroy() {
  }

  public newGame(): void {
    this.gameStateService.loadGameState();
  }

  public resetGame(): void {
    this.gameStateService.resetGameState();
  }

  public onPawnMove(drawnNumber: number) {
    this.pawnService.movePawnTo(drawnNumber);
  }

  public saveGameAndGoToHome(): void {
    this.router.navigate([ '../', 'home' ]).then(() => {
      this.gameStateService.gameStateAvailable.subscribe((isGameStateAvailable) => {
        if (isGameStateAvailable) {
          this.snackbarService.success(SNACKBAR_MESSAGES.saved);
        }
      });
    }).catch(() => {
      this.snackbarService.error(SNACKBAR_MESSAGES.redirectFailure);
    });
  }

  public showRules(): void {
    this.matDialog.open(RulesComponent);
  }

  private checkDeadState(): void {
    this.gameStateService.deadState.subscribe((isDead) => {
      if (isDead) {
        this.pawnService.openEndGameSummaryBox(false);
      }
    });
  }

  private checkWinState(): void {
    this.gameStateService.winState.subscribe((isWin) => {
      if (isWin) {
        this.pawnService.openEndGameSummaryBox(true);
      }
    });
  }
}
