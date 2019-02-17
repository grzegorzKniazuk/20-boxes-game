import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: [ './rules.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RulesComponent {

  constructor(private matDialogRef: MatDialogRef<RulesComponent>) {
  }

  public closeDialog(): void {
    this.matDialogRef.close();
  }
}
