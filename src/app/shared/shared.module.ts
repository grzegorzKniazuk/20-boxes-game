import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiceComponent } from './components/dice/dice.component';
import { MaterialModule } from '../material.module';
import { BoxComponent } from './components/box/box.component';
import { BoardComponent } from './components/board/board.component';
import { EndGameSummaryComponent } from './components/end-game-summary/end-game-summary.component';
import { EditBoxComponent } from './components/box/edit-box/edit-box.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RulesComponent } from './components/rules/rules.component';
import { ConsoleFilterPipe } from './pipes/console-filter.pipe';

@NgModule({
  declarations: [
    DiceComponent,
    BoxComponent,
    BoardComponent,
    EndGameSummaryComponent,
    EditBoxComponent,
    RulesComponent,
    ConsoleFilterPipe,
  ],
  entryComponents: [
    EndGameSummaryComponent,
    RulesComponent,
  ],
  exports: [
    DiceComponent,
    BoardComponent,
    EndGameSummaryComponent,
    EditBoxComponent,
    RulesComponent,
    FormsModule,
    ReactiveFormsModule,
    ConsoleFilterPipe,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class SharedModule {
}
