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
  public hot = [];

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public httpService: HttpService
  ) {
  }

  ngOnInit() {
    this.getHot();

    console.log(this.router);
    this.route.params.subscribe(data => {
      this.id = data.id;
      this.doPalay({id: data.id});
    });

    window.scrollTo(0, 0);

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

  public getHot = () => {
    this.httpService.reqHotInformation().then(
      res => {
        console.log('hot', res);
        this.hot = res.data.records;
        console.log(this.hot);
      }
    );
  };

  public doPalay = id => {
    this.httpService.reqPlay(id).then(
      res => {
        console.log('play', res);
      }
    );
  };

}
