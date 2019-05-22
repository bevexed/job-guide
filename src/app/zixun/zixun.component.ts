import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { HttpService, BANNER_TYPELIST } from '../http.service';
import { videos } from '../index/index.component';

@Component({
  selector: 'app-zixun',
  templateUrl: './zixun.component.html',
  styleUrls: ['./zixun.component.less', '../development/development.component.less']
})
export class ZixunComponent implements OnInit, AfterViewInit {
  constructor(
    public httpService: HttpService,
  ) { }
  effect = 'scrollx';
  public banner: any[] = [];
  @ViewChild('vdwrapper') wrapper;
  public rowCount = 6;
  public initLoading = true; // bug
  public loadingMore = false;
  public data: any[] = [];
  public list: Array<{ loading: boolean; name: any }> = [];

  public fakeDataUrl = 'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';
  public count = 5;

  ngOnInit() {
    this.getBanner();
    this.getData((res: any) => {
      this.data = res.results;
      this.list = res.results;
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

  public async getBanner() {
    const type = this.httpService.devType ? BANNER_TYPELIST[1] : BANNER_TYPELIST[3];
    const res = await this.httpService.getBannerByType(type);
    if (res.code === 200) {
      this.banner = res.data;
    }
  }
  public getData(callback: (res: any) => void): void {
    this.httpService.httpGet(this.fakeDataUrl).then((res: any) => callback(res));
  }

  // 加载更多
  public onLoadMore(): void {
    this.loadingMore = true;
    this.list = this.data.concat([...Array(this.count)].fill({}).map(() => ({ loading: true, name: {} })));
    this.httpService.httpGet(this.fakeDataUrl).then((res: any) => {
      this.data = this.data.concat(res.results);
      this.list = [...this.data];
      this.loadingMore = false;
    });
  }
}
