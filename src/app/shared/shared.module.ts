import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiceComponent } from './components/dice/dice.component';
import { MaterialModule } from '../material.module';
import { BoxComponent } from './components/box/box.component';

@NgModule({
  declarations: [
    DiceComponent,
    BoxComponent,
  ],
  exports: [
    DiceComponent,
    BoxComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class SharedModule { }
