import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailMailtrapComponent } from './email-mailtrap.component';

describe('EmailMailtrapComponent', () => {
  let component: EmailMailtrapComponent;
  let fixture: ComponentFixture<EmailMailtrapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailMailtrapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailMailtrapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
