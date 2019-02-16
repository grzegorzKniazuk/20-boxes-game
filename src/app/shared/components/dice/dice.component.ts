import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-dice',
  templateUrl: './dice.component.html',
  styleUrls: ['./dice.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiceComponent {

  @Output() public drawnNumber$: EventEmitter<number> = new EventEmitter<number>();

  public emitDrawnNumber(): void {
    this.drawnNumber$.emit(this.randomize);
  }

  private get randomize(): number {
    return Math.floor(Math.random() * 6) + 1;
  }
}
