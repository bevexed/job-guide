import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassEditComponent } from './pass-edit.component';

describe('PassEditComponent', () => {
  let component: PassEditComponent;
  let fixture: ComponentFixture<PassEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
