import { Injectable } from '@angular/core';
import { ConsoleMessageType } from '../enums/console-message-type.enum';
import { GameStateService } from './game-state.service';
import { MatDialog } from '@angular/material';
import { EndGameSummaryComponent } from '../../shared/components/end-game-summary/end-game-summary.component';
import { Router } from '@angular/router';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class PawnService {

  private pawnPosition: number;

  constructor(private gameStateService: GameStateService,
              private matDialog: MatDialog,
              private router: Router,
              private snackbarService: SnackbarService) { }

  public loadPawnPosition(): void {
    this.gameStateService.pawnPosition$.subscribe((pawnPosition: number) => {
      this.pawnPosition = pawnPosition;
    });
  }

  public movePawnTo(drawnNumber: number): void {
    this.gameStateService.sendConsoleMessage({
      type: ConsoleMessageType.INFO,
      message: `Wylosowano ${drawnNumber}`
    });

    this.pawnPosition += drawnNumber;

    this.gameStateService.updateGameStateStatistics(this.pawnPosition, drawnNumber);
    this.checkPawnPosition();
    this.checkIsWinner();

    this.gameStateService.pawnPosition$.next(this.pawnPosition);

    this.gameStateService.setGameState();
  }

  private checkPawnPosition(): void {
    if (this.pawnPosition > 20) {
      this.gameStateService.sendConsoleMessage({
        type: ConsoleMessageType.WARNING,
        message: `Przekroczyłeś/aś metę! Cofasz się o ${this.calculatePenatlyMoves} od mety`
      });

      this.pawnPosition = 20 - (this.pawnPosition - 20);
      this.gameStateService.pawnPosition$.next(this.pawnPosition);
    }
  }

  private get calculatePenatlyMoves(): string {
    return `${this.pawnPosition - 20} ${this.pawnPosition - 20 === 1 ? 'pole' : this.pawnPosition - 20 < 5 ? 'pola' : 'pól'}`;
  }

  private checkIsWinner(): void {
    if (this.pawnPosition === 20) {
      this.gameStateService.sendConsoleMessage({
        type: ConsoleMessageType.SUCCESS,
        message: 'BRAWO, WYGRAŁEŚ/AŚ!',
      });
      this.openEndGameSummaryBox(true);
    }
  }

  private checkIsBeaten(): void {

  }

  private openEndGameSummaryBox(isWinner: boolean): void {
    this.matDialog.open(EndGameSummaryComponent, {
      data: isWinner
    }).afterClosed().subscribe((startNewGame: boolean) => {
      if (startNewGame) {
        this.gameStateService.resetGameState();
      } else {
        this.router.navigate(['../', '../', 'home']).then(() => {
          this.snackbarService.success('Zakończono grę');
        });
      }
    });
  }
}
