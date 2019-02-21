import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BoxSettings } from 'src/app/core/interfaces/box-settings';
import { ConsoleMessage } from 'src/app/core/interfaces/console-message';

@Injectable({
  providedIn: 'root',
})
export class StoreService {

  public readonly pawnPosition$: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  public readonly boxesSettings$: BehaviorSubject<BoxSettings[]> = new BehaviorSubject<BoxSettings[]>(null);
  public readonly consoleMessages$: BehaviorSubject<ConsoleMessage[]> = new BehaviorSubject<ConsoleMessage[]>(null);

  private readonly _finishPosition = 20;
  private _boxesSettings: BoxSettings[] = [];

  public get boxesSettings(): BoxSettings[] {
    return this._boxesSettings;
  }

  public set boxesSettings(boxesSettings: BoxSettings[]) {
    this._boxesSettings = boxesSettings;
    this.boxesSettings$.next(this._boxesSettings);
  }

  private _pawnPosition: number;

  public get pawnPosition(): number {
    return this._pawnPosition;
  }

  public set pawnPosition(position: number) {
    this._pawnPosition = position;
    this.pawnPosition$.next(this._pawnPosition);
  }

  private _consoleMessages: ConsoleMessage[] = [];

  public get consoleMessages(): ConsoleMessage[] {
    return this._consoleMessages;
  }

  public set consoleMessages(msgs: ConsoleMessage[]) {
    this._consoleMessages = msgs;
    this.consoleMessages$.next(this._consoleMessages);
  }

  public get finishPosition(): number {
    return this._finishPosition;
  }

  public sendConsoleMessage(msg: ConsoleMessage): void {
    this._consoleMessages.push(msg);
    this.consoleMessages$.next(this._consoleMessages);
  }
}
