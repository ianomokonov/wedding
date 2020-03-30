import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { EnterComponent } from './enter/enter.component';

export const adminRoutes: Routes = [
  { path: 'admin', component: AdminComponent },
  { path: 'enter', component: EnterComponent }
];

@NgModule({
  imports: [],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
export const adminComponents = [AdminComponent, EnterComponent];
