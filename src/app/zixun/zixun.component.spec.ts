import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZixunComponent } from './zixun.component';

describe('ZixunComponent', () => {
  let component: ZixunComponent;
  let fixture: ComponentFixture<ZixunComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZixunComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZixunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
