import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiceComponent } from './components/dice/dice.component';
import { MaterialModule } from '../material.module';
import { BoxComponent } from './components/box/box.component';
import { BoardComponent } from './components/board/board.component';
import { EndGameSummaryComponent } from './components/end-game-summary/end-game-summary.component';

@NgModule({
  declarations: [
    DiceComponent,
    BoxComponent,
    BoardComponent,
    EndGameSummaryComponent,
  ],
  entryComponents: [
    EndGameSummaryComponent,
  ],
  exports: [
    DiceComponent,
    BoardComponent,
    EndGameSummaryComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class SharedModule { }
