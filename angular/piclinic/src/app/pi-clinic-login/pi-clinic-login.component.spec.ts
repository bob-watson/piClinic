import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PiClinicLoginComponent } from './pi-clinic-login.component';

describe('PiClinicLoginComponent', () => {
  let component: PiClinicLoginComponent;
  let fixture: ComponentFixture<PiClinicLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PiClinicLoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PiClinicLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
