import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { adminRoutes } from './admin/admin-routing.module';
import { GuestComponent } from './guest/guest.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


const routes: Routes = [
  ...adminRoutes,
  { path: 'guest/:token', component: GuestComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
