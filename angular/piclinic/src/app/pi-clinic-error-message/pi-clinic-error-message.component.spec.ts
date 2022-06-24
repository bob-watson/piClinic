import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PiClinicErrorMessageComponent } from './pi-clinic-error-message.component';

describe('PiClinicErrorMessageComponent', () => {
  let component: PiClinicErrorMessageComponent;
  let fixture: ComponentFixture<PiClinicErrorMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PiClinicErrorMessageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PiClinicErrorMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
