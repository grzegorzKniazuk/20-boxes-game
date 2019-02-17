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
    this.consoleMessages$.next(this.consoleMessages);
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
}
