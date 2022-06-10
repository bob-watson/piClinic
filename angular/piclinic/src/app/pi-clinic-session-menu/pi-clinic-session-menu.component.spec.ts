import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PiClinicSessionMenuComponent } from './pi-clinic-session-menu.component';

describe('PiClinicSessionMenuComponent', () => {
  let component: PiClinicSessionMenuComponent;
  let fixture: ComponentFixture<PiClinicSessionMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PiClinicSessionMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PiClinicSessionMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
