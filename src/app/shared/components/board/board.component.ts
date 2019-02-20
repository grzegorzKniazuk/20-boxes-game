import { Component, Input, OnInit } from '@angular/core';
import { BoxSettings } from 'src/app/core/interfaces/box-settings';
import { ActivatedRoute } from '@angular/router';
import { StoreService } from 'src/app/core/services/store.service';
import { BoxesService } from 'src/app/core/services/boxes.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: [ './board.component.scss' ],
})
export class BoardComponent implements OnInit {
  @Input() public pawnPosition: number;
  @Input() public boxesSettings: BoxSettings[];
  public editMode: boolean;

  constructor(private boxesService: BoxesService,
              private storeService: StoreService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.setEditMode();
    this.boxesService.loadBoxesSettings();
    this.initBoxesSettings();
  }

  private setEditMode(): void {
    this.editMode = this.activatedRoute.snapshot.data['enableEditMode'];
  }

  private initBoxesSettings(): void {
    this.storeService.boxesSettings$.subscribe((settings) => {
      this.boxesSettings = settings;
    });
  }
}
