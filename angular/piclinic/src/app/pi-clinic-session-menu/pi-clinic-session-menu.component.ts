import { Component, OnInit, Output } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

}
