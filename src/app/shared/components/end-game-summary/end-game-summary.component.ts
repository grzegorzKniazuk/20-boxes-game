import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { GameStateService } from 'src/app/core/services/game-state.service';
import { Statistics } from 'src/app/core/interfaces/statistics';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-end-game-summary',
  templateUrl: './end-game-summary.component.html',
  styleUrls: [ './end-game-summary.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EndGameSummaryComponent implements OnInit {

  public summaryStatistics: Statistics;
  public readonly winnerURL = '../../../../assets/images/winner.svg';
  public readonly beatenURL = '../../../../assets/images/beaten.svg';

  constructor(private gameStateService: GameStateService,
              @Inject(MAT_DIALOG_DATA) private isWinner: boolean,
              private matDialogRef: MatDialogRef<EndGameSummaryComponent>) {
  }

  ngOnInit() {
    this.loadSummaryData();
  }

  public closeDialog(startNewGame: boolean): void {
    this.matDialogRef.close(startNewGame);
  }

  private loadSummaryData(): void {
    this.summaryStatistics = this.gameStateService.gameStateStatistics;
  }
}
