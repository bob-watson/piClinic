import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PiClinicHeaderComponent } from './pi-clinic-header/pi-clinic-header.component';
import { PiClinicSessionMenuComponent } from './pi-clinic-session-menu/pi-clinic-session-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    PiClinicHeaderComponent,
    PiClinicSessionMenuComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
