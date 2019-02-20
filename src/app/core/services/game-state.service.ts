import { Injectable } from '@angular/core';
import { Statistics } from '../interfaces/statistics';
import { GameState } from '../interfaces/game-state';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { ConsoleService } from 'src/app/core/services/console.service';
import { StoreService } from 'src/app/core/services/store.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GameStateService extends ConsoleService {

  private totalThrows = 0;
  private totalAmountDrawnNumbers = 0;
  private averangeAmountDrawnNumbers = 0;

  constructor(private localStorage: LocalStorage, private storeService: StoreService) {
    super();
  }

  public get gameStateStatistics(): Statistics {
    return {
      totalThrows: this.totalThrows,
      totalAmountDrawnNumbers: this.totalAmountDrawnNumbers,
      averangeAmountDrawnNumbers: this.averangeAmountDrawnNumbers,
    };
  }

  public loadGameState(): void {
    this.localStorage.getItem('gameState').subscribe((state: GameState) => {
      if (state) {
        this.storeService.pawnPosition = state.pawnPosition;
        this.totalThrows = state.totalThrows;
        this.totalAmountDrawnNumbers = state.totalAmountDrawnNumbers;
        this.averangeAmountDrawnNumbers = state.averangeAmountDrawnNumbers;
        this.consoleMessages = state.consoleMessages;

        if (!state.deadState) {
          this.onLoadGameStateMessage(true);
        }

        this.consoleMessages$.next(this.consoleMessages);

        this.setGameState(state.gameStateAvailable, state.deadState);
      } else {
        this.resetGameState();
      }
    });
  }

  public updateGameStateStatistics(pawnPosition: number, drawnNumber: number): void {
    this.totalThrows = !this.totalThrows ? 1 : this.totalThrows + 1;
    this.totalAmountDrawnNumbers += drawnNumber;
    this.averangeAmountDrawnNumbers = Math.floor(this.totalAmountDrawnNumbers / this.totalThrows);
  }

  public resetGameState(): void {
    this.totalThrows = 0;
    this.totalAmountDrawnNumbers = 0;
    this.averangeAmountDrawnNumbers = 0;
    this.storeService.pawnPosition = 1;
    this.consoleMessages = [];

    this.consoleMessages$.next(this.consoleMessages);

    this.sendConsoleMessage(this.resetGameMessage);
    this.sendConsoleMessage(this.newGameMessage);

    this.setGameState(false, false);
  }

  public setGameState(gameStateAvailable: boolean, deadState: boolean): void {
    this.localStorage.setItem('gameState', {
      pawnPosition: this.storeService.pawnPosition,
      totalThrows: this.totalThrows,
      totalAmountDrawnNumbers: this.totalAmountDrawnNumbers,
      averangeAmountDrawnNumbers: this.averangeAmountDrawnNumbers,
      consoleMessages: this.consoleMessages,
      deadState: deadState,
      gameStateAvailable: gameStateAvailable
    }).subscribe();
  }

  public get deadState(): Observable<boolean> {
    return this.localStorage.getItem('gameState').pipe(map((gameState: GameState) => {
      return gameState.deadState;
    }));
  }
}
