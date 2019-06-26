import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {BANNER_TYPELIST, HttpService} from '../http.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-zixun',
  templateUrl: './zixun.component.html',
  styleUrls: ['./zixun.component.less', '../development/development.component.less', '../app.component.less']
})
export class ZixunComponent implements OnInit, AfterViewInit {
  constructor(
    public httpService: HttpService,
    public router:Router
  ) { }
  effect = 'scrollx';
  public banner: any[] = [];
  @ViewChild('vdwrapper', {static: true}) wrapper;
  public rowCount = 6;
  public initLoading = true; // bug
  public loadingMore = false;
  public data: any[] = [];
  public list: Array<{ loading: boolean; name: any }> = [];
  public count = 5;
  public type = 0;
  public current = 1;
  public size = 100000;
  public dotZ: any[] = [];

  ngOnInit() {
    // this.getBanner();
    this.getListZixun();
    this.getList(this.type, this.current, this.size, (res: any) => {
      this.data = res.data.records;
      this.list = res.data.records;
      this.initLoading = false;
    });
  }

  ngAfterViewInit(): void {
    // Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    // Add 'implements AfterViewInit' to the class.
    if (this.httpService.devType) {
      this.setRowCount();
      window.addEventListener('resize', () => {
        this.setRowCount();
      });
    }
  }
  private setRowCount() {
    const width = this.wrapper.nativeElement.clientWidth;
    this.rowCount = Math.floor(width / 140);
  }

  public changeZ(e) {
    this.dotZ = e.to;
  }
  public async getBanner() {
    const type = this.httpService.devType ? BANNER_TYPELIST[1] : BANNER_TYPELIST[3];
    const res = await this.httpService.getBannerByType(type);
    if (res.code === 200) {
      this.banner = res.data;
    }
  }

  public async getListZixun() {
    const res = await this.httpService.getListZixunBanner();
    // console.log(res);
    if (res.code === 200) {
      this.banner = res.data.zixunList;
    }
  }
  // 切换动态
  public moveTab(type) {
    this.type = type;
    this.list = [];
    this.data = [];
    this.getList(this.type, this.current, this.size, (res: any) => {
      this.data = res.data.records;
      this.list = res.data.records;
      this.initLoading = false;
    });
  }
  // 加载列表
  public async getList(type, current, size, callback: (res: any) => void) {
    this.httpService.reqHomeInformationMore(type, current, size).then((res) => callback(res));
  }

  // 加载更多
  public onLoadMore(): void {
    this.loadingMore = true;
    this.list = this.data.concat([...Array(this.count)].fill({}).map(() => ({ loading: true, name: {} })));
    this.httpService.reqHomeInformationMore(this.type, this.current, this.size).then((res: any) => {
      this.data = this.data.concat(res.results);
      this.list = [...this.data];
      this.loadingMore = false;
    });
  }
}
