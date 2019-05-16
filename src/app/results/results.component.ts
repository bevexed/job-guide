import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['../usercenter/usercenter.component.less' ,'./results.component.less']
})
export class ResultsComponent implements OnInit {

  constructor(
    public router: Router
  ) { }

  ngOnInit() {
  }

  public breakToUsercenter() {
    this.router.navigate(['../usercenter']);
  }

}
