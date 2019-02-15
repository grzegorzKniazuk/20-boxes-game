import { Component, Inject, OnInit } from '@angular/core';
import { GameStateService } from '../../../core/services/game-state.service';
import { Statistics } from '../../../core/interfaces/statistics';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-end-game-summary',
  templateUrl: './end-game-summary.component.html',
  styleUrls: ['./end-game-summary.component.scss'],
})
export class EndGameSummaryComponent implements OnInit {

  public summaryStatistics: Statistics;

  constructor(private gameStateService: GameStateService, @Inject(MAT_DIALOG_DATA) public winner: boolean) { }

  ngOnInit() {
    console.log(this.winner);
    this.loadSummaryData();
  }

  private loadSummaryData(): void {
    this.summaryStatistics = this.gameStateService.gameStateStatistics;
  }
}
