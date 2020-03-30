import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderdataComponent } from './headerdata.component';

describe('HeaderdataComponent', () => {
  let component: HeaderdataComponent;
  let fixture: ComponentFixture<HeaderdataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderdataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
