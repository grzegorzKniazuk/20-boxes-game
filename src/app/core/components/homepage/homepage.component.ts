import { Component, OnDestroy, OnInit } from '@angular/core';
import { GameStateService } from '../../services/game-state.service';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

@AutoUnsubscribe()
@Component({
  templateUrl: './homepage.component.html',
  styleUrls: [ './homepage.component.scss' ],
})
export class HomepageComponent implements OnInit, OnDestroy {

  public isGameStateAvailable: boolean;

  constructor(private gameStateService: GameStateService) {
  }

  ngOnInit() {
    this.checkIsGameStateAvailable();
  }

  ngOnDestroy() {
  }

  public initNewGame(): void {
    this.gameStateService.resetGameState();
  }

  private checkIsGameStateAvailable(): void {
    this.gameStateService.gameStateAvailable.subscribe((isGameStateAvailable) => {
      this.isGameStateAvailable = isGameStateAvailable;
    });
  }
}
