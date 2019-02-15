import { Injectable } from '@angular/core';
import { ConsoleMessageType } from '../enums/console-message-type.enum';
import { GameStateService } from './game-state.service';

@Injectable({
  providedIn: 'root'
})
export class PawnService {

  private pawnPosition: number;

  constructor(private gameStateService: GameStateService) { }

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
    }
  }

  private openEndGameSummaryBox(): void {

  }
}
