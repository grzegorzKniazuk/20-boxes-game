import { Component } from '@angular/core';
import { GameStateService } from '../../services/game-state.service';

@Component({
  templateUrl: './homepage.component.html',
  styleUrls: [ './homepage.component.scss' ],
})
export class HomepageComponent {

  constructor(public gameStateService: GameStateService) {
  }

  public initNewGame(): void {
    this.gameStateService.resetGameState();
  }
}
