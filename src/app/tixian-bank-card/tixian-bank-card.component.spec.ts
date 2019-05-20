import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TixianBankCardComponent } from './tixian-bank-card.component';

describe('TixianBankCardComponent', () => {
  let component: TixianBankCardComponent;
  let fixture: ComponentFixture<TixianBankCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TixianBankCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TixianBankCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
