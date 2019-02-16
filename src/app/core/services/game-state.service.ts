import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ConsoleMessage } from '../interfaces/console-message';
import { Statistics } from '../interfaces/statistics';
import { GameState } from '../interfaces/game-state';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { map } from 'rxjs/operators';
import { ConsoleMessageType } from '../enums/console-message-type.enum';

@Injectable({
  providedIn: 'root'
})
export class GameStateService { // do poprawki wiadomosci inicjalizacyjne

  public readonly consoleMessages$: BehaviorSubject<ConsoleMessage[]> = new BehaviorSubject<ConsoleMessage[]>(null);
  public readonly pawnPosition$: BehaviorSubject<number> = new BehaviorSubject<number>(null);
  public readonly gameStateAvaiable$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private pawnPosition: number;
  private totalThrows = 0;
  private totalAmountDrawnNumbers = 0;
  private averangeAmountDrawnNumbers = 0;
  private consoleMessages: ConsoleMessage[] = [];

  constructor(private localStorage: LocalStorage) {}

  public loadGameState(): void {
    this.gameState.subscribe((state: GameState) => {
      if (state) {
        this.pawnPosition = state.pawnPosition; // pawn position
        this.totalThrows = state.totalThrows;
        this.totalAmountDrawnNumbers = state.totalAmountDrawnNumbers;
        this.averangeAmountDrawnNumbers = state.averangeAmountDrawnNumbers;
        this.consoleMessages = state.consoleMessages;
        this.loadGameStateMessage(true);

        this.pawnPosition$.next(this.pawnPosition);

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

  public initPawnPosition(): void {
    this.pawnPosition$.subscribe((pawnPosition: number) => {
      this.pawnPosition = pawnPosition;
    });
  }

  private loadGameStateMessage(state: boolean = false): void {
    this.consoleMessages.push({
      type: ConsoleMessageType.SUCCESS,
      message: state ? 'Wczytano grę' : 'Rozpoczęto nową grę',
    });
    this.consoleMessages$.next(this.consoleMessages);
  }

  public updateGameStateStatistics(pawnPosition: number, drawnNumber: number): void {
    this.totalThrows = !this.totalThrows ? 1 : this.totalThrows + 1;
    this.totalAmountDrawnNumbers += drawnNumber;
    this.averangeAmountDrawnNumbers = Math.floor(this.totalAmountDrawnNumbers / this.totalThrows);
  }

  public get gameStateStatistics(): Statistics {
    return {
      totalThrows: this.totalThrows,
      totalAmountDrawnNumbers: this.totalAmountDrawnNumbers,
      averangeAmountDrawnNumbers: this.averangeAmountDrawnNumbers
    };
  }

  public resetGameState(): void {
    this.pawnPosition = 1;
    this.totalThrows = 0;
    this.totalAmountDrawnNumbers = 0;
    this.consoleMessages = [];

    this.pawnPosition$.next(this.pawnPosition);
    this.consoleMessages$.next(this.consoleMessages);

    this.sendConsoleMessage(this.resetGameMessage);
    this.sendConsoleMessage(this.newGameMessage);

    this.setGameState();
  }

  public setGameState(): void {
    this.localStorage.setItem('gameState', {
      pawnPosition: this.pawnPosition,
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

  public get gameState(): Observable<GameState> {
    return this.localStorage.getItem('gameState').pipe(map((state: GameState) => {
      return state;
    }));
  }

  public sendConsoleMessage(msg: ConsoleMessage): void {
    this.consoleMessages.push(msg);
  }

  public get resetGameMessage(): ConsoleMessage {
    return ({
      type: ConsoleMessageType.WARNING,
      message: 'Zresetowano stan gry'
    });
  }

  public get newGameMessage(): ConsoleMessage {
    return ({
      type: ConsoleMessageType.SUCCESS,
      message: 'Rozpoczęto nową grę'
    });
  }
}
