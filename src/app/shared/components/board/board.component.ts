import { Component, Input, OnInit } from '@angular/core';
import { BoxSettings } from '../../../core/interfaces/box-settings';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  @Input() public pawnPosition?: number;
  public boxesSettings: BoxSettings[];

  ngOnInit() {
    this.loadBoxSettigs();
  }

  private loadBoxSettigs(): void {

  }
}
