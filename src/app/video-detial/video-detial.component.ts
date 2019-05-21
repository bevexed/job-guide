import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpService} from '../http.service';
import {NzModalService, NzMessageService} from 'ng-zorro-antd';
import {fromEvent} from 'rxjs';


@Component({
  selector: 'app-video-detial',
  templateUrl: './video-detial.component.html',
  styleUrls: ['./video-detial.component.less']
})
export class VideoDetialComponent implements OnInit {
  public courseInfo: any;
  public isplay = false;
  public courseId: number;

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
    });
    if (!this.httpService.devType) {
      fromEvent(document.body, 'click').subscribe(() => {
        if (this.isplay) {
          this.isplay = false;
        }
      });
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
      this.modalService.error({
        nzTitle: '权限不足',
        nzContent: !this.httpService.user ? '请您先进行登录' : '该视频只有VIP用户才可以进行观看',
        nzOnOk: () => {
          if (!this.httpService.user) {
            this.httpService.loginModal = true;
          } else {
            this.httpService.openPayModal();
          }
        }
      });
    }
  }
}
