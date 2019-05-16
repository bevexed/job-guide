import { Component, OnInit, ChangeDetectorRef, AfterViewInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { PlatformLocation } from '@angular/common';
import { HttpService } from './http.service';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import NativeShare from 'nativeshare';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  title = 'videos';
  visible = false;
  validateForm: FormGroup;
  public activeUrl: string;
  public _store: any;
  public nativeShare: any;
  public bannerlist: any[] = [];
  public popoverVisible: boolean = false;
  public shareModal: boolean = false;
  public qrcode: any;
  private observer: any;
  public promoCode: string = '';
  public promoCodePrice: number = 0;
  public paybtn: boolean = true;

  constructor(
    private fb: FormBuilder,
    public httpService: HttpService,
    private router: Router,
    private ref: ChangeDetectorRef,
    private message: NzMessageService,
    private location: PlatformLocation,
    private route: ActivatedRoute,
    private modalService: NzModalService
  ) {
  }

  popoverHiding() {
    this.popoverVisible = false;
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    ).subscribe((data: any) => {
      this.activeUrl = data.url;
      this.ref.detectChanges();
    });
    let cookie = localStorage.getItem('userInfo');
    console.log(cookie);
    if (cookie) {
      let localData = JSON.parse(cookie);
      this.httpService.token = localData.token;
      console.error(this.httpService.token);
      // this.httpService.user = localData.user;
      this.httpService.init();
    }
    // 初始化页面以后默认加在一次账号信息，用来校验token是否过期
    this.httpService.tokenValidate();
    // this.httpService.getInfoOfMine().then((res: any) => {
    //   if (res.code !== 200) { /** 获取账号信息失败都默认为未登陆 */
    //     this.logout();
    //   } else {

    //   }
    // });

    this.nativeShare = new NativeShare();

    // 监听页面切换
    this.observer = fromEvent(window, 'popstate').subscribe((e: any) => {
      this.httpService.ishistoryback.next();
    })
  }

  ngAfterViewInit(): void {}

  ngOnDestroy() {
    this.observer.unsubscribe();
  }

  public async getBannerList() {
    let res = await this.httpService.getIndex();
    if (res.code === 200) {
      this.bannerlist = res.data.bannerList;
    }
  }

  public showModal(): void {
    this.httpService.loginModal = true;
  }

  public closeModal(): void {
    this.httpService.loginModal = false;
    this.validateForm.reset();
  }

  closeVipModal() {
    this.httpService.coupon = null;
    this.promoCode = '';
    this.paybtn = true;
    this.httpService.vipModal = false;
  }

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  closeShareModal() {
    this.shareModal = false;
  }

  public async login() {
    if (this.validateForm.valid) {
      let res = await this.httpService.login(this.validateForm.value);
      if (res.code === 200) {
        localStorage.setItem('userInfo', JSON.stringify(res.data));
        this.httpService.token = res.data.token;
        this.httpService.user = res.data.user;
        this.httpService.init();
        let pathname = this.location.pathname;
        if (pathname === '/register') {
          this.router.navigate(['../index']);
        }
        this.closeModal();
        this.ref.detectChanges();
      } else {
        this.message.create('error', res.message);
      }
    }
  }

  public logout() {
    this.httpService.logout();
  }

  public async call() {
    if (!this.httpService.user) {
      this.modalService.error({
        nzTitle: '权限不足',
        nzContent: '请您先进行登录',
        nzOnOk: () => {
          this.httpService.vipModal = false;
          this.httpService.loginModal = true;
        }
      });
      return;
    }
    var u = navigator.appVersion;
    var uc = u.split('UCBrowser/').length > 1  ? 1 : 0;
    var qq = u.split('MQQBrowser/').length > 1 ? 2 : 0;
    var wx = ((u.match(/MicroMessenger/i)) && (u.match(/MicroMessenger/i).toString().toLowerCase() == 'micromessenger'));
    let url = this.httpService.user ? window.location.origin + '/#/index/' + this.httpService.user.id : window.location.origin + '/#/index';
    if (uc || (qq && !wx)) {
      try {
        var shareData = {
          title: '职场司南',
          desc: '快来和我一起驰骋职场吧！',
          // 如果是微信该link的域名必须要在微信后台配置的安全域名之内的。
          link: url,
          icon: '/assets/logo-icon.png',
          // 不要过于依赖以下两个回调，很多浏览器是不支持的
          success: function () {
          },
          fail: function () {
          }
        };
        this.nativeShare.setShareData(shareData)
        this.nativeShare.call();
      } catch (err) {
        this.qrcode = this.httpService.user.qrCodeImageUrl;
        this.shareModal = true;
      }
    } else {
      this.qrcode = this.httpService.user.qrCodeImageUrl;;
      this.shareModal = true;
    }
    let res = await this.httpService.getCouponByShare();
    if (res.code === 200) {
      this.message.success('您收到一张优惠券，可到个人中心->我的优惠券中查看！');
    }
  }

  public loadSharePic() {
      let img2: any = document.getElementById('qrcode');
      let a = document.createElement('a');
      a.setAttribute('download', 'share.png');
      a.setAttribute('href', img2.src)
      a.click();
    // }
  }

  public getPromoCodeStatus(input: any): boolean {
    if (input.dirty && !input.untouched && !this.paybtn) {
      return true;
    } else {
      return false;
    }
  }

  public inputPromoCode() {
    if (this.promoCode.length === 0) {
      this.paybtn = true;
    } else {
      this.paybtn = false;
    }
  }

  public async checkPromoCode() {
    if (this.promoCode.length !== 0) {
      let res = await this.httpService.getPriceByPromoCode(this.promoCode);
      if (res.code === 200 && res.data.promoCode && res.data.promoPrice) {
        this.promoCodePrice = res.data.promoPrice;
        this.paybtn = true;
      } else {
        this.paybtn = false;
        this.message.error('优惠码不存在');
      }

    } else {
      this.paybtn = true;
    }
  }

  public getPrice(): number {
    if (!this.httpService.vipModal) {
      return 0;
    }
    let totalprice = this.httpService.price;
    let couponPrice = this.httpService.coupon ? this.httpService.coupon.price : 0;
    let price = totalprice - couponPrice - this.promoCodePrice;
    return price <= 0 ? 0.01 : price;
  }
}
