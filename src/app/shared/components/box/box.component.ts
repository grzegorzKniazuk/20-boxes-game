import { AfterContentChecked, Component, Input, OnInit } from '@angular/core';
import { BoxSettings } from '../../../core/interfaces/box-settings';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.scss'],
})
export class BoxComponent implements OnInit, AfterContentChecked {

  @Input() public id: number;
  @Input() public pawnPosition: number;
  @Input() public boxSettings: BoxSettings;
  @Input() public editMode: boolean;
  public src: string;
  public srcFirstDigit: string;
  public srcLastDigit: string;
  public tooltip: string;
  public pawnInBox = false;

  constructor() { }

  ngOnInit() {
    this.initBoxBackground();
    this.initBoxNumberLabel();
    this.initTooltip();
  }

  ngAfterContentChecked() {
    this.checkPawnPosition();
  }

  private initBoxBackground(): void {
    this.src = `../../../../assets/images/boxes/${this.id}.jpg`;
  }

  private initBoxNumberLabel(): void {
    if (this.id < 10) {
      this.srcFirstDigit = `../../../../assets/images/numbers/${this.id}.png`;
    } else if (this.id >= 20) {
      this.srcFirstDigit = `../../../../assets/images/numbers/2.png`;
      this.srcLastDigit = `../../../../assets/images/numbers/${this.id - 20}.png`;
    } else if (this.id >= 10) {
      this.srcFirstDigit = `../../../../assets/images/numbers/1.png`;
      this.srcLastDigit = `../../../../assets/images/numbers/${this.id - 10}.png`;
    }
  }

  private initTooltip(): void {
    this.tooltip = `Przechodzisz na pole ${this.boxSettings.goTo}`;
  }

  private checkPawnPosition(): void {
    this.pawnInBox = this.id === this.pawnPosition;
  }

  public selectBox(): void {
    console.log(this.boxSettings);
  }
}
