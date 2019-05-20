import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tixian',
  templateUrl: './tixian.component.html',
  styleUrls: ['./tixian.component.less']
})
export class TixianComponent implements OnInit {

  constructor(
    private router: Router
  ) {}

  ngOnInit() {
  }
  public goBack() {
   history.go(-1);
  }
  public async goAlipay() {
    this.router.navigateByUrl('/tixianAlipay');
  }
  public async goBank(){
    this.router.navigateByUrl('/tixianBank');
  }
}
