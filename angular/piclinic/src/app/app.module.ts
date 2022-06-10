import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here

import { AppComponent } from './app.component';
import { PiClinicHeaderComponent } from './pi-clinic-header/pi-clinic-header.component';
import { PiClinicSessionMenuComponent } from './pi-clinic-session-menu/pi-clinic-session-menu.component';
import { PiClinicLoginComponent } from './pi-clinic-login/pi-clinic-login.component';

@NgModule({
  declarations: [
    AppComponent,
    PiClinicHeaderComponent,
    PiClinicSessionMenuComponent,
    PiClinicLoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
