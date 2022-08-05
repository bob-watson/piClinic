import { Injectable, EventEmitter, Input, OnInit, Output, Inject } from '@angular/core';
import { piClinicSession, sessionInfo as currentSessionInfo, activeSessionInfo, activeSessionData } from './api/session.service';
import { HttpErrorResponse } from '@angular/common/http';
import { LocalStoreService } from 'app/local-store.service';

@Injectable({
  providedIn: 'root'
})
export class SessionManagerService {

  // local storage keys
  private piClinicSessionKey = "piClinicSession";

  private privateCurrentSession: currentSessionInfo;
  private privateActiveSession: activeSessionInfo;
  private serviceError: HttpErrorResponse;
  private errorMessage = "";

  @Output() currentSession = new EventEmitter<currentSessionInfo>;
  @Output() activeSession = new EventEmitter<activeSessionInfo>;

  constructor(
    private session: piClinicSession,
    private localStore: LocalStoreService
  ) {
    this.privateCurrentSession = <currentSessionInfo>{};
    this.currentSession.emit(this.privateCurrentSession);

    this.privateActiveSession = <activeSessionInfo>{};
    this.activeSession.emit(this.privateActiveSession);

    this.serviceError = <HttpErrorResponse>{};

    // initialize the active session info
    this.getActiveSessionFromStore();
  }

  getCurrentSession(): currentSessionInfo {
    return this.privateCurrentSession;
  }

  getActiveSession(): activeSessionInfo {
    return this.privateActiveSession;
  }

  getActiveSessionFromStore () {
    // returns a valid session token from the local store
    //  or an empty string if the local store has no valid token
    let localSessionToken = this.localStore.getData(this.piClinicSessionKey);

    if (localSessionToken !== null) {
      var httpObserver = {
        next: (data: activeSessionInfo) => { this.privateActiveSession = data; this.activeSession.emit(this.privateActiveSession); },
        error: (err: HttpErrorResponse) => this.serviceError = err,
        complete: () => console.log ("getSessionInfo call completed.")
      };

      this.session.getSession (localSessionToken).
        subscribe(httpObserver);
    } else {
      this.resetSessionData(<activeSessionInfo>{});
    }
  }

  loginSuccess(data: currentSessionInfo): void {
    // save session token and and update active session info
    this.privateCurrentSession = data;
    this.currentSession.emit(this.privateCurrentSession);

    this.localStore.saveData(this.piClinicSessionKey, this.privateCurrentSession.data.token);

    // get active session info
    this.getActiveSessionFromStore ();

    // this.router.navigate(['clinicDash']);
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
  loginUser(auth_user: string, auth_pass: string): void {
    var httpObserver = {
      next: (data: currentSessionInfo) => this.loginSuccess(data),
      error: (err: HttpErrorResponse) => this.loginUserError(err),
      complete: () => console.log ("showLogin call completed.")
    };

    this.session.openSession ( auth_user, auth_pass ).
      subscribe(httpObserver);
  }

  // Get current session data
  showSessionInfo(): void {
    var httpObserver = {
      next: (data: activeSessionInfo) => { this.privateActiveSession = data; this.activeSession.emit(this.privateActiveSession);},
      error: (err: HttpErrorResponse) => this.serviceError = err,
      complete: () => console.log ("showSessionInfo call completed.")
    };

    this.session.getSession (this.privateActiveSession.data.token).
      subscribe(httpObserver);
  }

  // Change the session UI language
  changeSessionLanguage(): void {
    var newLanguage = 'en';
    var currentLang = '';

    // find the current session language
    if (Object.keys(this.privateActiveSession).length === 0) {
      console.log("ChangeLanguage: No active session");
      if (Object.keys(this.privateActiveSession).length !== 0) {
        console.log("ChangeLanguage: Use current session");
        currentLang = this.privateActiveSession.data.sessionLanguage;
      } else {
        console.log("ChangeLanguage: no session to change");
        // there's no session to update so leave with no further action
        return;
      }
    } else {
      console.log("ChangeLanguage: Use active session");
      currentLang = this.privateActiveSession.data.sessionLanguage;
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
      next: (data: activeSessionInfo) => { this.privateActiveSession = data; this.activeSession.emit(this.privateActiveSession);},
      error: (err: HttpErrorResponse) => this.serviceError = err,
      complete: () => console.log ("changeSessionLanguage call completed.")
    };

    // call the piClinic API to update
    this.session.updateSession (
      this.privateActiveSession.data.token,
      newLanguage).
      subscribe(httpObserver);
  }

  resetSessionData(data: activeSessionInfo) {
    // clean up session info after session has been closed.
    this.privateActiveSession = data;
    this.privateCurrentSession = <currentSessionInfo>{};

    this.currentSession.emit(this.privateCurrentSession);
    this.localStore.removeData(this.piClinicSessionKey);
  }

  // Log out the current user and delete their session
  logoutUser(): void {
    var httpObserver = {
      next: (data: activeSessionInfo) => this.resetSessionData(data),
      error: (err: HttpErrorResponse) => this.serviceError = err,
      complete: () => console.log ("logoutSession call completed.")
    };

    this.session.closeSession (this.privateActiveSession.data.token).
      subscribe(httpObserver);
  }

  // test to return whether there's a current session
  validSession(): boolean {
    if (this.privateActiveSession.hasOwnProperty('data')) {
        if (this.privateActiveSession.data.hasOwnProperty('token')) {
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

}
