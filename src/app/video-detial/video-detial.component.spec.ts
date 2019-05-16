import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoDetialComponent } from './video-detial.component';

describe('VideoDetialComponent', () => {
  let component: VideoDetialComponent;
  let fixture: ComponentFixture<VideoDetialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoDetialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoDetialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
