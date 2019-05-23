import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GaokaoDetailComponent } from './gaokao-detail.component';

describe('GaokaoDetailComponent', () => {
  let component: GaokaoDetailComponent;
  let fixture: ComponentFixture<GaokaoDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GaokaoDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GaokaoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
