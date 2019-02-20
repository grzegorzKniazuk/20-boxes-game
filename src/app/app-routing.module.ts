import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './core/components/homepage/homepage.component';
import { GamePanelComponent } from './core/components/game-panel/game-panel.component';
import { SettingsComponent } from './core/components/settings/settings.component';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { BoardComponent } from './shared/components/board/board.component';
import { EditBoxComponent } from './shared/components/box/edit-box/edit-box.component';
import { EditModeResolve } from './core/resolves/edit-mode.resolve';
import { BoxDataResolve } from './core/resolves/box-data.resolve';
import { BoxDependenciesResolve } from './core/resolves/box-dependencies.resolve';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomepageComponent,
  },
  {
    path: 'game-panel',
    component: GamePanelComponent,
    resolve: {
      data: EditModeResolve,
    },
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'settings',
    component: SettingsComponent,
    children: [
      {
        path: 'board',
        component: BoardComponent,
        outlet: 'board',
        resolve: {
          enableEditMode: EditModeResolve
        },
        runGuardsAndResolvers: 'always',
      },
      {
        path: 'edit',
        component: EditBoxComponent,
        outlet: 'edit',
      },
      {
        path: 'edit/:id',
        component: EditBoxComponent,
        outlet: 'edit',
        resolve: {
          boxData: BoxDataResolve,
          boxDependencies: BoxDependenciesResolve,
        },
        runGuardsAndResolvers: 'always',
      },
    ],
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      enableTracing: false,
      preloadingStrategy: PreloadAllModules,
      onSameUrlNavigation: 'reload',
    }),
  ],
  exports: [
    RouterModule,
  ],
})
export class AppRoutingModule {
}
