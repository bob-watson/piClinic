import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PiClinicHeaderComponent } from './pi-clinic-header.component';

describe('PiClinicHeaderComponent', () => {
  let component: PiClinicHeaderComponent;
  let fixture: ComponentFixture<PiClinicHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PiClinicHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PiClinicHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
