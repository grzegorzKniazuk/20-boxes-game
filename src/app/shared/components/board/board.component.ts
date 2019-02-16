import { Component, Input, OnInit } from '@angular/core';
import { BoxSettings } from '../../../core/interfaces/box-settings';
import { BoxesService } from '../../../core/services/boxes.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  @Input() public pawnPosition?: number;
  @Input() public editMode: boolean;
  public boxesSettings: BoxSettings[];

  constructor(private boxesService: BoxesService) {}

  ngOnInit() {
    this.initBoxesSettings();
  }

  private initBoxesSettings(): void {
    this.boxesService.boxesSettings$.subscribe((boxes: BoxSettings[]) => {
      this.boxesSettings = boxes;
    });
  }
}
