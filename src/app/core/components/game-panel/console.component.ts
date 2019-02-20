import { FormsService } from 'src/app/core/services/forms.service';
import { FormGroup } from '@angular/forms';
import { ConsoleFilerRules } from 'src/app/core/interfaces/console-filer-rules';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { filter } from 'rxjs/operators';
import { STORE_URL } from 'src/app/core/constants/store';
import { ConsoleMessageType } from 'src/app/core/enums/console-message-type.enum';
import { SNACKBAR_MESSAGES } from 'src/app/core/constants/snackbar-messages';

export class ConsoleComponent {

  public consoleFilterForm: FormGroup;
  public consoleFilterRules: ConsoleFilerRules;

  constructor(protected formService: FormsService,
              protected localStorage: LocalStorage,
              protected snackbarService: SnackbarService) {
  }

  protected initConsole(): void {
    this.initConsoleFilterForm();
    this.loadSavedConsoleFilterRules();
  }

  private initConsoleFilterForm(): void {
    this.consoleFilterForm = this.formService.consoleFilterForm;
    this.loadConsoleFilterFormBaseConfig();
  }

  private loadConsoleFilterFormBaseConfig(): void {
    this.consoleFilterRules = this.consoleFilterForm.value;
  }

  protected loadSavedConsoleFilterRules(): void {
    this.localStorage.getItem(STORE_URL.consoleFilterRules).subscribe((rules: ConsoleFilerRules) => {
      if (rules) {
        this.consoleFilterRules = rules;
        this.setFormValues(rules);
      } else {
        this.saveConsoleFilterRules();
      }
      this.watchConsoleFormFilterChanges();
    });
  }

  private watchConsoleFormFilterChanges(): void {
    this.consoleFilterForm.valueChanges
    .subscribe((formValue) => {
      this.consoleFilterRules = formValue;
      this.saveConsoleFilterRules();
    });
  }

  protected setFormValues(rules: ConsoleFilerRules): void {
    this.consoleFilterForm.get(ConsoleMessageType.SUCCESS).setValue(rules.success);
    this.consoleFilterForm.get(ConsoleMessageType.GOTO).setValue(rules.goto);
    this.consoleFilterForm.get(ConsoleMessageType.MOVED).setValue(rules.moved);
    this.consoleFilterForm.get(ConsoleMessageType.WARNING).setValue(rules.warning);
    this.consoleFilterForm.get(ConsoleMessageType.INFO).setValue(rules.info);
  }

  protected saveConsoleFilterRules(): void {
    this.localStorage.setItem(STORE_URL.consoleFilterRules, this.consoleFilterRules)
      .pipe(filter((isSaved) => !!isSaved))
      .subscribe(() => {
        this.snackbarService.success(SNACKBAR_MESSAGES.consoleFilterRulesSaved);
      });
  }
}
