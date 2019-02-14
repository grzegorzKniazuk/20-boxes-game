import { ConsoleMessageType } from '../enums/console-message-type.enum';

export interface ConsoleMessage {
  type: ConsoleMessageType;
  message: string;
}
