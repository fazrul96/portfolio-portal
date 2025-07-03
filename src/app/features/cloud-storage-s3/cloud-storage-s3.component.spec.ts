import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloudStorageS3Component } from './cloud-storage-s3.component';

describe('CloudStorageS3Component', () => {
  let component: CloudStorageS3Component;
  let fixture: ComponentFixture<CloudStorageS3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CloudStorageS3Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CloudStorageS3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
