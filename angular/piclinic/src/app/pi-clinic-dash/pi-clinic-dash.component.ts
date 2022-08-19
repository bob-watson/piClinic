import { Component, OnInit } from '@angular/core';
import { PiClinicSessionMenuComponent } from 'app/pi-clinic-session-menu/pi-clinic-session-menu.component';
import { PiClinicAppMenuComponent } from '../pi-clinic-app-menu/pi-clinic-app-menu.component';

@Component({
  selector: 'app-pi-clinic-dash',
  templateUrl: './pi-clinic-dash.component.html',
  styleUrls: ['./pi-clinic-dash.component.css']
})
export class PiClinicDashComponent implements OnInit {

  constructor(
    public sessionMenu: PiClinicSessionMenuComponent
  ) { }

  ngOnInit(): void {
  }

}
