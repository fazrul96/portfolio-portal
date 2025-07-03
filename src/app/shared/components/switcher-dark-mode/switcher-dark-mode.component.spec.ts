import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitcherDarkModeComponent } from './switcher-dark-mode.component';

describe('SwitcherDarkModeComponent', () => {
  let component: SwitcherDarkModeComponent;
  let fixture: ComponentFixture<SwitcherDarkModeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwitcherDarkModeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SwitcherDarkModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
