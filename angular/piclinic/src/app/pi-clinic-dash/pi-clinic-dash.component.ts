import { Component, OnInit } from '@angular/core';
import { PiClinicAppMenuComponent } from '../pi-clinic-app-menu/pi-clinic-app-menu.component';
import { AppModule } from 'app/app.module';
import { sessionData } from 'app/api/session.service';

@Component({
  selector: 'app-pi-clinic-dash',
  templateUrl: './pi-clinic-dash.component.html',
  styleUrls: ['./pi-clinic-dash.component.css']
})
export class PiClinicDashComponent implements OnInit {

  constructor(
    public app: AppModule
  ) { }

  ngOnInit(): void {  }

}
