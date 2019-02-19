import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  public readonly pawnPosition$: BehaviorSubject<number> = new BehaviorSubject<number>(null);

  private _pawnPosition: number;

  public get pawnPosition(): number {
    return this._pawnPosition;
  }

  public set pawnPosition(position: number) {
    this._pawnPosition = position;
    this.pawnPosition$.next(this._pawnPosition);
  }

  public initPawnPosition(): void {
    this.pawnPosition$.subscribe((pawnPosition: number) => {
      this.pawnPosition = pawnPosition;
    });
  }
}
