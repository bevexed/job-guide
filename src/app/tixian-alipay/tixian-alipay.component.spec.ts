import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TixianAlipayComponent } from './tixian-alipay.component';

describe('TixianAlipayComponent', () => {
  let component: TixianAlipayComponent;
  let fixture: ComponentFixture<TixianAlipayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TixianAlipayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TixianAlipayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
