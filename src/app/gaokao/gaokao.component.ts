import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpService} from '../http.service';

const Tabs = [
  '找工作', '找兼职', '找实习'
];

@Component({
  selector: 'app-gaokao',
  templateUrl: './gaokao.component.html',
  styleUrls: ['./gaokao.component.less']
})

export class GaokaoComponent implements OnInit {

  public Tabs = Tabs;
  public activeTab = 0;
  public dataList = [];
  public current = 0;
  public size = 10;
  public total = 0;

  public hot = [];
  public banner = [];

  constructor(
    public router: Router,
    public Http: HttpService
  ) {
  }

  ngOnInit() {
    this.getHot();
    this.getListZixun();
    this.Http.reqHomeInformationMore(this.activeTab, this.current, this.size).then(
      res => {
        console.log(res);
        if (res.code === 200) {
          this.current++;
          this.dataList = res.data.records;
          this.current = res.data.current;
          this.total = res.data.total;
        }
      }
    );
  }

  public changeTab = tab => {
    if (tab === this.activeTab) {
      return false;
    }
    this.current = 0;
    this.activeTab = tab;
    this.Http.reqHomeInformationMore(this.activeTab, this.current, this.size).then(
      res => {
        console.log(res);
        if (res.code === 200) {
          this.current++;
          this.dataList = res.data.records;
          this.current = res.data.current;
          this.total = res.data.total;
        }
      }
    );
  };

  public changePage = page => {
    console.log(page);
    this.Http.reqHomeInformationMore(this.activeTab, page, this.size).then(
      res => {
        console.log(res);
        if (res.code === 200) {
          this.current++;
          this.dataList = res.data.records;
          this.current = res.data.current;
          this.total = res.data.total;
        }
      }
    );
  }
  public async getListZixun() {
    const res = await this.Http.getListZixunBanner();
    // console.log(res);
    if (res.code === 200) {
      this.banner = res.data.zixunList;
    }
  }

  public getHot = () => {
    this.Http.reqHotInformation().then(
      res => {
        console.log('hot', res);
        this.hot = res.data.records;
        console.log(this.hot);
      }
    );
  };

}
