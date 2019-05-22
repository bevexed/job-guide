import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GaokaoComponent } from './gaokao.component';

describe('GaokaoComponent', () => {
  let component: GaokaoComponent;
  let fixture: ComponentFixture<GaokaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GaokaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GaokaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
