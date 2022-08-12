import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { piClinicSession, sessionInfo as currentSessionInfo, activeSessionInfo, activeSessionData } from '../api/session.service';
import { PiClinicErrorMessageComponent } from '../pi-clinic-error-message/pi-clinic-error-message.component';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { LocalStoreService } from 'app/local-storage.service';
import { AppRoutingModule } from '../../app/app-routing.module';
import { NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-pi-clinic-login',
  templateUrl: './pi-clinic-login.component.html',
  styleUrls: ['./pi-clinic-login.component.css']
})
export class PiClinicLoginComponent implements OnInit {

  // UI properties
  @Input() auth_user = "";
  @Input() auth_pass = "";

  @Output() currentSession: currentSessionInfo;
  @Output() activeSession: activeSessionData;
  @Output() serviceError: HttpErrorResponse;

  @Output() errorMessage: string;

  constructor(
    private session: piClinicSession,
    private router: Router,
    private localStore: LocalStoreService,
    )
    {
      this.currentSession = <currentSessionInfo>{};
      this.activeSession = <activeSessionData>{};
      this.serviceError = <HttpErrorResponse>{};
      this.errorMessage = "";
      this.clearOpenSessions();
    }

  clearOpenSessions(): void {
    let tempActiveSession = <activeSessionData>{};
    tempActiveSession = this.getLocalSessionInfo();
  }

  // Get current session data
  getLocalSessionInfo(): activeSessionData {
    return JSON.parse(this.localStore.getData('piClinicSession'));
  }


  loginUserSuccess(data: currentSessionInfo): void {
    this.currentSession = data;
    let activeSession = <activeSessionData>{};

    activeSession.accessGranted = this.currentSession.data.accessGranted;
    activeSession.sessionClinicPublicID = this.currentSession.data.sessionClinicPublicID;
    activeSession.sessionLanguage = this.currentSession.data.sessionLanguage;
    activeSession.token = this.currentSession.data.token;
    activeSession.username = this.currentSession.data.username;

    this.localStore.saveData('piClinicSession', JSON.stringify(activeSession));

    this.router.navigate(['clinicDash']);
  }

  loginUserError(err: HttpErrorResponse): void {
    this.serviceError = err;
    // look up error message returned
    if (!err.hasOwnProperty('error')) return;
    if (!err.error.hasOwnProperty('status')) return;
    if (err.error.status.hasOwnProperty('httpReason')) {
      this.errorMessage = err.error.status.httpReason;
    }
    return;
  }

  // Login user and create a new piClinic session
  loginUser(): void {
    let httpObserver = {
      next: (data: currentSessionInfo) => this.loginUserSuccess(data),
      error: (err: HttpErrorResponse) => this.loginUserError(err),
      complete: () => console.log ("showLogin call completed.")
    };

    this.session.openSession (this.auth_user, this.auth_pass).
      subscribe(httpObserver);
  }

  // Get current session data
  showSessionInfo(): void {
    let httpObserver = {
      next: (data: activeSessionInfo) => this.activeSession = data.data,
      error: (err: HttpErrorResponse) => this.serviceError = err,
      complete: () => console.log ("showSessionInfo call completed.")
    };

    this.session.getSession (this.currentSession.data.token).
      subscribe(httpObserver);
  }

  // Change the session UI language
  changeSessionLanguage(): void {
    let newLanguage = 'en';
    let currentLang = '';

    // find the current session language
    if (Object.keys(this.activeSession).length === 0) {
      console.log("ChangeLanguage: No active session");
      if (Object.keys(this.currentSession).length !== 0) {
        console.log("ChangeLanguage: Use current session");
        currentLang = this.currentSession.data.sessionLanguage;
      } else {
        console.log("ChangeLanguage: no session to change");
        // there's no session to update so leave with no further action
        return;
      }
    } else {
      console.log("ChangeLanguage: Use active session");
      currentLang = this.activeSession.sessionLanguage;
    }

    // Switch to the other language (there's only two)
    if (currentLang == 'en') {
      console.log("ChangeLanguage: selecting en -> es");
      newLanguage = 'es';
    } else {
      console.log("ChangeLanguage: selecting es -> en");
      newLanguage = 'en';
    }

    // prepare the Observer
    let httpObserver = {
      next: (data: activeSessionInfo) => this.activeSession = data.data,
      error: (err: HttpErrorResponse) => this.serviceError = err,
      complete: () => console.log ("changeSessionLanguage call completed.")
    };

    // call the piClinic API to update
    this.session.updateSession (
      this.currentSession.data.token,
      newLanguage).
      subscribe(httpObserver);
  }

  // Reset the session data to show the closed session
  logoutSuccess(activeSession: activeSessionInfo) {
    this.activeSession = <activeSessionData>{};
    this.localStore.removeData('piClinicSession');
    this.router.navigate(['clinicLogin']);
  }

  // Log out the current user and delete their session
  logoutUser(): void {
    let token = this.activeSession.token;
    let httpObserver = {
      next: (data: activeSessionInfo) => {this.logoutSuccess(data)},
      error: (err: HttpErrorResponse) => this.serviceError = err,
      complete: () => console.log ("logoutSession call completed.")
    };

    this.session.closeSession (token).
      subscribe(httpObserver);
  }

  // test to return whether there's a current session
  validSession(): boolean {
    if (this.currentSession.hasOwnProperty('data')) {
        if (this.currentSession.data.hasOwnProperty('token')) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
  }

  errorDataPresent(): boolean {
    if (this.serviceError.hasOwnProperty('status')) {
      return true;
    } else {
      return false;
    }
  }

  clearLastError(): void {
    this.serviceError = <HttpErrorResponse>{};
  }

  ngOnInit(): void {
  }

}
