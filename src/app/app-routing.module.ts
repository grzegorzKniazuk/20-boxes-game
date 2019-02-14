import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './core/components/homepage/homepage.component';
import { BoardComponent } from './core/components/board/board.component';
import { SettingsComponent } from './core/components/settings/settings.component';
import { NotFoundComponent } from './core/components/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomepageComponent },
  { path: 'board', component: BoardComponent },
  { path: 'settings', component: SettingsComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
