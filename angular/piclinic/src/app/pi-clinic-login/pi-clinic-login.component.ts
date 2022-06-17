import { Component, Input, OnInit, Output } from '@angular/core';
import { piClinicSession, sessionInfo, activeSessionInfo} from '../api/session.service';
import { Observable } from 'rxjs';

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

  constructor(
    private session: piClinicSession
    ) {
      this.currentSession = <sessionInfo>{};
      this.activeSession = <activeSessionInfo>{};
    }

  showLogin() {
    this.session.openSession (this.auth_user, this.auth_pass).
      subscribe(data => this.currentSession = data);
  }

  showSessionInfo() {
    this.session.getSession (this.currentSession.data.token).
      subscribe(data => this.activeSession = data);
  }

  ngOnInit(): void {
  }

}
