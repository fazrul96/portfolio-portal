import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Recaptcha2Component } from './recaptcha2.component';

describe('Recaptcha2Component', () => {
  let component: Recaptcha2Component;
  let fixture: ComponentFixture<Recaptcha2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Recaptcha2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Recaptcha2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
