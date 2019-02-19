import { Injectable } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { BoxSettings } from '../interfaces/box-settings';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { GameStateService } from './game-state.service';
import { SnackbarService } from './snackbar.service';
import { Router } from '@angular/router';
import { BoxDependencies } from '../interfaces/box-dependencies';
import { StoreService } from 'src/app/core/services/store.service';

@Injectable({
  providedIn: 'root',
})
export class BoxesService {

  constructor(private localStorage: LocalStorage,
              private gameStateService: GameStateService,
              private router: Router,
              private storeService: StoreService,
              private snackbarService: SnackbarService) {
  }

  public loadBoxesSettings(): void {
    this.localStorage.getItem('boxesSettings')
    .subscribe((boxes: BoxSettings[]) => {
      if (boxes) {
        this.sendBoxesSettingsLoadMessage();
        this.storeService.boxesSettings = boxes;
      } else {
        return this.setBoxesDefaultSettings();
      }
    });
  }

  public getBoxSettings(id: number): BoxSettings {
    return this.storeService.boxesSettings.find((settings: BoxSettings) => {
      return settings.id === id;
    });
  }

  public setBoxesDefaultSettings(): void {
    for (let i = 0; i < 20; i++) {
      this.storeService.boxesSettings.push({
        id: i + 1,
        dead: i + 1 === 12,
        goToStart: false,
        goTo: i + 1 === 19 ? 11 : null,
      });
    }

    this.saveBoxesSettings(this.storeService.boxesSettings).subscribe((isSaved) => {
      this.sendBoxesSettingsLoadMessage(isSaved);
    });
  }

  public saveBoxSettings(box: BoxSettings): void {
    this.gameStateService.removeGameState();

    this.storeService.boxesSettings = this.storeService.boxesSettings.map((boxSettings: BoxSettings) => {
      if (boxSettings.id === box.id) {
        boxSettings.dead = box.dead;
        boxSettings.goToStart = box.goToStart;
        boxSettings.goTo = box.goTo;
      }
      return boxSettings;
    });
    this.saveBoxesSettings(this.storeService.boxesSettings).subscribe(() => {

      this.router.navigate([ '../', 'settings', { outlets: { board: 'board', edit: 'edit' } } ]).then(() => {
        this.snackbarService.success(`Zapisano ustawienia dla pola ${box.id}`);
      }).catch(() => {
        this.snackbarService.error('Nie udało się powrócić do strony głównej ustawień');
      });
    });
  }

  public getBoxDependencies(id: number): BoxDependencies {
    const dependencies = [];

    for (const box of this.storeService.boxesSettings) {
      if (box.goTo === id) {
        dependencies.push(box.id);
      }
    }

    return ({
      cannotMove: dependencies,
    });
  }

  private sendBoxesSettingsLoadMessage(isSaved: boolean = false): void {
    if (this.router.url.includes('settings') && isSaved) {
      this.snackbarService.success('Wczytano domyślne ustawienia gry');
    } else {
      this.gameStateService.loadSavedOfDefaultGameSettings(isSaved);
    }
  }

  private saveBoxesSettings(boxesSettings: BoxSettings[]): Observable<boolean> {
    return this.localStorage.setItem('boxesSettings', boxesSettings)
      .pipe(catchError((error) => {
        this.snackbarService.error(error);
        return of(false);
      }))
      .pipe(map((isSaved) => {
        return isSaved;
      }));
  }
}
