import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TixianComponent } from './tixian.component';

describe('TixianComponent', () => {
  let component: TixianComponent;
  let fixture: ComponentFixture<TixianComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TixianComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TixianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
