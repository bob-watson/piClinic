import { Component, OnInit, Output, Input} from '@angular/core';
import { SessionManagerService } from 'app/session-manager.service';

@Component({
  selector: 'app-pi-clinic-session-menu',
  templateUrl: './pi-clinic-session-menu.component.html',
  styleUrls: ['./pi-clinic-session-menu.component.css']
})
export class PiClinicSessionMenuComponent implements OnInit {

  // UI properties
  @Input() auth_user = "";
  @Input() auth_pass = "";


  @Output() username = 'noUser';
  @Output() itemSeparator = '&nbsp;&nbsp;|&nbsp;&nbsp;';
  @Output() userEditPrompt = 'User settings';
  @Output() logoutLink = 'Logout';

  constructor(
    public sessionMgr: SessionManagerService
  ) {

  }

  ngOnInit(): void {
  }

}
