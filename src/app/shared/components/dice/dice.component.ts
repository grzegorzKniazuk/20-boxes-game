import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Output } from '@angular/core';

@Component({
  selector: 'app-dice',
  templateUrl: './dice.component.html',
  styleUrls: ['./dice.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiceComponent {

  @Output() public randomNumber$: EventEmitter<number> = new EventEmitter<number>();

  @HostListener('document:keypress:enter')
  public emitRandomNumber(): void {
    this.randomNumber$.emit(this.randomize);
  }

  private get randomize(): number {
    return Math.floor(Math.random() * 6) + 1;
  }
}
