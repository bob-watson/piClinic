import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { piClinicSession, sessionInfo as currentSessionInfo, activeSessionInfo, activeSessionData } from '../api/session.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AppRoutingModule } from '../../app/app-routing.module';
import { NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-pi-clinic-login',
  templateUrl: './pi-clinic-login.component.html',
  styleUrls: ['./pi-clinic-login.component.css']
})
export class PiClinicLoginComponent implements OnInit {

  // local storage keys
  private piClinicSessionKey = "piClinicSession";

  // UI properties
  @Input() auth_user = "";
  @Input() auth_pass = "";

  @Output() currentSession: currentSessionInfo;
  @Output() activeSession: activeSessionInfo;
  @Output() serviceError: HttpErrorResponse;

  @Output() errorMessage: string;

  constructor(
    private session: piClinicSession,
    private router: Router
  )
  {
    this.currentSession = <currentSessionInfo>{};
    this.activeSession = <activeSessionInfo>{};
    this.serviceError = <HttpErrorResponse>{};
    this.errorMessage = "";
  }


  ngOnInit(): void {
  }

}
