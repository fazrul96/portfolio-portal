import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebtoonReaderComponent } from './webtoon-reader.component';

describe('WebtoonReaderComponent', () => {
  let component: WebtoonReaderComponent;
  let fixture: ComponentFixture<WebtoonReaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebtoonReaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebtoonReaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
