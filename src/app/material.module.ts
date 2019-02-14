import { NgModule } from '@angular/core';
import {
  MAT_TOOLTIP_DEFAULT_OPTIONS,
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatTooltipDefaultOptions,
  MatTooltipModule
} from '@angular/material';

const MAT_TOOLTIP_GLOBAL_CONFIG: MatTooltipDefaultOptions = {
  showDelay: 1000,
  hideDelay: 0,
  touchendHideDelay: 1000,
};

@NgModule({
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
  ],
  exports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule
  ],
  providers: [
    { provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: MAT_TOOLTIP_GLOBAL_CONFIG },
  ]
})
export class MaterialModule { }
