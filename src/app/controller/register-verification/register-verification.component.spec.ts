import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterVerificationComponent } from './register-verification.component';

describe('RegisterVerificationComponent', () => {
  let component: RegisterVerificationComponent;
  let fixture: ComponentFixture<RegisterVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterVerificationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
