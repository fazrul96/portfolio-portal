import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropzoneWrapperComponent } from './dropzone-wrapper.component';

describe('DropzoneWrapperComponent', () => {
  let component: DropzoneWrapperComponent;
  let fixture: ComponentFixture<DropzoneWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropzoneWrapperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropzoneWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
