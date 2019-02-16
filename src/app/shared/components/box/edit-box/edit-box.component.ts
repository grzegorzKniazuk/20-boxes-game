import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { BoxSettings } from '../../../../core/interfaces/box-settings';
import { FormsService } from '../../../../core/services/forms.service';
import { FormGroup } from '@angular/forms';
import { BoxesService } from '../../../../core/services/boxes.service';

@AutoUnsubscribe()
@Component({
  selector: 'app-edit-box',
  templateUrl: './edit-box.component.html',
  styleUrls: ['./edit-box.component.scss'],
})
export class EditBoxComponent implements OnInit, OnDestroy {

  public boxSettings: BoxSettings;
  public editBoxForm: FormGroup;
  private readonly deleteGoToMessage = 'Usuń właściwość';
  public readonly idsArray = [this.deleteGoToMessage, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];

  constructor(private activatedRoute: ActivatedRoute,
              private formService: FormsService,
              private boxesService: BoxesService) { }

  ngOnInit() {
    this.loadBoxSettings();
    this.initForm();
  }

  ngOnDestroy() { }

  private loadBoxSettings(): void {
    this.activatedRoute.data.subscribe((data: { boxData: BoxSettings }) => {
      console.log(data.boxData);
      this.boxSettings = data.boxData;
      this.initFormData();
    });
  }

  private initForm(): void {
    this.editBoxForm = this.formService.editBoxForm;
  }

  private initFormData(): void {
    if (this.editBoxForm) {
      this.editBoxForm.setValue({
        id: this.boxSettings.id,
        goTo: this.boxSettings.goTo,
        dead: this.boxSettings.dead,
      });
    }
  }

  private saveBoxOptions(): void {
    if (this.editBoxForm.get('goTo').value === this.deleteGoToMessage) {
      this.editBoxForm.get('goTo').setValue(null);
    }

    if (this.editBoxForm.valid) {
      this.boxesService.saveBoxSettings(this.editBoxForm.value);
    }
  }
}
