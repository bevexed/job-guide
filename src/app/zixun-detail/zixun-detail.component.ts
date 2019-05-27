import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-zixun-detail',
  templateUrl: './zixun-detail.component.html',
  styleUrls: ['./zixun-detail.component.less']
})
export class ZixunDetailComponent implements OnInit {
  public infoMsg = {};
  constructor(
    private httpService: HttpService,
    private router: Router,
    private routeinfo: ActivatedRoute
  ) { }

  ngOnInit() {
    const id = this.routeinfo.snapshot.queryParams['id'];
    this.getDetail(id);
  }
  public goBack() {
    history.go(-1);
  }
  public getDetail(id) {
    this.httpService.reqInformationInfo(id).then((res) => {
      this.infoMsg = res.data;
    });
  }
}
