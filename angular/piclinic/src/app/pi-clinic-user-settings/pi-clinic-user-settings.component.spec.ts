import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PiClinicUserSettingsComponent } from './pi-clinic-user-settings.component';

describe('PiClinicUserSettingsComponent', () => {
  let component: PiClinicUserSettingsComponent;
  let fixture: ComponentFixture<PiClinicUserSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PiClinicUserSettingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PiClinicUserSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
