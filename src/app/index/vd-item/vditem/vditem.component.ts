import {Component, Input, OnInit} from '@angular/core';
import {HttpService} from '../../../http.service';

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
  @Input() devType = false;

  public isIE = false;

  //
  public index = false;
  public development = false;
  public profession = false;
  public tuijian = false;
  public hot = false;

  constructor(
    public httpService: HttpService
  ) {
  }

  ngOnInit() {
    this.checkBrowerType();
    this.index = window.location.hash.includes('index');
    this.development = window.location.hash.includes('development');
    this.profession = window.location.hash.includes('profession');
    this.tuijian = window.location.hash.includes('vd');
    this.hot = window.location.hash.includes('hot');

  }

  public to(url) {
    window.location.assign(url);
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
