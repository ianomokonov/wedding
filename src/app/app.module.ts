import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//Формы
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

//HTTP запросы
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';

import { ApiService } from './services/api.service'
import { GuestComponent } from './guest/guest.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AdminComponent } from './admin/admin.component';
import { EnterComponent } from './admin/enter/enter.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AuthService } from './services/auth.service';
import { RouterModule } from '@angular/router';
import { AdminGuard } from './guards/admin.guard';
import { GuestsListComponent } from './admin/guests-list/guests-list.component';
import { AddGuestComponent } from './admin/guests-list/add-guest/add-guest.component';
import { ApprovedModalComponent } from './guest/approved-modal/approved-modal.component';
import { GuestFormComponent } from './guest/guest-form/guest-form.component';
import { GratitudeModalComponent } from './guest/gratitude-modal/gratitude-modal.component';
import { ResultsComponent } from './admin/results/results.component';


@NgModule({
  declarations: [
    AppComponent,
    GuestComponent,
    PageNotFoundComponent,
    AdminComponent,
    EnterComponent,
    GuestsListComponent,
    AddGuestComponent,
    ApprovedModalComponent,
    GuestFormComponent,
    GratitudeModalComponent,
    ResultsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    FormBuilder,
    HttpClient,
    ApiService,
    AuthService,
    AdminGuard
  ],
  entryComponents: [ApprovedModalComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
