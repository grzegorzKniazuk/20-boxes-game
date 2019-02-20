import { Component, OnDestroy, OnInit } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { GameStateService } from '../../services/game-state.service';
import { PawnService } from '../../services/pawn.service';
import { BoxesService } from '../../services/boxes.service';
import { Router } from '@angular/router';
import { SnackbarService } from '../../services/snackbar.service';
import { MatDialog } from '@angular/material';
import { RulesComponent } from 'src/app/shared/components/rules/rules.component';
import { FormsService } from 'src/app/core/services/forms.service';
import { ConsoleComponent } from 'src/app/core/components/game-panel/console.component';
import { StoreService } from 'src/app/core/services/store.service';

@Component({
  templateUrl: './game-panel.component.html',
  styleUrls: [ './game-panel.component.scss' ],
})
export class GamePanelComponent extends ConsoleComponent implements OnInit, OnDestroy {

  constructor(protected localStorage: LocalStorage,
              public gameStateService: GameStateService,
              private boxesService: BoxesService,
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
  }

  ngOnDestroy() {
  }

  public newGame(): void {
    this.boxesService.loadBoxesSettings();
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
      this.snackbarService.success('Zapisano stan gry');
    }).catch(() => {
      this.snackbarService.error('Wystąpił problem z przekierowaniem na strone główną');
    });
  }

  public showRules(): void {
    this.matDialog.open(RulesComponent);
  }
}
