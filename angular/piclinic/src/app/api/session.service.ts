import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class SessionService {

  private piClinicSessionUrl = 'https://dev.piclinic.org/api/session.php';
  private sessionInfo = {};

  constructor(
    private http: HttpClient
  ) { }

  public openSession(sessionUser: string, sessionPass: string) {
    this.http.post<any>(
      this.piClinicSessionUrl,
      {"username": sessionUser, "password": sessionPass }
    ).subscribe(data =>
      {this.sessionInfo = data;});

    return this.sessionInfo;
  }

  public getSession (token: string) {

  }
  public updateSession (token: string, language: string) {

  }
  public closeSession (token: string) {

  }

}
