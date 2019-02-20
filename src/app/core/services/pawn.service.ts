import { Injectable } from '@angular/core';
import { GameStateService } from './game-state.service';
import { MatDialog } from '@angular/material';
import { EndGameSummaryComponent } from '../../shared/components/end-game-summary/end-game-summary.component';
import { Router } from '@angular/router';
import { SnackbarService } from './snackbar.service';
import { BoxesService } from './boxes.service';
import { StoreService } from 'src/app/core/services/store.service';
import { SNACKBAR_MESSAGES } from 'src/app/core/constants/snackbar-messages';

@Injectable({
  providedIn: 'root',
})
export class PawnService {

  constructor(private gameStateService: GameStateService,
              private matDialog: MatDialog,
              private router: Router,
              private boxesService: BoxesService,
              private storeService: StoreService,
              private snackbarService: SnackbarService) {
  }

  private get calculatePenatlyMoves(): string {
    return `${this.storeService.pawnPosition - 20} ${this.storeService.pawnPosition - 20 === 1 ? 'pole' : this.storeService.pawnPosition - 20 < 5 ? 'pola' : 'pól'}`;
  }

  public movePawnTo(drawnNumber: number): void {
    this.gameStateService.movePawnToMessage(drawnNumber, this.storeService.pawnPosition);
    this.updatePawnPosition(drawnNumber);
  }

  public movePawnToSpecificField(fieldNumber: number): void {
    this.gameStateService.movePawnToSpecificFieldMessage(fieldNumber);
    this.updatePawnPosition(null, fieldNumber);
  }

  public movePawnToStartField(): void {
    this.storeService.sendConsoleMessage(this.gameStateService.movePawnToStartFieldMessage);
    this.updatePawnPosition(null, 1);
  }

  private updatePawnPosition(drawnNumber: number, fieldNumber?: number): void {
    if (drawnNumber) {
      this.storeService.pawnPosition += drawnNumber;
    } else {
      this.storeService.pawnPosition = fieldNumber;
    }

    this.gameStateService.updateGameStateStatistics(this.storeService.pawnPosition, drawnNumber || fieldNumber);
    this.gameStateService.setGameState(true, false);

    this.checkPawnPosition();
    this.checkIsWinner();
    this.checkIsBeaten();
    this.checkIsToMove();
    this.checkIsToBackToStart();
  }

  private checkPawnPosition(): void {
    if (this.storeService.pawnPosition > 20) {
      this.gameStateService.exceedFinishLineMessage(this.calculatePenatlyMoves, this.storeService.pawnPosition);

      this.storeService.pawnPosition = 20 - (this.storeService.pawnPosition - 20);
    }
  }

  private checkIsWinner(): void {
    if (this.storeService.pawnPosition === 20) {
      this.gameStateService.winnerOfBeatenMessage(true);
      this.openEndGameSummaryBox(true);
    }
  }

  private checkIsBeaten(): void {
    for (const box of this.storeService.boxesSettings) {
      if (box.dead && box.id === this.storeService.pawnPosition) {
        this.gameStateService.winnerOfBeatenMessage(false);
        this.openEndGameSummaryBox(false);
        this.gameStateService.setGameState(false, true);
      }
    }
  }

  private checkIsToMove(): void {
    for (const box of this.storeService.boxesSettings) {
      if (box.goTo && box.id === this.storeService.pawnPosition) {
        this.movePawnToSpecificField(box.goTo);
      }
    }
  }

  private checkIsToBackToStart(): void {
    for (const box of this.storeService.boxesSettings) {
      if (box.goToStart && box.id === this.storeService.pawnPosition) {
        this.movePawnToStartField();
      }
    }
  }

  public openEndGameSummaryBox(isWinner: boolean): void {
    this.matDialog.open(EndGameSummaryComponent, {
      data: isWinner,
    }).afterClosed().subscribe((startNewGame: boolean) => {
      if (startNewGame) {
        this.gameStateService.resetGameState();
      } else {
        this.router.navigate([ '../', 'home' ]).then(() => {
          this.snackbarService.success(SNACKBAR_MESSAGES.gameEnd);
          this.gameStateService.resetGameState();
        });
      }
    });
  }
}
