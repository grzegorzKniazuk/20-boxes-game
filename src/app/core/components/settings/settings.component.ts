import { Component, OnInit } from '@angular/core';
import { BoxesService } from '../../services/boxes.service';

@Component({
  templateUrl: './settings.component.html',
  styleUrls: [ './settings.component.scss' ],
})
export class SettingsComponent implements OnInit {

  constructor(private boxesService: BoxesService) {
  }

  ngOnInit() {
    this.boxesService.initBoxesSettings();
  }
}
