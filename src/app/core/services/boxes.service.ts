import { Injectable } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { BoxSettings } from '../interfaces/box-settings';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GameStateService } from './game-state.service';
import { ConsoleMessageType } from '../enums/console-message-type.enum';

@Injectable({
  providedIn: 'root'
})
export class BoxesService {

  public readonly boxesSettings$: BehaviorSubject<BoxSettings[]> = new BehaviorSubject<BoxSettings[]>(null);
  private boxesSettings: BoxSettings[] = [];

  constructor(private localStorage: LocalStorage, private gameStateService: GameStateService) { }

  public initBoxesSettings(): void {
    this.localStorage.getItem('boxesSettings').subscribe((boxes: BoxSettings[]) => {
      if (boxes) {
        this.sendBoxesSettingsLoadMessage();
        this.boxesSettings = boxes;
        this.boxesSettings$.next(boxes);
      } else {
        return this.setBoxesDefaultSettings();
      }
    });
  }

  public getBoxSettings(id: number): BoxSettings {
    return this.boxesSettings.find((settings: BoxSettings) => {
      return settings.id === id;
    });
  }

  private setBoxesDefaultSettings(): void {
    for (let i = 0; i < 20; i++) {
      this.boxesSettings.push({
        id: i + 1,
        win: i + 1 === 20,
        dead: i + 1 === 12,
        goTo: i + 1 === 19 ? 11 : null,
      });
    }

    this.saveBoxesSettings(this.boxesSettings).subscribe((isSaved) => {
      this.sendBoxesSettingsLoadMessage(isSaved);
      this.boxesSettings$.next(this.boxesSettings);
    });
  }

  private sendBoxesSettingsLoadMessage(isSaved: boolean = false): void {
    this.gameStateService.sendConsoleMessage({
      type: ConsoleMessageType.INFO,
      message: `Wczytano ${isSaved ? 'domyślne' : ''} ustawienia gry`
    });
  }

  private saveBoxesSettings(boxesSettings: BoxSettings[]): Observable<boolean> {
    return this.localStorage.setItem('boxesSettings', boxesSettings).pipe(map((isSaved) => {
      return isSaved;
    }));
  }
}
