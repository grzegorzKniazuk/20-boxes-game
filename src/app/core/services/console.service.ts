import { Injectable } from '@angular/core';
import { ConsoleMessage } from 'src/app/core/interfaces/console-message';
import { ConsoleMessageType } from 'src/app/core/enums/console-message-type.enum';
import { StoreService } from 'src/app/core/services/store.service';
import { CONSOLE_MESSAGES } from 'src/app/core/constants/console-messages';

@Injectable({
  providedIn: 'root'
})
export class ConsoleService {

  constructor(protected storeService: StoreService) { }

  protected onLoadGameStateMessage(state: boolean = false): void {
    this.storeService.sendConsoleMessage({
      type: ConsoleMessageType.SUCCESS,
      message: state ? CONSOLE_MESSAGES.loadGame : CONSOLE_MESSAGES.newGame,
    });
  }

  public get resetGameMessage(): ConsoleMessage {
    return ({
      type: ConsoleMessageType.WARNING,
      message: CONSOLE_MESSAGES.resetGame,
    });
  }

  public get newGameMessage(): ConsoleMessage {
    return ({
      type: ConsoleMessageType.SUCCESS,
      message: CONSOLE_MESSAGES.newGame,
    });
  }

  public get movePawnToStartFieldMessage(): ConsoleMessage {
    return ({
      type: ConsoleMessageType.WARNING,
      message: CONSOLE_MESSAGES.goToStartField,
    });
  }

  public movePawnToMessage(drawnNumber: number, pawnPosition: number): void {
    this.storeService.sendConsoleMessage({
      type: ConsoleMessageType.INFO,
      message: `${CONSOLE_MESSAGES.drawn} ${drawnNumber}`,
    });
    this.storeService.sendConsoleMessage({
      type: ConsoleMessageType.GOTO,
      message: `${CONSOLE_MESSAGES.goTo} ${pawnPosition + drawnNumber}`,
    });
  }

  public movePawnToSpecificFieldMessage(fieldNumber: number): void {
    this.storeService.sendConsoleMessage({
      type: ConsoleMessageType.MOVED,
      message: `${CONSOLE_MESSAGES.movedTo} ${fieldNumber}`,
    });
  }

  public exceedFinishLineMessage(penatlyMoves: string, pawnPosition: number): void {
    this.storeService.sendConsoleMessage({
      type: ConsoleMessageType.WARNING,
      message: `${CONSOLE_MESSAGES.exceedFinish} ${penatlyMoves} od mety`,
    });
    this.storeService.sendConsoleMessage({
      type: ConsoleMessageType.GOTO,
      message: `${CONSOLE_MESSAGES.redirectTo} ${pawnPosition}`,
    });
  }

  public winnerOfBeatenMessage(isWinner: boolean): void {
    this.storeService.sendConsoleMessage({
      type: isWinner ? ConsoleMessageType.SUCCESS : ConsoleMessageType.WARNING,
      message: isWinner ? CONSOLE_MESSAGES.win : CONSOLE_MESSAGES.loose,
    });
  }

  public loadSavedOfDefaultGameSettings(isSaved: boolean): void {
    this.storeService.sendConsoleMessage({
      type: ConsoleMessageType.INFO,
      message: isSaved ? CONSOLE_MESSAGES.loadDefaultSettings : CONSOLE_MESSAGES.loadSettings,
    });
  }
}
