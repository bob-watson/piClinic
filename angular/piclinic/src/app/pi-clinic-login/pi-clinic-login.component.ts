import { Component, Input, OnInit, Output } from '@angular/core';
import { SessionService } from '../api/session.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pi-clinic-login',
  templateUrl: './pi-clinic-login.component.html',
  styleUrls: ['./pi-clinic-login.component.css']
})
export class PiClinicLoginComponent implements OnInit {

  @Input() auth_user = "";
  @Input() auth_pass = "";

  @Output() sessionInfo = {};

  constructor(
    private session: SessionService
    ) { }

  showLogin() {
    this.session.openSession (this.auth_user, this.auth_pass).
      subscribe(data => this.sessionInfo = data);
  }

  ngOnInit(): void {
  }

}
