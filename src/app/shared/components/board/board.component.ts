import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BoxSettings } from '../../../core/interfaces/box-settings';
import { BoxesService } from '../../../core/services/boxes.service';
import { ActivatedRoute } from '@angular/router';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

@AutoUnsubscribe()
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit, OnDestroy {
  @Input() public pawnPosition?: number;
  public editMode: boolean;
  public boxesSettings: BoxSettings[];

  constructor(private boxesService: BoxesService, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.initBoxesSettings();
    this.activatedRoute.data.subscribe((isEditMode: { data: boolean }) => {
      this.editMode = isEditMode.data;
    });
  }

  ngOnDestroy() { }

  private initBoxesSettings(): void {
    this.boxesService.boxesSettings$.subscribe((boxes: BoxSettings[]) => {
      this.boxesSettings = boxes;
    });
  }
}
