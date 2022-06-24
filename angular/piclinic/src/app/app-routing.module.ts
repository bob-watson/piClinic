import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PiClinicLoginComponent } from './pi-clinic-login/pi-clinic-login.component';
import { PiClinicDashComponent } from './pi-clinic-dash/pi-clinic-dash.component';

const routes: Routes = [
  // { path: '', redirectTo: 'https://piclinic.org/', pathMatch: 'full'},
  { path: 'clinicLogin', component: PiClinicLoginComponent },
  { path: 'clinicDash', component: PiClinicDashComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
