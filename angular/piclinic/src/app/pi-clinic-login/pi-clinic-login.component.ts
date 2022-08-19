import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { piClinicSession, sessionInfo as currentSessionInfo, activeSessionInfo, activeSessionData } from '../api/session.service';
import { PiClinicErrorMessageComponent } from '../pi-clinic-error-message/pi-clinic-error-message.component';
import { PiClinicSessionMenuComponent } from 'app/pi-clinic-session-menu/pi-clinic-session-menu.component';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { LocalStoreService } from 'app/local-storage.service';
import { AppRoutingModule } from '../../app/app-routing.module';
import { NavigationEnd } from '@angular/router';
import { timeInterval } from 'rxjs';

@Component({
  selector: 'app-pi-clinic-login',
  templateUrl: './pi-clinic-login.component.html',
  styleUrls: ['./pi-clinic-login.component.css']
})
export class PiClinicLoginComponent implements OnInit {

  // UI properties
  @Input() auth_user = "";
  @Input() auth_pass = "";

  public currentSession = <currentSessionInfo>{};
  public activeSession = <activeSessionData>{};
  public serviceError = <HttpErrorResponse>{};
  public errorMessage = "";

  constructor(
    private session: piClinicSession,
    private router: Router,
    private localStore: LocalStoreService,
    public sessionMenu: PiClinicSessionMenuComponent,
    )
    {
      // always close any open sessions when loading the log in page
      this.sessionMenu.clearOpenSessions();
    }

  continueToDash(): void {
    this.router.navigate(['clinicDash']);
  }

  loginUserSuccess(data: currentSessionInfo): void {
    this.currentSession = data;
    let tempActiveSession = <activeSessionData>{};

    tempActiveSession.accessGranted = data.data.accessGranted;
    tempActiveSession.sessionClinicPublicID = data.data.sessionClinicPublicID;
    tempActiveSession.sessionLanguage = data.data.sessionLanguage;
    tempActiveSession.token = data.data.token;
    tempActiveSession.username = data.data.username;

    this.localStore.saveData('piClinicSession', JSON.stringify(tempActiveSession));

    this.sessionMenu.getActiveSessionFromStorage(10);
    this.activeSession = this.sessionMenu.activeSession;
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
    this.clearLastError(); // to reset any errors from an earlier call
    let httpObserver = {
      next: (data: currentSessionInfo) => this.loginUserSuccess(data),
      error: (err: HttpErrorResponse) => this.loginUserError(err),
      complete: () => console.log ("showLogin call completed.")
    };

    this.session.openSession (this.auth_user, this.auth_pass).
      subscribe(httpObserver);
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
