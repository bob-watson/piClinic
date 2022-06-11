import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

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
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
