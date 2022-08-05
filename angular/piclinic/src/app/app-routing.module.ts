import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PiClinicLoginComponent } from './pi-clinic-login/pi-clinic-login.component';
import { PiClinicDashComponent } from './pi-clinic-dash/pi-clinic-dash.component';
import { PiClinicHeaderComponent } from './pi-clinic-header/pi-clinic-header.component';

const routes: Routes = [
  /*
  {
    path: '',
    title: 'Clinic login - piClinic'
  },
  */
  {
    path: 'clinicLogin',
    title: 'Clinic login - piClinic',
    component: PiClinicLoginComponent
  },
  {
    path: 'clinicDash',
    title: 'Clinic dashboard - piClinic',
    component: PiClinicDashComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
