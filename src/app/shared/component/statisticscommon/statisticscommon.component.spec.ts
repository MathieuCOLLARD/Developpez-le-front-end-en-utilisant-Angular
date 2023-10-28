import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticscommonComponent } from './statisticscommon.component';

describe('StatisticscommonComponent', () => {
  let component: StatisticscommonComponent;
  let fixture: ComponentFixture<StatisticscommonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatisticscommonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatisticscommonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
