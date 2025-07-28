import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorageSidenavComponent } from './storage-sidenav.component';

describe('StorageSidenavComponent', () => {
  let component: StorageSidenavComponent;
  let fixture: ComponentFixture<StorageSidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StorageSidenavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StorageSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
