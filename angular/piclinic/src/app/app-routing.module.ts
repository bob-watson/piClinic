import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PiClinicLoginComponent } from './pi-clinic-login/pi-clinic-login.component';
import { PiClinicDashComponent } from './pi-clinic-dash/pi-clinic-dash.component';
import { PiClinicUserSettingsComponent } from './pi-clinic-user-settings/pi-clinic-user-settings.component';

const routes: Routes = [
  // { path: '', redirectTo: 'https://piclinic.org/', pathMatch: 'full'},
  {
    path: 'clinicLogin',
    title: 'Clinic login - piClinic',
    component: PiClinicLoginComponent
  },
  {
    path: 'clinicDash',
    title: 'Clinic dashboard - piClinic',
    component: PiClinicDashComponent
  },
  {
    path: 'userSettings',
    title: 'User settings - piClinic',
    component: PiClinicUserSettingsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
