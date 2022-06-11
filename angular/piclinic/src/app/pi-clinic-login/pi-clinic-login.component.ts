import { Component, Input, OnInit, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    private http: HttpClient
    ) { }

  showLogin() {
    var  message_text: String;
    message_text = "user: " + this.auth_user + "\n";
    message_text += "pass: " + this.auth_pass + "\n";
    // alert(message_text);
    this.createNewSession();
    // alert(JSON.stringify(this.sessionInfo, null, 2))
  }

  createNewSession() {
    class post_body {
      username: String;
      password: String;

      constructor(user: String, pass: String) {
        this.username = user;
        this.password = pass;
      }
    };
    var url = 'https://dev.piclinic.org/api/session.php';
    var body = new post_body(this.auth_user, this.auth_pass);

    this.http.post<any>(url, {"username": this.auth_user, "password": this.auth_pass }).subscribe(this.sessionInfo);
  }

  ngOnInit(): void {
  }

}
