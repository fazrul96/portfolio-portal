import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebtoonSeriesComponent } from './webtoon-series.component';

describe('WebtoonSeriesComponent', () => {
  let component: WebtoonSeriesComponent;
  let fixture: ComponentFixture<WebtoonSeriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebtoonSeriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebtoonSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
