import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-tixian',
  templateUrl: './tixian.component.html',
  styleUrls: ['./tixian.component.less']
})
export class TixianComponent implements OnInit {
  public acount: number;
  constructor(
    private router: Router,
    private routeinfo: ActivatedRoute,
    private message: NzMessageService
  ) {}

  ngOnInit() {
    this.acount = this.routeinfo.snapshot.queryParams['count'];
  }
  public goBack() {
   history.go(-1);
  }
  public async goAlipay() {
    if (this.acount == 0) {
      return this.message.create('error', '当前账户余额不支持提现');
    }
    this.router.navigate(['/tixianAlipay'], { queryParams: {acount: this.acount}});
  }
  public async goBank() {
    if (this.acount == 0) {
      return this.message.create('error', '当前账户余额不支持提现');
    }
    this.router.navigate(['/tixianBank'], { queryParams: {acount: this.acount}});
  }
}
