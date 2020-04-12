import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { EnterComponent } from './enter/enter.component';
import { AdminGuard } from '../guards/admin.guard';
import { GuestsListComponent } from './guests-list/guests-list.component';
import { ResultsComponent } from './results/results.component';

export const adminRoutes: Routes = [
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard], children: [
    { path: '', redirectTo: 'guest-list', pathMatch: 'full' },
      { path: 'guest-list', component: GuestsListComponent },
      { path: 'results', component: ResultsComponent }
  ] },
  { path: 'enter', component: EnterComponent }
];

@NgModule({
  imports: [],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
export const adminComponents = [AdminComponent, EnterComponent];
