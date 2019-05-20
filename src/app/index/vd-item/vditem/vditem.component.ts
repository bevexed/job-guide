import {Component, OnInit, Input} from '@angular/core';

declare var window;

@Component({
  selector: 'app-vditem',
  templateUrl: './vditem.component.html',
  styleUrls: ['./vditem.component.less']
})
export class VditemComponent implements OnInit {
  @Input() data: any = {};
  styles: Object = {
    'padding': 0,
    'background': 'red'
  };
  @Input() devType = true;

  public isIE = false;

  //
  public index = false;
  public development = false;

  constructor() {
  }

  ngOnInit() {
    this.checkBrowerType();
    this.index = window.location.hash.includes('index');
    this.development = window.location.hash.includes('development');
  }


  public vipTag(data: any): boolean {
    if (data.courseFreeFlag) {
      return data.courseFreeFlag;
    } else if (data.freeFlag) {
      return data.freeFlag;
    } else {
      return false;
    }
  }

  public checkBrowerType() {
    if (window.navigator.userAgent.indexOf('MSIE') >= 1) {
      this.isIE = true;
    }
  }
}
