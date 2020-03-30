import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboarddataComponent } from './dashboarddata.component';

describe('DashboarddataComponent', () => {
  let component: DashboarddataComponent;
  let fixture: ComponentFixture<DashboarddataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboarddataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboarddataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
