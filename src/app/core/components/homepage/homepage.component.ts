import { Component, OnDestroy, OnInit } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

@AutoUnsubscribe()
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit, OnDestroy {

  public isGameStateAvaiable: boolean;

  constructor(private localStorage: LocalStorage) { }

  ngOnInit() {
    this.checkGameStateAvaiable();
  }

  ngOnDestroy() {  }

  private checkGameStateAvaiable(): void {
    this.localStorage.getItem('gameState').subscribe((gameState) => {
      this.isGameStateAvaiable = !!gameState;
    });
  }
}
