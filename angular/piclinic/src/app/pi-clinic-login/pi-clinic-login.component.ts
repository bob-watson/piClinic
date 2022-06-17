import { Component, Input, OnInit, Output } from '@angular/core';
import { piClinicSession, sessionInfo, activeSessionInfo, apiError, httpError} from '../api/session.service';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-pi-clinic-login',
  templateUrl: './pi-clinic-login.component.html',
  styleUrls: ['./pi-clinic-login.component.css']
})
export class PiClinicLoginComponent implements OnInit {

  @Input() auth_user = "";
  @Input() auth_pass = "";

  @Output() currentSession: sessionInfo;
  @Output() activeSession: activeSessionInfo;
  @Output() serviceError: httpError;

  constructor(
    private session: piClinicSession
    ) {
      this.currentSession = <sessionInfo>{};
      this.activeSession = <activeSessionInfo>{};
      this.serviceError = <httpError>{};
    }

  loginSession(): void {
    var httpObserver = {
      next: (data: sessionInfo) => this.currentSession = data,
      error: (err: httpError) => this.serviceError = err,
      complete: () => console.log ("showLogin call completed.")
    };

    this.session.openSession (this.auth_user, this.auth_pass).
      subscribe(data => this.currentSession = data);
  }

  showSessionInfo(): void {
    var httpObserver = {
      next: (data: activeSessionInfo) => this.activeSession = data,
      error: (err: httpError) => this.serviceError = err,
      complete: () => console.log ("showSessionInfo call completed.")
    };

    this.session.getSession (this.currentSession.data.token).
      subscribe(httpObserver);
  }

  changeSessionLanguage(): void {
    var newLanguage = 'en';
    if (this.activeSession.data.sessionLanguage == 'en') {
      newLanguage = 'es';
    } else {
      newLanguage = 'en';
    }

    var httpObserver = {
      next: (data: activeSessionInfo) => this.activeSession = data,
      error: (err: httpError) => this.serviceError = err,
      complete: () => console.log ("changeSessionLanguage call completed.")
    };

    this.session.updateSession (
      this.currentSession.data.token,
      newLanguage).
      subscribe(httpObserver);
  }

  logoutSession(): void {
    var httpObserver = {
      next: (data: activeSessionInfo) => this.activeSession = data,
      error: (err: httpError) => this.serviceError = err,
      complete: () => console.log ("logoutSession call completed.")
    };

    this.session.closeSession (this.currentSession.data.token).
      subscribe(httpObserver);
  }

  ngOnInit(): void {
  }

}
