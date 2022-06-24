import { Component, Input, OnInit, Output } from '@angular/core';
import { piClinicSession, sessionInfo as currentSessionInfo, activeSessionInfo } from '../api/session.service';
import { HttpErrorResponse } from '@angular/common/http';

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
  @Output() activeSession: activeSessionInfo;
  @Output() serviceError: HttpErrorResponse;

  constructor(
    private session: piClinicSession
    )
    {
      this.currentSession = <currentSessionInfo>{};
      this.activeSession = <activeSessionInfo>{};
      this.serviceError = <HttpErrorResponse>{};
    }

    // Login user and create a new piClinic session
  loginUser(): void {
    var httpObserver = {
      next: (data: currentSessionInfo) => this.currentSession = data,
      error: (err: HttpErrorResponse) => this.serviceError = err,
      complete: () => console.log ("showLogin call completed.")
    };

    this.session.openSession (this.auth_user, this.auth_pass).
      subscribe(httpObserver);
  }

  // Get current session data
  showSessionInfo(): void {
    var httpObserver = {
      next: (data: activeSessionInfo) => this.activeSession = data,
      error: (err: HttpErrorResponse) => this.serviceError = err,
      complete: () => console.log ("showSessionInfo call completed.")
    };

    this.session.getSession (this.currentSession.data.token).
      subscribe(httpObserver);
  }

  // Change the session UI language
  changeSessionLanguage(): void {
    var newLanguage = 'en';
    var currentLang = '';

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
      currentLang = this.activeSession.data.sessionLanguage;
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
    var httpObserver = {
      next: (data: activeSessionInfo) => this.activeSession = data,
      error: (err: HttpErrorResponse) => this.serviceError = err,
      complete: () => console.log ("changeSessionLanguage call completed.")
    };

    // call the piClinic API to update
    this.session.updateSession (
      this.currentSession.data.token,
      newLanguage).
      subscribe(httpObserver);
  }

  // Log out the current user and delete their session
  logoutUser(): void {
    var httpObserver = {
      next: (data: activeSessionInfo) => {this.activeSession = data; this.currentSession = <currentSessionInfo>{}; },
      error: (err: HttpErrorResponse) => this.serviceError = err,
      complete: () => console.log ("logoutSession call completed.")
    };

    this.session.closeSession (this.currentSession.data.token).
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

  clearError(): void {
    this.serviceError = <HttpErrorResponse>{};
  }

  ngOnInit(): void {
  }

}
