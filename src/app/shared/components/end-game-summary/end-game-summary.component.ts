import { Component, Inject, OnInit } from '@angular/core';
import { GameStateService } from '../../../core/services/game-state.service';
import { Statistics } from '../../../core/interfaces/statistics';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-end-game-summary',
  templateUrl: './end-game-summary.component.html',
  styleUrls: ['./end-game-summary.component.scss'],
})
export class EndGameSummaryComponent implements OnInit {

  public summaryStatistics: Statistics;
  public readonly winnerURL: '../../../../assets/images/winner.png';
  public readonly beatenURL: '../../../../assets/images/beaten.png';

  constructor(private gameStateService: GameStateService,
              @Inject(MAT_DIALOG_DATA) private isWinner: boolean,
              private matDialogRef: MatDialogRef<EndGameSummaryComponent>) { }

  ngOnInit() {
    console.log(this.isWinner);
    this.loadSummaryData();
  }

  private loadSummaryData(): void {
    this.summaryStatistics = this.gameStateService.gameStateStatistics;
  }

  public closeDialog(startNewGame: boolean): void {
    this.matDialogRef.close(startNewGame);
  }
}
