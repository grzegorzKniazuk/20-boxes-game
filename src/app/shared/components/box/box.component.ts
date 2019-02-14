import { AfterContentChecked, AfterViewChecked, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.scss'],
})
export class BoxComponent implements OnInit, AfterContentChecked {

  @Input() public id: number;
  @Input() public pawnPosition: number;
  public src: string;
  public pawnInBox = false;

  constructor() { }

  ngOnInit() {
    this.initBoxBackground();
  }

  ngAfterContentChecked() {
    this.checkPawnPosition();
  }

  private initBoxBackground(): void {
    this.src = `../../../../assets/images/boxes/${this.id}.jpg`;
  }

  private checkPawnPosition(): void {
    if (this.id === this.pawnPosition) {
      this.pawnInBox = true;
    } else {
      this.pawnInBox = false;
    }
  }
}
