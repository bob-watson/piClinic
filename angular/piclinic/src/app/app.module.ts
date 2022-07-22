import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { StorageService } from './storage.service';
import { PiClinicHeaderComponent } from './pi-clinic-header/pi-clinic-header.component';
import { PiClinicSessionMenuComponent } from './pi-clinic-session-menu/pi-clinic-session-menu.component';
import { PiClinicLoginComponent } from './pi-clinic-login/pi-clinic-login.component';
import { piClinicSession, sessionData } from './api/session.service';
import { AppRoutingModule } from './app-routing.module';
import { PiClinicDashComponent } from './pi-clinic-dash/pi-clinic-dash.component';
import { PiClinicErrorMessageComponent } from './pi-clinic-error-message/pi-clinic-error-message.component';
import { PiClinicAppMenuComponent } from './pi-clinic-app-menu/pi-clinic-app-menu.component';
import { Router } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    PiClinicHeaderComponent,
    PiClinicSessionMenuComponent,
    PiClinicLoginComponent,
    PiClinicDashComponent,
    PiClinicErrorMessageComponent,
    PiClinicAppMenuComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    piClinicSession
  ],
  bootstrap: [AppComponent]
})


export class AppModule {

  constructor(
    private router: Router,
  ) {}

  public navigateToLoginPage(
  ) : void {
    this.router.navigate(['clinicLogin']);
  }
}
