import { Component, OnDestroy, OnInit } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { BoxesService } from '../../services/boxes.service';
import { BoxSettings } from '../../interfaces/box-settings';
import { GameStateService } from '../../services/game-state.service';
import { PawnService } from '../../services/pawn.service';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

@AutoUnsubscribe()
@Component({
  templateUrl: './game-panel.component.html',
  styleUrls: ['./game-panel.component.scss'],

}) // reset stanu gry przy zmianie regul
export class GamePanelComponent implements OnInit, OnDestroy {

  public pawnPosition = 1;

  constructor(private localStorage: LocalStorage,
              private boxesService: BoxesService,
              public gameStateService: GameStateService,
              private pawnService: PawnService) { }

  ngOnInit() {
    this.newGame();
  }

  ngOnDestroy() { }

  private initBoxesSettings(): void {
    this.boxesService.initBoxesSettings().subscribe((boxes: BoxSettings[]) => {

    });
  }

  private initPawnPosition(): void {
    this.gameStateService.pawnPosition$.subscribe((pawnPosition: number) => {
      this.pawnPosition = pawnPosition;
    });
  }

  public newGame(): void {
    this.initBoxesSettings();
    this.initPawnPosition();
    this.gameStateService.initPawnPosition();
    this.gameStateService.loadGameState();
    this.pawnService.loadPawnPosition();
  }

  public resetGame(): void {
    this.gameStateService.resetGameState();
  }

  public onPawnMove(drawnNumber: number) {
    this.pawnService.movePawnTo(drawnNumber);
  }
}
