import { Component, OnInit, Input } from '@angular/core';
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


  // li 二开
  @Input() hot = false;

  public; isIE = false;

  constructor() { }

  ngOnInit() {
    this.checkBrowerType();
    console.log(this.hot);
    console.log(this.data);
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
