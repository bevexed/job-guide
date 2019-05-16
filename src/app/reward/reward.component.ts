import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-reward',
  templateUrl: './reward.component.html',
  styleUrls: ['./reward.component.less', '../usercenter/usercenter.component.less']
})
export class RewardComponent implements OnInit {

  constructor(
    public httpService: HttpService
  ) { }

  ngOnInit() {
  }

}
