import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BoxSettings } from 'src/app/core/interfaces/box-settings';

@Injectable({
  providedIn: 'root',
})
export class StoreService {

  public readonly pawnPosition$: BehaviorSubject<number> = new BehaviorSubject<number>(null);
  public readonly boxesSettings$: BehaviorSubject<BoxSettings[]> = new BehaviorSubject<BoxSettings[]>(null);

  private _boxesSettings: BoxSettings[] = [];
  private _pawnPosition: number;

  public get pawnPosition(): number {
    return this._pawnPosition;
  }

  public set pawnPosition(position: number) {
    this._pawnPosition = position;
    this.pawnPosition$.next(this._pawnPosition);
  }

  public get boxesSettings(): BoxSettings[] {
    return this._boxesSettings;
  }

  public set boxesSettings(boxesSettings: BoxSettings[]) {
    this._boxesSettings = boxesSettings;
    this.boxesSettings$.next(this._boxesSettings);
  }
}
