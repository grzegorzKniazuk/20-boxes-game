import { Injectable } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { BoxSettings } from '../interfaces/box-settings';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GameStateService } from './game-state.service';
import { ConsoleMessageType } from '../enums/console-message-type.enum';

@Injectable({
  providedIn: 'root'
})
export class BoxesService {

  private readonly boxesSettings: BoxSettings[] = [];

  constructor(private localStorage: LocalStorage, private gameStateService: GameStateService) { }

  public initBoxesSettings(): Observable<BoxSettings[]> {
    return this.localStorage.getItem('boxesSettings').pipe(map((boxes: BoxSettings[]) => {
      if (boxes) {
        this.sendBoxesSettingsLoadMessage();
        return boxes;
      } else {
        return this.setBoxesDefaultSettings();
      }
    }));
  }

  private setBoxesDefaultSettings(): BoxSettings[] {
    for (let i = 0; i < 20; i++) {
      this.boxesSettings.push({
        id: i + 1,
        win: i + 1 === 20,
        dead: i + 1 === 12,
        goTo: i + 1 === 19 ? 11 : null,
        goBack: null,
        goForward: null
      });
    }

    this.saveBoxesSettings(this.boxesSettings).subscribe((isSaved) => {
      this.sendBoxesSettingsLoadMessage(isSaved);
    });

    return this.boxesSettings;
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
