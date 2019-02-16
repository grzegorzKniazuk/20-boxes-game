import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiceComponent } from './components/dice/dice.component';
import { MaterialModule } from '../material.module';
import { BoxComponent } from './components/box/box.component';
import { BoardComponent } from './components/board/board.component';
import { EndGameSummaryComponent } from './components/end-game-summary/end-game-summary.component';
import { EditBoxComponent } from './components/box/edit-box/edit-box.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DiceComponent,
    BoxComponent,
    BoardComponent,
    EndGameSummaryComponent,
    EditBoxComponent,
  ],
  entryComponents: [
    EndGameSummaryComponent,
  ],
  exports: [
    DiceComponent,
    BoardComponent,
    EndGameSummaryComponent,
    EditBoxComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class SharedModule { }
