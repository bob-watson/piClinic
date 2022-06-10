import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pi-clinic-login',
  templateUrl: './pi-clinic-login.component.html',
  styleUrls: ['./pi-clinic-login.component.css']
})
export class PiClinicLoginComponent implements OnInit {

  @Input() auth_user = "";
  @Input() auth_pass = "";

  constructor() { }

  showLogin() {
    var  message_text: String;
    message_text = "user: " + this.auth_user + "\n";
    message_text += "pass: " + this.auth_pass + "\n";
    alert(message_text);
  }

  ngOnInit(): void {
  }

}
