import { Component, Input, OnInit } from '@angular/core';
import { BoxSettings } from 'src/app/core/interfaces/box-settings';
import { ActivatedRoute } from '@angular/router';
import { StoreService } from 'src/app/core/services/store.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: [ './board.component.scss' ],
})
export class BoardComponent implements OnInit {
  @Input() public pawnPosition: number;
  @Input() public boxesSettings: BoxSettings[];
  public editMode: boolean;

  constructor(private storeService: StoreService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.setEditMode();
    this.fetchBoxSettings();
  }

  private setEditMode(): void {
    this.editMode = this.activatedRoute.snapshot.data['enableEditMode'];
  }

  private fetchBoxSettings(): void {
    if (this.editMode) {
      this.boxesSettings = this.activatedRoute.snapshot.data['boxesSettings'];
    }
  }
}
