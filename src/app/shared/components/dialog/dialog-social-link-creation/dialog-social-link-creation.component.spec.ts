import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSocialLinkCreationComponent } from './dialog-social-link-creation.component';

describe('DialogSocialLinkCreationComponent', () => {
  let component: DialogSocialLinkCreationComponent;
  let fixture: ComponentFixture<DialogSocialLinkCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogSocialLinkCreationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogSocialLinkCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
