import { NgModule } from '@angular/core';
import {
  MAT_DIALOG_DEFAULT_OPTIONS, MAT_SNACK_BAR_DEFAULT_OPTIONS,
  MAT_TOOLTIP_DEFAULT_OPTIONS,
  MatButtonModule, MatDialogConfig, MatDialogModule,
  MatIconModule,
   MatSelectModule, MatSlideToggleModule, MatSnackBarConfig, MatSnackBarModule,
  MatTooltipDefaultOptions,
  MatTooltipModule,
} from '@angular/material';

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
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatSelectModule,
  ],
  exports: [
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatSelectModule,
  ],
  providers: [
    { provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: MAT_TOOLTIP_GLOBAL_CONFIG },
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: MAT_DIALOG_GLOBAL_CONFIG },
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: MAT_SNACKBAR_GLOBAL_CONFIG },
  ]
})
export class MaterialModule { }
