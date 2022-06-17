import { Component, Input, OnInit, Output } from '@angular/core';
import { piClinicSession, sessionInfo } from '../api/session.service';
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

  constructor(
    private session: piClinicSession
    ) {
      this.currentSession = <sessionInfo>{};
    }

  showLogin() {
    this.session.openSession (this.auth_user, this.auth_pass).
      subscribe(data => this.currentSession = data);
  }

  ngOnInit(): void {
  }

}
