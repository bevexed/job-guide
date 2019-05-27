import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpService} from '../http.service';

@Component({
  selector: 'app-gaokao-detail',
  templateUrl: './gaokao-detail.component.html',
  styleUrls: ['./gaokao-detail.component.less']
})
export class GaokaoDetailComponent implements OnInit {

  public id = 0;

  public content: any;

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public httpService: HttpService
  ) {
  }

  ngOnInit() {
    console.log(this.router);
    this.route.params.subscribe(data => {
      this.id = data.id;
    });

    this.httpService.reqInformationInfo(this.id).then(
      res => {
        console.log(res);
        if (res.code === 200) {

          this.content = res.data;
        }
      }
    );
  }

  public upload(id) {
    this.id = id;
    this.httpService.reqInformationInfo(this.id).then(
      res => {
        console.log(res);
        if (res.code === 200) {

          this.content = res.data;
        }
      }
    );
  }

}
