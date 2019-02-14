import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './components/homepage/homepage.component';
import { MaterialModule } from '../material.module';
import { BoardComponent } from './components/board/board.component';
import { RouterModule } from '@angular/router';
import { SettingsComponent } from './components/settings/settings.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    HomepageComponent,
    BoardComponent,
    SettingsComponent,
    NotFoundComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    SharedModule
  ]
})
export class CoreModule { }
