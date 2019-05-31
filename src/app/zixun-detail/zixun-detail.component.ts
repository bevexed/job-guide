import {Component, OnInit} from '@angular/core';
import {HttpService} from '../http.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-zixun-detail',
  templateUrl: './zixun-detail.component.html',
  styleUrls: ['./zixun-detail.component.less']
})
export class ZixunDetailComponent implements OnInit {
  public infoMsg: any;
  public type = 0;
  constructor(
    private httpService: HttpService,
    private router: Router,
    private routeinfo: ActivatedRoute
  ) { }

  ngOnInit() {
    this.routeinfo.queryParams.subscribe(params => {
      console.log(params);
      this.type = params.type
      this.getDetail(params.id, params.type);
    });
  }
  public goBack() {
    history.go(-1);
  }
  public getDetail(id, type: any) {
    this.httpService.reqInformationInfo(id, type).then((res) => {
      this.infoMsg = res.data;
    });
  }

  public upload(id: any) {
    this.httpService.reqInformationInfo(id, this.type).then(
      res => {
        console.log(res);
        if (res.code === 200) {

          this.infoMsg = res.data;
          window.scrollTo(0, 0);

        }
      }
    );
  }
}
