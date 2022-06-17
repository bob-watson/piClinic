import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class SessionService {

  private piClinicSessionUrl = 'https://dev.piclinic.org/api/session.php';

  constructor(
    private http: HttpClient
  ) { }

  public openSession(
      sessionUser: string,
      sessionPass: string
      ): Observable<any> {
    var sessionInfo = {};
    return this.http.post<any>(
      this.piClinicSessionUrl,
      {"username": sessionUser, "password": sessionPass }
    );
  }

  public getSession (token: string) {

  }
  public updateSession (token: string, language: string) {

  }
  public closeSession (token: string) {

  }

}
