import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PiClinicDashComponent } from './pi-clinic-dash.component';

describe('PiClinicDashComponent', () => {
  let component: PiClinicDashComponent;
  let fixture: ComponentFixture<PiClinicDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PiClinicDashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PiClinicDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
