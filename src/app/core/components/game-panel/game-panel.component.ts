import { Component, OnInit } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { ConsoleMessageType } from '../../enums/console-message-type.enum';
import { BoxesService } from '../../services/boxes.service';
import { BoxSettings } from '../../interfaces/box-settings';
import { GameStateService } from '../../services/game-state.service';
import { PawnService } from '../../services/pawn.service';
import { ConsoleMessage } from '../../interfaces/console-message';
import { BehaviorSubject } from 'rxjs';

@Component({
  templateUrl: './game-panel.component.html',
  styleUrls: ['./game-panel.component.scss'],

}) // reset stanu gry przy zmianie regul
export class GamePanelComponent implements OnInit {

  public pawnPosition = 1;

  constructor(private localStorage: LocalStorage,
              private boxesService: BoxesService,
              private gameStateService: GameStateService,
              private pawnService: PawnService) { }

  ngOnInit() {
    this.initBoxesSettings();
    this.initPawnPosition();
    this.newGame();
    this.gameStateService.loadGameState();
  }

  private initBoxesSettings(): void {
    this.boxesService.initBoxesSettings().subscribe((boxes: BoxSettings[]) => {
      console.log(boxes);
    });
  }

  private initPawnPosition(): void {
    this.gameStateService.pawnPosition$.subscribe((pawnPosition: number) => {
      this.pawnPosition = pawnPosition;
    });
  }

  public get consoleMessages$(): BehaviorSubject<ConsoleMessage[]> {
    return this.gameStateService.consoleMessages$;
  }

  public newGame(): void {
    this.pawnService.loadPawnPosition();
    this.gameStateService.sendConsoleMessage(this.newGameMessage);
  }

  public resetGame(): void {
    this.gameStateService.resetGameState();
    this.gameStateService.sendConsoleMessage(this.resetGameMessage);
    this.gameStateService.sendConsoleMessage(this.newGameMessage);
  }

  public onPawnMove(drawnNumber: number) {
    this.pawnService.movePawnTo(drawnNumber);
  }

  private get resetGameMessage(): ConsoleMessage {
    return ({
      type: ConsoleMessageType.WARNING,
      message: 'Zresetowano stan gry'
    });
  }

  private get newGameMessage(): ConsoleMessage {
    return ({
      type: ConsoleMessageType.SUCCESS,
      message: 'Rozpoczęto nową grę'
    });
  }
}
