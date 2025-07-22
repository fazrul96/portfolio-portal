import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebtoonComponent } from './webtoon.component';

describe('WebtoonComponent', () => {
  let component: WebtoonComponent;
  let fixture: ComponentFixture<WebtoonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebtoonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebtoonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
