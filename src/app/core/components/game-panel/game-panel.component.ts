import { Component, OnDestroy, OnInit } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { GameStateService } from '../../services/game-state.service';
import { PawnService } from '../../services/pawn.service';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { BoxesService } from '../../services/boxes.service';
import { Router } from '@angular/router';
import { SnackbarService } from '../../services/snackbar.service';

@AutoUnsubscribe()
@Component({
  templateUrl: './game-panel.component.html',
  styleUrls: ['./game-panel.component.scss'],

}) // reset stanu gry przy zmianie regul
export class GamePanelComponent implements OnInit, OnDestroy {

  public pawnPosition = 1;

  constructor(private localStorage: LocalStorage,
              public gameStateService: GameStateService,
              private boxesService: BoxesService,
              private router: Router,
              private snackbarService: SnackbarService,
              private pawnService: PawnService) { }

  ngOnInit() {
    this.newGame();
  }

  ngOnDestroy() { }

  private initPawnPosition(): void {
    this.gameStateService.pawnPosition$.subscribe((pawnPosition: number) => {
      this.pawnPosition = pawnPosition;
    });
  }

  public newGame(): void {
    this.boxesService.initBoxesSettings();
    this.initPawnPosition();
    this.gameStateService.initPawnPosition();
    this.gameStateService.loadGameState();
    this.pawnService.loadPawnPosition();
    this.pawnService.initBoxesSettings();
  }

  public resetGame(): void {
    this.gameStateService.resetGameState();
  }

  public onPawnMove(drawnNumber: number) {
    this.pawnService.movePawnTo(drawnNumber);
  }

  public saveGameAndGoToHome(): void {
    this.router.navigate(['../', 'home']).then(() => {
      this.snackbarService.success('Zapisano stan gry');
    }).catch(() => {
      this.snackbarService.error('Wystąpił problem z przekierowaniem na strone główną');
    });
  }
}
