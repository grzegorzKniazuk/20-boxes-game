import { Injectable } from '@angular/core';
import { Statistics } from '../interfaces/statistics';
import { GameState } from '../interfaces/game-state';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { ConsoleService } from 'src/app/core/services/console.service';
import { StoreService } from 'src/app/core/services/store.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { STORE_URL } from 'src/app/core/constants/store';

@Injectable({
  providedIn: 'root',
})
export class GameStateService extends ConsoleService {

  private totalThrows = 0;
  private totalAmountDrawnNumbers = 0;
  private averangeAmountDrawnNumbers = 0;

  constructor(private localStorage: LocalStorage,
              protected storeService: StoreService,
              private consoleService: ConsoleService) {
    super(storeService);
  }

  public get gameStateStatistics(): Statistics {
    return {
      totalThrows: this.totalThrows,
      totalAmountDrawnNumbers: this.totalAmountDrawnNumbers,
      averangeAmountDrawnNumbers: this.averangeAmountDrawnNumbers,
    };
  }

  public get deadState(): Observable<boolean> {
    return this.localStorage.getItem(STORE_URL.gameState).pipe(map((gameState: GameState) => {
      return gameState.deadState;
    }));
  }

  public get winState(): Observable<boolean> {
    return this.localStorage.getItem(STORE_URL.gameState).pipe(map((gameState: GameState) => {
      return gameState.pawnPosition === this.storeService.finishPosition;
    }));
  }

  public get gameStateAvailable(): Observable<boolean> {
    return this.localStorage.getItem(STORE_URL.gameState).pipe(map((gameState: GameState) => {
      return gameState.gameStateAvailable;
    }));
  }

  public loadGameState(): void {
    this.localStorage.getItem(STORE_URL.gameState).subscribe((state: GameState) => {
      if (state) {
        this.storeService.pawnPosition = state.pawnPosition;
        this.totalThrows = state.totalThrows;
        this.totalAmountDrawnNumbers = state.totalAmountDrawnNumbers;
        this.averangeAmountDrawnNumbers = state.averangeAmountDrawnNumbers;
        this.storeService.consoleMessages = state.consoleMessages;

        if (!state.deadState && state.gameStateAvailable && state.pawnPosition !== this.storeService.finishPosition) {
          this.onLoadGameStateMessage();
        }

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
    this.storeService.consoleMessages = [];

    this.sendMessagesOnResetGameState();

    this.setGameState(false, false);
  }

  public setGameState(gameStateAvailable: boolean, deadState: boolean): void {
    this.localStorage.setItem(STORE_URL.gameState, {
      pawnPosition: this.storeService.pawnPosition,
      totalThrows: this.totalThrows,
      totalAmountDrawnNumbers: this.totalAmountDrawnNumbers,
      averangeAmountDrawnNumbers: this.averangeAmountDrawnNumbers,
      consoleMessages: this.storeService.consoleMessages,
      deadState: deadState,
      gameStateAvailable: gameStateAvailable,
    }).subscribe();
  }

  private sendMessagesOnResetGameState(): void {
    this.gameStateAvailable.subscribe((isGameStateAvailable) => {
      if (isGameStateAvailable) {
        this.storeService.sendConsoleMessage(this.resetGameMessage);
        this.storeService.sendConsoleMessage(this.newGameMessage);
        this.consoleService.loadSavedGameSettingsMessage();
      } else {
        this.storeService.sendConsoleMessage(this.newGameMessage);
        this.consoleService.loadSavedGameSettingsMessage();
      }
    });
  }
}
