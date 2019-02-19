import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Statistics } from '../interfaces/statistics';
import { GameState } from '../interfaces/game-state';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { map } from 'rxjs/operators';
import { ConsoleService } from 'src/app/core/services/console.service';
import { StoreService } from 'src/app/core/services/store.service';

@Injectable({
  providedIn: 'root',
})
export class GameStateService extends ConsoleService {
  public readonly gameStateAvaiable$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

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

  public get gameState(): Observable<GameState> {
    return this.localStorage.getItem('gameState').pipe(map((state: GameState) => {
      return state;
    }));
  }

  public loadGameState(): void {
    this.gameState.subscribe((state: GameState) => {
      if (state) {
        this.storeService.pawnPosition = state.pawnPosition;
        this.totalThrows = state.totalThrows;
        this.totalAmountDrawnNumbers = state.totalAmountDrawnNumbers;
        this.averangeAmountDrawnNumbers = state.averangeAmountDrawnNumbers;
        this.consoleMessages = state.consoleMessages;
        this.onLoadGameStateMessage(true);

        this.setGameState();
      } else {
        this.resetGameState();
      }
    });
  }

  public isGameStateAvaiable(): void {
    this.gameState.subscribe((state: GameState) => {
      if (state) {
        this.gameStateAvaiable$.next(true);
      } else {
        this.gameStateAvaiable$.next(false);
      }
    });
  }

  public updateGameStateStatistics(pawnPosition: number, drawnNumber: number): void {
    this.totalThrows = !this.totalThrows ? 1 : this.totalThrows + 1;
    this.totalAmountDrawnNumbers += drawnNumber;
    this.averangeAmountDrawnNumbers = Math.floor(this.totalAmountDrawnNumbers / this.totalThrows);
  }

  public resetGameState(): void {
    this.storeService.pawnPosition = 1;
    this.totalThrows = 0;
    this.totalAmountDrawnNumbers = 0;
    this.consoleMessages = [];

    this.consoleMessages$.next(this.consoleMessages);
    this.gameStateAvaiable$.next(false);

    this.sendConsoleMessage(this.resetGameMessage);
    this.sendConsoleMessage(this.newGameMessage);

    this.setGameState();
  }

  public setGameState(): void {
    this.localStorage.setItem('gameState', {
      pawnPosition: this.storeService.pawnPosition,
      totalThrows: this.totalThrows,
      totalAmountDrawnNumbers: this.totalAmountDrawnNumbers,
      averangeAmountDrawnNumbers: this.averangeAmountDrawnNumbers,
      consoleMessages: this.consoleMessages,
    }).subscribe();
  }

  public removeGameState(): void {
    this.localStorage.removeItem('gameState').subscribe(() => {
      this.gameStateAvaiable$.next(false);
    });
  }
}
