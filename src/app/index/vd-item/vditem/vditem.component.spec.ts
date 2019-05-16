import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VditemComponent } from './vditem.component';

describe('VditemComponent', () => {
  let component: VditemComponent;
  let fixture: ComponentFixture<VditemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VditemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VditemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
