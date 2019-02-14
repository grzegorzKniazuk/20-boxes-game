import { Component, OnInit } from '@angular/core';
import { ConsoleMessage } from '../../interfaces/console-message';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { ConsoleMessageType } from '../../enums/console-message-type.enum';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],

})
export class BoardComponent implements OnInit {

  public consoleMessages: ConsoleMessage[] = new Array(20);
  public pawnPosition = 1;

  constructor(private localStorage: LocalStorage) { }

  ngOnInit() {
    this.fetchGameState();
  }

  private fetchGameState(): void {
    this.localStorage.getItem('gameState').subscribe((gameState) => {
      if (gameState) {
        this.consoleMessages.push({
          type: ConsoleMessageType.SUCCESS,
          message: 'Wczytano grę'
        });
      } else {
        this.consoleMessages.push({
          type: ConsoleMessageType.SUCCESS,
          message: 'Rozpoczęto nową grę'
        });
      }
    });
  }

  public onRandomNumber(randomNumber: number): void {
    this.consoleMessages.push({
      type: ConsoleMessageType.INFO,
      message: `Wylosowano ${randomNumber}`
    });
    this.pawnPosition += randomNumber;

    this.checkPawnPosition();
    this.checkIsWinner();
  }

  public newGame(): void {
    this.pawnPosition = 1;
    this.consoleMessages = [
      {
        type: ConsoleMessageType.WARNING,
        message: 'Zresetowano stan gry'
      },
      {
      type: ConsoleMessageType.SUCCESS,
      message: 'Rozpoczęto nową grę'
      }
    ];
  }

  private checkPawnPosition(): void {
    if (this.pawnPosition > 20) {
      this.consoleMessages.push({
        type: ConsoleMessageType.WARNING,
        message: `Przekroczyłeś/aś metę! Cofasz się o ${this.pawnPosition - 20} ${this.pawnPosition - 20 === 1 ? 'pole' : this.pawnPosition - 20 < 5 ? 'pola' : 'pól'} od mety`
      });
      this.pawnPosition = 20 - (this.pawnPosition - 20);
    }
  }

  private checkIsWinner(): void {
    if (this.pawnPosition === 20) {
      this.consoleMessages.push({
        type: ConsoleMessageType.SUCCESS,
        message: 'BRAWO, WYGRAŁEŚ/AŚ!',
      });
    }
  }
}
