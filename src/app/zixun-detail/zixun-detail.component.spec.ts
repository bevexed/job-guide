import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZixunDetailComponent } from './zixun-detail.component';

describe('ZixunDetailComponent', () => {
  let component: ZixunDetailComponent;
  let fixture: ComponentFixture<ZixunDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZixunDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZixunDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
