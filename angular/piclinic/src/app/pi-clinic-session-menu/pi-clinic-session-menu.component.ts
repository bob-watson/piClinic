import { Component, Input, OnInit, Output } from '@angular/core';
import { piClinicSession, activeSessionInfo } from '../api/session.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pi-clinic-session-menu',
  templateUrl: './pi-clinic-session-menu.component.html',
  styleUrls: ['./pi-clinic-session-menu.component.css']
})
export class PiClinicSessionMenuComponent implements OnInit {

  @Output() username = 'noUser';
  @Output() itemSeparator = '&nbsp;&nbsp;|&nbsp;&nbsp;';
  @Output() userEditPrompt = 'User settings';
  @Output() logoutLink = 'Logout';
  @Input()  showComponent = true;

  @Output() activeSession: activeSessionInfo;
  @Output() serviceError: HttpErrorResponse;

  @Output() errorMessage: string;

  constructor(
    private session: piClinicSession,
    private router: Router,
    )
    {
      this.activeSession = <activeSessionInfo>{};
      this.showSessionInfo();   //initialize activeSession
      this.serviceError = <HttpErrorResponse>{};
      this.errorMessage = "";
    }


  // Get current session data
  showSessionInfo(): void {
    var httpObserver = {
      next: (data: activeSessionInfo) => this.activeSession = data,
      error: (err: HttpErrorResponse) => this.serviceError = err,
      complete: () => console.log ("showSessionInfo call completed.")
    };

    this.session.getSession (this.activeSession.data.token).
      subscribe(httpObserver);
  }

  // Change the session UI language
  changeSessionLanguage(): void {
    var newLanguage = 'en';
    var currentLang = '';

    // find the current session language
    if (Object.keys(this.activeSession).length === 0) {
      console.log("ChangeLanguage: No active session");
      if (Object.keys(this.activeSession).length !== 0) {
        console.log("ChangeLanguage: Use current session");
        currentLang = this.activeSession.data.sessionLanguage;
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
      this.activeSession.data.token,
      newLanguage).
      subscribe(httpObserver);
  }

  // Reset the session data to show the closed session
  logoutSuccess(activeSession: activeSessionInfo) {
    this.activeSession = activeSession;
    this.router.navigate(['clinicLogin']);
  }

  // Log out the current user and delete their session
  logoutUser(): void {
    var httpObserver = {
      next: (data: activeSessionInfo) => {},
      error: (err: HttpErrorResponse) => this.serviceError = err,
      complete: () => console.log ("logoutSession call completed.")
    };

    this.session.closeSession (this.activeSession.data.token).
      subscribe(httpObserver);
  }

  // test to return whether there's a current session
  validSession(): boolean {
    if (this.activeSession.hasOwnProperty('data')) {
        if (this.activeSession.data.hasOwnProperty('token')) {
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
