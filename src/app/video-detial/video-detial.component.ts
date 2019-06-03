import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpService} from '../http.service';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {fromEvent} from 'rxjs';
import {videos} from '../index/index.component';


@Component({
  selector: 'app-video-detial',
  templateUrl: './video-detial.component.html',
  styleUrls: ['./video-detial.component.less']
})
export class VideoDetialComponent implements OnInit {
  public courseInfo: any;
  public isplay = false;
  public courseId: number;

  public tuijian: any;
  public currentData: any[] = [];
  public courseList: videos = {
    data: [],
    current: 1,
    size: 10000,
    currentData: []
  };
  constructor(
    private route: ActivatedRoute,
    public httpService: HttpService,
    private modalService: NzModalService,
    private message: NzMessageService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe((res: any) => {
      this.courseId = +res.id;
      this.getCourseDetail(this.courseId);
      window.scrollTo(0, 0);
    });
    if (!this.httpService.devType) {
      fromEvent(document.body, 'click').subscribe(() => {
        if (this.isplay) {
          this.isplay = false;
        }
      });
    }

    this.httpService.reqRecommendedVideo().then(
      res => {
        console.log(res);
        if (res.code === 200) {
          this.courseList.data = res.data.records;
          this.courseList.currentData = res.data.records.slice(0, 6);
          this.courseList.data.forEach(
            item => {
              item.courseId = item.id;
              item.coverUrl = 'https://zcsn-public-prod.oss-cn-hangzhou.aliyuncs.com/' + item.cover;
            }
          );
        }
      }
    );
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

  public async getCourseDetail(id: number) {
    const res = await this.httpService.getCourseDetail(id);
    if (res.code === 200) {
      this.courseInfo = res.data;
      if (!this.courseInfo.freeFlag) {
        /** 如果vipFlag为false但却获取到了VIP视频的url,那么证明本地数据未更新，前端主动更新 */
        this.httpService.tokenValidate();
      }
    } else {
      this.message.create('error', res.message);
      setTimeout(() => {
        this.router.navigate(['../index']);
      }, 2000);
    }
  }
  public shareT() {
    this.httpService.shareModal = true;
  }
  public play(event?: MouseEvent) {
    if (event) {
      event.stopPropagation();
    }

    if (this.courseInfo.freeFlag) {
      this.isplay = true;
      this.httpService.coursePlay(this.courseId);
      return;
    }
    if (this.httpService.user && this.httpService.user.vipFlag) {
      this.isplay = true;
      this.httpService.coursePlay(this.courseId);
    } else {
      if (!this.httpService.user) {
        // this.httpService.loginModal = true;
        this.router.navigateByUrl('/login');
      } else {
        this.httpService.openPayModal();
      }
      // this.modalService.error({
      //   nzTitle: '权限不足',
      //   nzContent: !this.httpService.user ? '请您先进行登录' : '该视频只有VIP用户才可以进行观看',
      //   nzOnOk: () => {
      //     if (!this.httpService.user) {
      //       // this.httpService.loginModal = true;
      //       this.router.navigateByUrl('/login');
      //     } else {
      //       this.httpService.openPayModal();
      //     }
      //   }
      // });
    }
  }
}
