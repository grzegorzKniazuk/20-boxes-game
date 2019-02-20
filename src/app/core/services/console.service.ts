import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ConsoleMessage } from 'src/app/core/interfaces/console-message';
import { ConsoleMessageType } from 'src/app/core/enums/console-message-type.enum';

@Injectable({
  providedIn: 'root'
})
export class ConsoleService {

  public readonly consoleMessages$: BehaviorSubject<ConsoleMessage[]> = new BehaviorSubject<ConsoleMessage[]>(null);
  protected consoleMessages: ConsoleMessage[] = [];

  public sendConsoleMessage(msg: ConsoleMessage): void {
    this.consoleMessages.push(msg);
  }

  protected onLoadGameStateMessage(state: boolean = false): void {
    this.consoleMessages.push({
      type: ConsoleMessageType.SUCCESS,
      message: state ? 'Wczytano grę' : 'Rozpoczęto nową grę',
    });
  }

  public get resetGameMessage(): ConsoleMessage {
    return ({
      type: ConsoleMessageType.WARNING,
      message: 'Zresetowano stan gry',
    });
  }

  public get newGameMessage(): ConsoleMessage {
    return ({
      type: ConsoleMessageType.SUCCESS,
      message: 'Rozpoczęto nową grę',
    });
  }

  public get movePawnToStartFieldMessage(): ConsoleMessage {
    return ({
      type: ConsoleMessageType.WARNING,
      message: `Wracasz na pole startowe`,
    });
  }

  public movePawnToMessage(drawnNumber: number, pawnPosition: number): void {
    this.sendConsoleMessage({
      type: ConsoleMessageType.INFO,
      message: `Wylosowano ${drawnNumber}`,
    });
    this.sendConsoleMessage({
      type: ConsoleMessageType.GOTO,
      message: `Przechodzisz na pole ${pawnPosition + drawnNumber}`,
    });
  }

  public movePawnToSpecificFieldMessage(fieldNumber: number): void {
    this.sendConsoleMessage({
      type: ConsoleMessageType.MOVED,
      message: `Zostajesz przeniesiony na pole ${fieldNumber}`,
    });
  }

  public exceedFinishLineMessage(penatlyMoves: string, pawnPosition: number): void {
    this.sendConsoleMessage({
      type: ConsoleMessageType.WARNING,
      message: `Przekroczyłeś/aś metę! Cofasz się o ${penatlyMoves} od mety`,
    });
    this.sendConsoleMessage({
      type: ConsoleMessageType.GOTO,
      message: `Przenosisz się na pole ${pawnPosition}`,
    });
  }

  public winnerOfBeatenMessage(isWinner: boolean): void {
    this.sendConsoleMessage({
      type: isWinner ? ConsoleMessageType.SUCCESS : ConsoleMessageType.WARNING,
      message: isWinner ?  'BRAWO, WYGRAŁEŚ/AŚ!' : 'PRZEGRANA! SPRÓBUJ JESZCZE RAZ!',
    });
  }

  public loadSavedOfDefaultGameSettings(isSaved: boolean): void {
    this.sendConsoleMessage({
      type: ConsoleMessageType.INFO,
      message: `Wczytano ${isSaved ? 'domyślne' : ''} ustawienia gry`,
    });
  }
}
