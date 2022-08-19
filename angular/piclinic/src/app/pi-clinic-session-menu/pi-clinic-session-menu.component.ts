import { Component, Input, OnInit, Output } from '@angular/core';
import { piClinicSession, activeSessionInfo, activeSessionData } from '../api/session.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { LocalStoreService } from 'app/local-storage.service';
import { throwError } from 'rxjs';

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

  public activeSession = <activeSessionData>{};
  public serviceError = <HttpErrorResponse>{};
  public errorMessage = "";

  private remainingAttempts = 0;

  constructor(
    private session: piClinicSession,
    private router: Router,
    private localStore: LocalStoreService,
  )
  {
    this.getLocalSessionData();   //initialize activeSession
    this.loadComponentProperties();
  }

  // Get current session data
  getLocalSessionData(): void {
    this.getActiveSessionFromStorage(10);
  }

  // load properties used by this component
  loadComponentProperties(): void {
    if (this.activeSession != null) {
      if (this.activeSession.hasOwnProperty('username')) {
        this.username = this.activeSession.username;
      }
    }
  }

  // Change the session UI language
  changeSessionLanguage(): void {
    let newLanguage = 'en';
    let currentLang = '';

    // find the current session language
    if (Object.keys(this.activeSession).length === 0) {
      console.log("ChangeLanguage: No active session");
      if (Object.keys(this.activeSession).length !== 0) {
        console.log("ChangeLanguage: Use current session");
        currentLang = this.activeSession.sessionLanguage;
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
      this.activeSession.token,
      newLanguage).
      subscribe(httpObserver);
  }

  // Reset the session data to show the closed session
  logoutSuccess(activeSession: activeSessionData) : void {
    this.activeSession = <activeSessionData>{};
    this.localStore.removeData('piClinicSession');
    this.router.navigate(['clinicLogin']);
  }

  logoutError(err: HttpErrorResponse) : void {
    console.log('session-menu: logout error');
    this.activeSession = <activeSessionData>{};
    this.localStore.removeData('piClinicSession');
    this.router.navigate(['clinicLogin']);
  }

  // Log out the current user and delete their session
  logoutUser(): void {
    if (this.activeSession !== null) {
      let token = this.activeSession.token;
      let httpObserver = {
        next: (data: activeSessionInfo) => {this.logoutSuccess(data.data)},
        error: (err: HttpErrorResponse) => this.serviceError = err,
        complete: () => console.log ("logoutSession call completed.")
      };
      this.session.closeSession (token).
      subscribe(httpObserver);
    }
  }

  // logout any existing sessions and clear the local storage variable
  clearOpenSessions(): void {
    this.logoutUser();
    let tempActiveSession = this.getLocalSessionData();
    console.log ('pi-clinic-session-menu: clearOpenSessions, activeSession = \n' + JSON.stringify(tempActiveSession));
  }

  private getActiveSessionFromStorageFunction(): void{
    if (this.remainingAttempts > 0) {
      let localActiveSession = JSON.parse(this.localStore.getData('piClinicSession'));
      if (localActiveSession == null) {
        this.remainingAttempts -= 1;
        console.log ('retrieving active session...('+this.remainingAttempts.toString() + ')');
        setTimeout(this.getActiveSessionFromStorageFunction, 100)
      } else {
        this.activeSession = localActiveSession;
        this.remainingAttempts = 0;
        console.log ('retrieving active session...retrieved!');
      }
    }
  }

  getActiveSessionFromStorage(tries: number) {
    this.remainingAttempts = tries;
    this.getActiveSessionFromStorageFunction();
  }

  // test to return whether there's a current session
  validSession(): boolean {
    console.log('validSession: \n'+JSON.stringify(this.activeSession))
    if (this.activeSession !== null) {
      if (this.activeSession.hasOwnProperty('token')) {
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
