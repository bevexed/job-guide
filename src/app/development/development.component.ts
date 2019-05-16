import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { HttpService, BANNER_TYPELIST } from '../http.service';
import { videos } from '../index/index.component';

@Component({
  selector: 'app-development',
  templateUrl: './development.component.html',
  styleUrls: ['./development.component.less', '../index/index.component.less']
})
export class DevelopmentComponent implements OnInit, AfterViewInit, OnDestroy {
  effect = 'scrollx';
  public classifySlice: boolean = true;
  public visible:boolean = false;
  public developmentlist: any[] = [];
  public banner: any[] = [];
  public rowCount: number = 6;
  public courseList: videos = {
    data: [],
    current: 1,
    size: 16,
    currentData: []
  };
  public selectedCourseName: string;
  public isSpinning = true;
  @ViewChild('vdwrapper') wrapper;
  private observer: any;

  constructor(
    public httpService: HttpService,
  ) {
  }

  ngOnInit() {
    this.getDevelopList();
    this.getBanner();
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    if (this.httpService.devType) {
      this.setRowCount();
      window.addEventListener('resize', () => {
        this.setRowCount();
      })
    }
  }

  ngOnDestroy() {
    this.httpService.pageCache.develope = {...this.courseList, selectedCourseName: this.selectedCourseName, top: document.documentElement.scrollTop !== 0 ? document.documentElement.scrollTop : document.body.scrollTop};
  }

  private setRowCount() {
    let width = this.wrapper.nativeElement.clientWidth;
    this.rowCount = Math.floor(width/140);
  }

  public async getDevelopList() {
    let res = await this.httpService.getDevelop();
    this.developmentlist = res.data;
    if (this.developmentlist.length) {
      this.getCourseByName(this.developmentlist[0].name);
    }
    if (this.observer) {
      return;
    }
    this.observer = this.httpService.ishistoryback.subscribe(() => {
      if (this.httpService.pageCache.develope) {
        this.selectedCourseName = this.httpService.pageCache.develope.selectedCourseName;
        if (this.httpService.devType) { // pc
          this.courseList.current = this.httpService.pageCache.develope.current;
          this.getCourseByName(this.selectedCourseName);
        } else { // 手机
          this.mbPagination(this.httpService.pageCache.develope.current);
        }
        setTimeout(() => {
          window.scrollTo(0,this.httpService.pageCache.develope.top);
        }, 0);
      }
    })
  }

  public async getBanner() {
    let type = this.httpService.devType ? BANNER_TYPELIST[0] : BANNER_TYPELIST[2];
    let res = await this.httpService.getBannerByType(type);
    if (res.code === 200) {
      this.banner = res.data;
    }
  }

  public classifySplit() {
    if (this.classifySlice && this.developmentlist.length > this.rowCount *2) {
      return this.developmentlist.slice(0, this.rowCount * 2 - 1);
    } else {
      return this.developmentlist;
    }
  }

  public getCourseByName(name: string) {
    this.selectedCourseName = name;
    let filter = this.developmentlist.find((ele: any) => ele.name === name);
    if (filter) {
      this.courseList = {
        data: filter.courseList,
        current: 1,
        size: 16,
        currentData: []
      };
      this.listFilter();
    }
    this.close();
  }

  public listFilter() {
    this.courseList.currentData = this.courseList.data.slice((this.courseList.current - 1) * this.courseList.size, this.courseList.current * this.courseList.size);
  }

  public mbPagination(pageNumber?: number) {
    if (pageNumber === undefined) {
      this.courseList.current  = this.courseList.current + 1;
      let sliceData = this.courseList.data.slice((this.courseList.current - 1) * this.courseList.size, this.courseList.current * this.courseList.size);
      this.courseList.currentData = this.courseList.currentData.concat(sliceData);
    } else {
      this.courseList.current = pageNumber;
      this.courseList.currentData = this.courseList.currentData.slice(0, this.courseList.current * this.courseList.size);
    }
  }

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }
}