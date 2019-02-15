import { NgModule } from '@angular/core';
import {
  MAT_DIALOG_DEFAULT_OPTIONS, MAT_FORM_FIELD_DEFAULT_OPTIONS, MAT_SNACK_BAR_DEFAULT_OPTIONS,
  MAT_TOOLTIP_DEFAULT_OPTIONS,
  MatButtonModule, MatDialogConfig, MatDialogModule, MatFormFieldDefaultOptions,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule, MatSnackBarConfig, MatSnackBarModule,
  MatTooltipDefaultOptions,
  MatTooltipModule,
} from '@angular/material';

const MAT_FORM_FIELD_GLOBAL_CONFIG: MatFormFieldDefaultOptions = {
  appearance: 'outline',
};

const MAT_TOOLTIP_GLOBAL_CONFIG: MatTooltipDefaultOptions = {
  showDelay: 1000,
  hideDelay: 0,
  touchendHideDelay: 1000,
};

const MAT_DIALOG_GLOBAL_CONFIG: MatDialogConfig = {
  width: '420px',
  disableClose: true,
  hasBackdrop: true,
  autoFocus: true,
  restoreFocus: true,
};

const MAT_SNACKBAR_GLOBAL_CONFIG: MatSnackBarConfig = {
  duration: 2500,
  verticalPosition: 'bottom',
  horizontalPosition: 'center',
};

@NgModule({
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    MatSnackBarModule,
  ],
  exports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    MatSnackBarModule,
  ],
  providers: [
    { provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: MAT_TOOLTIP_GLOBAL_CONFIG },
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: MAT_DIALOG_GLOBAL_CONFIG },
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: MAT_SNACKBAR_GLOBAL_CONFIG },
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: MAT_FORM_FIELD_GLOBAL_CONFIG },
  ]
})
export class MaterialModule { }
