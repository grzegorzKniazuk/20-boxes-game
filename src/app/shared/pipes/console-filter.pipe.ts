import { Pipe, PipeTransform } from '@angular/core';
import { ConsoleMessage } from 'src/app/core/interfaces/console-message';
import { ConsoleFilerRules } from 'src/app/core/interfaces/console-filer-rules';

@Pipe({
  name: 'consoleFilter'
})
export class ConsoleFilterPipe implements PipeTransform {

  transform(value: ConsoleMessage, filterRules: ConsoleFilerRules): string {
    let message;

    Object.entries(filterRules).forEach(([key, rule]) => {
      if (value.type === key && rule) {
        message = value.message;
      }
    });

    return message;
  }
}
