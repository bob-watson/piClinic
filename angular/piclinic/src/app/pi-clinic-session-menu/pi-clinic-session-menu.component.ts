import { Component, OnInit, Output } from '@angular/core';
import { piClinicSession, sessionData, sessionResponse, activeSessionResponse } from '../api/session.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AppModule } from 'app/app.module';
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

  constructor(
    public app: AppModule,
    private router: Router,
    private session: piClinicSession
  ) { }

  editUser(){
    alert('Edit user profile for:\n' + this.app.getSession().username);
  }

  logoutSuccess(
    closedSession: activeSessionResponse
  ) : void {
    this.app.setSession (<sessionData>{});
    this.router.navigate (['clinicLogin']);
  }

  // Log out the current user and delete their session
  logoutUser(): void {
    var httpObserver = {
      next: (data: activeSessionResponse) => this.logoutSuccess(data),
      error: (err: HttpErrorResponse) => console.log(JSON.stringify(err)),
      complete: () => console.log ("logoutSession call completed.")
    };

    this.session.closeSession (this.app.getSession().token).
      subscribe(httpObserver);
  }

  ngOnInit(): void {
  }

}
