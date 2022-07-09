import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
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
  private appSession: sessionData;

  constructor(
    private router: Router
  ) {
    this.appSession = <sessionData>{};
  }

  public getSession(): sessionData {
    return this.appSession;
  }

  public setSession(
    newSession: sessionData
  ) : void {
    this.appSession = newSession;
  }

  public getLanguageDisplayName (thisLang: string) : string {
    switch (thisLang) {
      case 'en': return 'English';
      case 'es': return 'Spanish';
      default: return 'Unknown';
    }
  }

  public getOtherLanguage( thisLang: string) : string {
    if (thisLang === 'en') {
      return 'es';
    } else {
      return 'en';
    }
  }

  public updateSessionLanguage(
    newLang: string
  ) : void {
    this.appSession.sessionLanguage = newLang;
  }

  public navigateToLoginPage(
  ) : void {
    this.router.navigate(['clinicLogin']);
  }

  // Return whether there's a current session
  public validSession(): boolean {
    if (this.appSession.hasOwnProperty('token')) {
        return true;
    } else {
      return false;
    }
  }
}
