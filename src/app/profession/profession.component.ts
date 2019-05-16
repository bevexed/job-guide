import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { HttpService, BANNER_TYPELIST } from '../http.service';
import { videos } from '../index/index.component';

@Component({
  selector: 'app-profession',
  templateUrl: './profession.component.html',
  styleUrls: ['../development/development.component.less', '../index/index.component.less']
})
export class ProfessionComponent implements OnInit, AfterViewInit {
  effect = 'scrollx';
  public classifySlice: boolean = true;
  public visible:boolean = false;
  public banner: any[] = [];
  public professionList: videos = {
    data: [],
    current: 1,
    size: 4,
    currentData: []
  };
  public crossList: videos = {
    data: [],
    current: 1,
    size: 4,
    currentData: []
  };
  public unlimitedList: videos = {
    data: [],
    current: 1,
    size: 8,
    currentData: []
  };
  public typeList: any[] = [];
  public selectedId: number;
  public bannerlist: any[] = [];
  public isSpinning = true;
  public blockType = {
    professionList: 0,
    crossList: 1,
    unlimitedList: 2
  };
  public rowCount: number = 6;
  @ViewChild('vdwrapper') wrapper;
  private observer: any;

  constructor(
    public httpService: HttpService
  ) {}

  ngOnInit() {
    this.getProfessionList();
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

  ngOnDestroy(): void {
    this.httpService.pageCache.jobs = {...this.professionList, type: this.selectedId, top: document.documentElement.scrollTop !== 0 ? document.documentElement.scrollTop : document.body.scrollTop};
    this.httpService.pageCache.link_jobs = this.crossList; 
    this.httpService.pageCache.unlimited_jobs = this.unlimitedList;
    if (this.observer) {
      this.observer.unsubscribe();
    }
  }

  private setRowCount() {
    let width = this.wrapper.nativeElement.clientWidth;
    this.rowCount = Math.floor(width/140);
  }

  public async getProfessionList() {
    let res = await this.httpService.getProfrssionTypeList();
    this.typeList = res.data;
    if (this.typeList.length) {
      let a = await this.getCoursesList(this.typeList[0].id);
      if (this.observer) {
        return;
      }
      this.observer = this.httpService.ishistoryback.subscribe(async () => {
        if (this.httpService.pageCache.jobs) {
          this.selectedId = this.httpService.pageCache.jobs.type;
          let b = await this.getCoursesList(this.selectedId);
          if (this.httpService.devType) { // pc
            this.professionList.current = this.httpService.pageCache.jobs.current;
            this.listFilter(this.blockType.professionList);
            this.crossList.current = this.httpService.pageCache.link_jobs.current;
            this.listFilter(this.blockType.crossList);
            this.unlimitedList.current = this.httpService.pageCache.unlimited_jobs.current;
            this.listFilter(this.blockType.unlimitedList);
          } else { // 手机
            this.mbPagination(this.blockType.professionList,this.httpService.pageCache.jobs.current);
            this.mbPagination(this.blockType.crossList,this.httpService.pageCache.link_jobs.current);
            this.mbPagination(this.blockType.unlimitedList,this.httpService.pageCache.unlimited_jobs.current);
          }
          setTimeout(() => {
            window.scrollTo(0,this.httpService.pageCache.jobs.top);
          }, 0);
        }
      })
    }
  }

  public async getBanner() {
    let type = this.httpService.devType ? BANNER_TYPELIST[1] : BANNER_TYPELIST[3];
    let res = await this.httpService.getBannerByType(type);
    if (res.code === 200) {
      this.banner = res.data;
    }
  }

  public async getCoursesList(id: number) {
    this.selectedId = id;
    let res = await this.httpService.getProfessionById(id);
    this.professionList = {
      data: res.data.canList,
      current: 1,
      size: 4,
      currentData: []
    };
    this.crossList = {
      data: res.data.crossList,
      current: 1,
      size: 4,
      currentData: []
    };
    this.unlimitedList = {
      data: res.data.unlimitedList,
      current: 1,
      size: 8,
      currentData: []
    };
    for (let key in this.blockType) {
      this.listFilter(this.blockType[key]);
    }
    this.close();
    return new Promise((resolve, reject) => {
      resolve();
    })
  }

  public classifySplit() {
    if (this.classifySlice && this.typeList.length > this.rowCount *2) {
      return this.typeList.slice(0, this.rowCount * 2 - 1);
    } else {
      return this.typeList;
    }
  }

  public getTotalSize(total: number, size: number): number {
    return Math.ceil(total / size);
  }

  public listFilter(type: number) {
    switch(type) {
      case this.blockType.professionList:
        this.professionList.currentData = this.professionList.data.slice((this.professionList.current - 1) * this.professionList.size, this.professionList.current * this.professionList.size);
        break;
      case this.blockType.crossList:
        this.crossList.currentData = this.crossList.data.slice((this.crossList.current - 1) * this.crossList.size, this.crossList.current * this.crossList.size);
        break;
      case this.blockType.unlimitedList:
        this.unlimitedList.currentData = this.unlimitedList.data.slice((this.unlimitedList.current - 1) * this.unlimitedList.size, this.unlimitedList.current * this.unlimitedList.size);
        break;
    }
  }

  public mbPagination(type: number, pageNumber?: number) {
    let aimlist;
      switch(type) {
        case this.blockType.professionList:
          aimlist = this.professionList;
          break;
        case this.blockType.crossList:
          aimlist = this.crossList;
          break;
        case this.blockType.unlimitedList:
          aimlist = this.unlimitedList;
          break;
      }
    if (pageNumber === undefined) {
      aimlist.current  = aimlist.current + 1;
      let sliceData = aimlist.data.slice((aimlist.current - 1) * aimlist.size, aimlist.current * aimlist.size);
      aimlist.currentData = aimlist.currentData.concat(sliceData);
    } else {
      aimlist.current = pageNumber;
      aimlist.currentData = aimlist.data.slice(0, aimlist.current * aimlist.size);
    }
  }

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }
}