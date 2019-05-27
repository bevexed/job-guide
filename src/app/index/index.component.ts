import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {HttpService} from '../http.service';
import {ActivatedRoute} from '@angular/router';



export interface videos {
  data: any[];
  size: number;
  current: number;
  currentData: any;
  hot?: boolean;
}

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.less']
})
export class IndexComponent implements OnInit, OnDestroy {
  effect = 'scrollx';
  public bannerlist: any[] = [];
  public zixunlist: any[] = [];
  public dotIndex: any[] = [];
  public hots: videos = {
    data: [],
    current: 1,
    size: 12,
    currentData: []
  };
  public developList: any[] = [];
  public professionList: any[] = [];
  public _store: any;
  public isSpinning = true;
  public blockType = {
    hots: 0,
    development: 1,
    profession: 2
  };
  public gkPngList = [
    '../../assets/gk.png',
    '../../assets/gk2.png',
    '../../assets/gk3.png'
  ];
  // erkai
  public gaokaozixun = [];
  private observer: any;
  private await: any;

  constructor(
    public httpService: HttpService,
    public ref: ChangeDetectorRef,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit() {
    this.indexInit();
    this.getHomeListPage();
    this.route.params.subscribe((data: any) => {
      if (data.inviterId) {
        this.httpService.inviterId = +data.inviterId;
      }
    });
  }

  ngOnDestroy() {
    this.httpService.pageCache.hots = {
      ...this.hots,
      top: document.documentElement.scrollTop !== 0 ? document.documentElement.scrollTop : document.body.scrollTop
    };
    if (this.observer) {
      this.observer.unsubscribe();
    }
  }

  public async indexInit() {
    let res: any;
    if (this.httpService.devType) {
      res = await this.httpService.getIndex();
    } else {
      res = await this.httpService.getMobileIndex();
    }
    this.bannerlist = res.data.bannerList;

    // 二开 底部
    res.data.hotList.forEach(item => item.hot = true);
    this.hots = {
      data: res.data.hotList,
      current: 1,
      size: 12,
      currentData: [],
    };

    this.developList = res.data.developList.slice(0, 8);
    this.professionList = res.data.professionList.slice(0, 8);

    for (const key in this.blockType) {
      this.listFilter(this.blockType[key]);
    }

    if (this.observer) {
      return;
    }

    this.observer = this.httpService.ishistoryback.subscribe(() => {
      if (this.httpService.pageCache.hots) {
        if (this.httpService.devType) { // pc
          // this.hots.current = this.httpService.pageCache.hots.current;
          // this.listFilter(this.blockType.hots);
        } else { // 手机
          this.mbPagination(this.httpService.pageCache.hots.current);
        }
        setTimeout(() => {
          window.scrollTo(0, this.httpService.pageCache.hots.top);
        }, 0);
      }
    });
  }

  public listFilter(type: number) {
    switch (type) {
      case this.blockType.hots:
        this.hots.currentData = this.hots.data.slice((this.hots.current - 1) * this.hots.size, this.hots.current * this.hots.size);
        break;
    }
  }

  public async zixunList() {
    let response: any;
    response = await this.httpService.getZixun();
    console.log(response);
    // this.zixunlist = res.+
  }
  public changeCarousel(e) {
    this.dotIndex = e.to;
  }
  public mbPagination(pageNumber?: number) {
    if (pageNumber === undefined) {
      this.hots.current = this.hots.current + 1;
      const sliceData = this.hots.data.slice((this.hots.current - 1) * this.hots.size, this.hots.current * this.hots.size);
      this.hots.currentData = this.hots.currentData.concat(sliceData);
    } else {
      this.hots.current = pageNumber;
      this.hots.currentData = this.hots.data.slice(0, this.hots.current * this.hots.size);
    }
  }

  public async getHomeListPage() {
    const result = await this.httpService.reqHomeListPage();
    if (result.code === 200) {
      this.gaokaozixun = Object.values(result.data[0]);
      for (let i = 0; i < this.gaokaozixun.length; i++) {
        this.gaokaozixun[i].src = this.gkPngList[i];
        this.gaokaozixun[i].pageM = Object.keys(result.data[0])[i];
      }
    }
    console.log(Object.keys(result.data[0]), this.gaokaozixun);
  }
}
