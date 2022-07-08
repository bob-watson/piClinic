import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PiClinicAppMenuComponent } from './pi-clinic-app-menu.component';

describe('PiClinicAppMenuComponent', () => {
  let component: PiClinicAppMenuComponent;
  let fixture: ComponentFixture<PiClinicAppMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PiClinicAppMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PiClinicAppMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
