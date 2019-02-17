import { Injectable } from '@angular/core';
import { ConsoleMessageType } from '../enums/console-message-type.enum';
import { GameStateService } from './game-state.service';
import { MatDialog } from '@angular/material';
import { EndGameSummaryComponent } from '../../shared/components/end-game-summary/end-game-summary.component';
import { Router } from '@angular/router';
import { SnackbarService } from './snackbar.service';
import { BoxesService } from './boxes.service';
import { BoxSettings } from '../interfaces/box-settings';

@Injectable({
  providedIn: 'root',
})
export class PawnService {

  private boxesSettings: BoxSettings[];
  private pawnPosition = 1;

  constructor(private gameStateService: GameStateService,
              private matDialog: MatDialog,
              private router: Router,
              private boxesService: BoxesService,
              private snackbarService: SnackbarService) {
  }

  private get calculatePenatlyMoves(): string {
    return `${this.pawnPosition - 20} ${this.pawnPosition - 20 === 1 ? 'pole' : this.pawnPosition - 20 < 5 ? 'pola' : 'pól'}`;
  }

  public loadPawnPosition(): void {
    this.gameStateService.pawnPosition$.subscribe((pawnPosition: number) => {
      this.pawnPosition = pawnPosition;
    });
  }

  public initBoxesSettings(): void {
    this.boxesService.boxesSettings$.subscribe((boxes: BoxSettings[]) => {
      this.boxesSettings = boxes;
    });
  }

  public movePawnTo(drawnNumber: number): void {
    this.gameStateService.sendConsoleMessage({
      type: ConsoleMessageType.INFO,
      message: `Wylosowano ${drawnNumber}`,
    });

    this.updatePawnPosition(drawnNumber);
  }

  public movePawnToSpecificField(fieldNumber: number): void {
    this.gameStateService.sendConsoleMessage({
      type: ConsoleMessageType.INFO,
      message: `Przechodzisz na pole ${fieldNumber}`,
    });

    this.updatePawnPosition(null, fieldNumber);
  }

  public movePawnToStartField(): void {
    this.gameStateService.sendConsoleMessage({
      type: ConsoleMessageType.WARNING,
      message: `Wracasz na pole startowe`,
    });

    this.updatePawnPosition(null, 1);
  }

  private updatePawnPosition(drawnNumber: number, fieldNumber?: number): void {

    if (drawnNumber) {
      this.pawnPosition += drawnNumber;
    } else {
      this.pawnPosition = fieldNumber;
    }

    this.gameStateService.updateGameStateStatistics(this.pawnPosition, drawnNumber || fieldNumber);
    this.checkPawnPosition();
    this.checkIsWinner();
    this.checkIsBeaten();
    this.checkIsToMove();
    this.checkIsToBackToStart();

    this.gameStateService.pawnPosition$.next(this.pawnPosition);

    this.gameStateService.setGameState();
  }

  private checkPawnPosition(): void {
    if (this.pawnPosition > 20) {
      this.gameStateService.sendConsoleMessage({
        type: ConsoleMessageType.WARNING,
        message: `Przekroczyłeś/aś metę! Cofasz się o ${this.calculatePenatlyMoves} od mety`,
      });

      this.pawnPosition = 20 - (this.pawnPosition - 20);
      this.gameStateService.pawnPosition$.next(this.pawnPosition);
    }
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
    for (const box of this.boxesSettings) {
      if (box.dead && box.id === this.pawnPosition) {
        this.gameStateService.sendConsoleMessage({
          type: ConsoleMessageType.WARNING,
          message: 'PRZEGRANA! SPRÓBUJ JESZCZE RAZ!',
        });
        this.openEndGameSummaryBox(false);
      }
    }
  }

  private checkIsToMove(): void {
    for (const box of this.boxesSettings) {
      if (box.goTo && box.id === this.pawnPosition) {
        this.movePawnToSpecificField(box.goTo);
      }
    }
  }

  private checkIsToBackToStart(): void {
    for (const box of this.boxesSettings) {
      if (box.goToStart && box.id === this.pawnPosition) {
        this.movePawnToStartField();
      }
    }
  }

  private openEndGameSummaryBox(isWinner: boolean): void {
    this.matDialog.open(EndGameSummaryComponent, {
      data: isWinner,
    }).afterClosed().subscribe((startNewGame: boolean) => {
      if (startNewGame) {
        this.gameStateService.resetGameState();
      } else {
        this.router.navigate([ '../', 'home' ]).then(() => {
          this.snackbarService.success('Zakończono grę');
          this.gameStateService.removeGameState();
        });
      }
    });
  }
}
