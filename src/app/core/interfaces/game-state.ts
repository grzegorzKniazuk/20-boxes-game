import { Statistics } from './statistics';
import { ConsoleMessage } from './console-message';

export interface GameState extends Statistics {
  pawnPosition: number;
  consoleMessages: ConsoleMessage[];
}
