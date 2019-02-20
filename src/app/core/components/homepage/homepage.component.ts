import { Component, OnInit } from '@angular/core';
import { GameStateService } from '../../services/game-state.service';

@Component({
  templateUrl: './homepage.component.html',
  styleUrls: [ './homepage.component.scss' ],
})
export class HomepageComponent implements OnInit {

  constructor(public gameStateService: GameStateService) {
  }

  ngOnInit() {

  }

  public initNewGame(): void {
    this.gameStateService.resetGameState();
  }
}
