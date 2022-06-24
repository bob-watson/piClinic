import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
/*
 *  Data types used by all piClinic APIs
 *    (These might need to be refined, still)
 */
export type apiStatus = {
  httpResponse: number;
  httpReason: string;
}

export type apiError = {
  count: number;
  data: sessionData;
  status: apiStatus;
}

export type httpErrorHeaders = {
  normalizedNames: any,
  lazyUpdate: any,
  headers: any
}

/*
export type httpError = {
  headers: httpErrorHeaders,
  status: number,
  statusText: string,
  url: string,
  ok: boolean,
  name: string,
  message: string,
  error: any
}
*/

/*
 *  Data types used by the session resource
 */
export type sessionData = {
  token: string;
  sessionIP: string;
  sessionUA: string;
  username: string;
  loggedIn: number;
  accessGranted: string;
  sessionLanguage: string;
  sessionClinicPublicID: string;
  createdDate: string;
  expiresOnDate: string;
}

export type sessionInfo = {
  count: number;
  data: sessionData;
  status: apiStatus;
}

export type activeSessionData = {
  token: string;
  username: string;
  accessGranted: string;
  sessionLanguage: string;
  sessionClinicPublicID: string;
}

export type activeSessionInfo = {
  count: number;
  data: activeSessionData;
  status: apiStatus;
}

/*
 *    piClinic Session API wrapper
 */
@Injectable()
export class piClinicSession {

  private piClinicSessionUrl = 'https://dev.piclinic.org/api/session.php';

  constructor(
    private http: HttpClient
  ) { }

  // Create a new user session
  public openSession (
    sessionUser: string, // username
    sessionPass: string  // password
    ): Observable<any> {
    return this.http.post<sessionInfo>(
      this.piClinicSessionUrl,
      {
        "username": sessionUser,
        "password": sessionPass
      }
    );
  }

  // Get info about an open user session
  public getSession (
    token: string
    ) : Observable<any> {
    var getHeaders = {"X-piClinic-token": token};
    return this.http.get<activeSessionInfo>(
      this.piClinicSessionUrl,
      {"headers": getHeaders}
    );
  }

  // Change the UI language of an open session
  public updateSession (
    token: string,
    newLanguage: string
    ) : Observable<any> {
      var patchHeaders = {"X-piClinic-token": token};
      return this.http.patch<activeSessionInfo>(
        this.piClinicSessionUrl,
        {"sessionLanguage": newLanguage},
        {"headers": patchHeaders}
      );
  }

  // Log the user out and close the session
  public closeSession (
    token: string
    ) : Observable<any> {
    var getHeaders = {"X-piClinic-token": token};
    return this.http.delete<activeSessionInfo>(
      this.piClinicSessionUrl,
      {"headers": getHeaders}
    );
  }
}
