import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { timeout, map } from 'rxjs/operators';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { environment } from './../environments/environment';
import { Subject, ReplaySubject } from 'rxjs';
import { Router } from '@angular/router';
import { PlatformLocation } from '@angular/common';
declare var WeixinJSBridge: any;

export enum BANNER_TYPELIST {
  develop_banner = 0,
  profession_banner,
  mobile_develop_banner,
  mobile_profession_banner
};

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  public baseUrl: string = 'http://39.98.232.64:9090';
  public token: string;
  public user: any;
  public loginModal: boolean = false;
  public devType: boolean = true; /** 设备类型，true：PC， false：移动端 */
  private headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  public inviterId: number;
  public vipModal: boolean = false;
  public price: number = 299;
  public pageCache: any = {
    hots: null,
    jobs: null,
    link_jobs: null,
    unlimited_jobs: null,
    develope: null
  };
  public coupon: any;
  public ishistoryback: ReplaySubject<any> = new ReplaySubject<any>(); /** 是否是通过历史记录进入页面的 */

  constructor(
    private http: HttpClient,
    private message: NzMessageService,
    private modalService: NzModalService,
    private router: Router,
    private location: PlatformLocation
  ) {
    if (environment.production) {
      this.baseUrl = 'http://api.zhichangsinan.com'
    }
    this.browserRedirect();
  }

  public init() {
    if (this.token) {
      this.headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Auth-Token': this.token
      });
    }
  }
  /** 浏览器检测 */
  public browserRedirect() {
    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i);
    var bIsIphoneOs = sUserAgent.match(/iphone os/i);
    var bIsMidp = sUserAgent.match(/midp/i);
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i);
    var bIsUc = sUserAgent.match(/ucweb/i);
    var bIsAndroid = sUserAgent.match(/android/i);
    var bIsCE = sUserAgent.match(/windows ce/i);
    var bIsWM = sUserAgent.match(/windows mobile/i);
    if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) { // 移动设备
      this.devType = false;
      document.body.style.cssText = 'min-width: initial;'
    } else { // pc
      this.devType = true;
    }
  }

  public httpPost(url: string, data: object, nofilter?: boolean): Promise<any> {
    return this.http.post(url, data, {
      headers: this.headers
    }).pipe(
      timeout(30000)
    ).toPromise();
  }

  public httpGet(url: string): Promise<any> {
    return this.http.get(url, {
      headers: this.headers
    }).pipe(
      timeout(30000)
    ).toPromise();
  }

  public logout() {
    localStorage.clear();
    this.token = undefined;
    this.user = undefined;
    let pathname = this.location.hash;
    console.log(this.location);
    if (pathname.indexOf('usercenter') > -1 || pathname.indexOf('passport') > -1) {
      this.router.navigate(['../index']);
    }
  }

  public getIndex(): Promise<any> {
    let url = this.baseUrl + '/home/page/module';
    return this.httpGet(url);
  }

  public getMobileIndex(): Promise<any> {
    let url = this.baseUrl + '/home/page/mobile/module';
    return this.httpGet(url);
  }

  public getBannerByType(type: string): Promise<any> {
    let url = this.baseUrl + `/page/module/banner?moduleCode=${type}`;
    return this.httpGet(url);
  }

  public getDevelop(): Promise<any> {
    let url = this.baseUrl + '/course/category/develop/list';
    return this.httpGet(url);
  }

  public getProfrssionTypeList(): Promise<any> {
    let url = this.baseUrl + '/course/category/profession/list';
    return this.httpGet(url);
  }

  public getProfessionById(id: number): Promise<any> {
    let url = this.baseUrl + `/course/profession/list?courseCategoryId=${id}`;
    return this.httpGet(url);
  }

  public login(data: any): Promise<any> {
    let url = this.baseUrl + '/user/login';
    return this.httpPost(url, data);
  }

  public getCaptcha(mobile: string): Promise<any> {
    let url = this.baseUrl + '/user/register/send/captcha';
    let data = { mobile };
    return this.httpPost(url, data, true);
  }

  public register(data: Object): Promise<any> {
    let url = this.baseUrl + '/user/register';
    return this.httpPost(url, data, true);
  }

  public getCourseDetail(id: number): Promise<any> {
    let url = this.baseUrl + `/course/detail?courseId=${id}`;
    return this.httpGet(url);
  }

  public getInfoOfMine(): Promise<any> {
    let url = this.baseUrl + '/user/me';
    return this.httpGet(url);
  }

  public getAccountList(data: any): Promise<any> {
    let url = this.baseUrl + `/account/funds/record?size=${data.size}&current=${data.current}`;
    return this.httpGet(url);
  }

  public getWithdrawList(data: any): Promise<any> {
    let url = this.baseUrl + `/account/withdraw/record?size=${data.size}&current=${data.current}`;
    return this.httpGet(url);
  }

  public withdraw(data: any): Promise<any> {
    // let url = this.baseUrl + `/account/withdraw/apply?amount=${amount}`;
    let url = this.baseUrl + `/account/withdraw/apply`;
    return this.httpPost(url, data);
  }
  /** 获取修改密码的验证码 */
  public getPassportCaptcha(mobile: string): Promise<any> {
    let url = this.baseUrl + '/user/change/password/send/captcha';
    let data = { mobile };
    return this.httpPost(url, data);
  }
  /** 修改密码 */
  public passportSubmit(data: any): Promise<any> {
    let url = this.baseUrl + '/user/change/password';
    return this.httpPost(url, data);
  }
  /** 打开支付弹窗 */
  public async openPayModal() {
    this.getPrice();
    let res = await this.getCouponList();
    if (res.code === 200) {
      if (res.data.length) {
        this.coupon = res.data[0];
      }
      this.vipModal = true;
    } else {
      this.modalService.error({
        nzTitle: '权限不足',
        nzContent: '请您先进行登录',
        nzOnOk: () => {
          this.vipModal = false;
          this.loginModal = true;
        }
      });
    }
  }
  /** 支付 */
  public async pay(promoCode?: string, userCouponId?: any) {
    if (!this.user) {
      this.modalService.error({
        nzTitle: '权限不足',
        nzContent: '请您先进行登录',
        nzOnOk: () => {
          this.vipModal = false;
          this.loginModal = true;
        }
      });
      return;
    }
    let results = await this.tokenValidate();
    console.log(results);
    if (!results) {
      return this.modalService.error({
        nzTitle: '权限不足',
        nzContent: '请您重新进行登录',
        nzOnOk: () => {
          this.vipModal = false;
          this.loginModal = true;
        }
      });
    }
    let url = this.baseUrl + '/order/alipay/trade/wap';
    
    if (promoCode) {
      if (url.indexOf('?')===-1) {
        url = url + '?promoCode=' + promoCode;
      } else {
        url = url + '&promoCode=' + promoCode;
      }
    }
    if (userCouponId) {
      if (url.indexOf('?')===-1) {
        url = url + '?userCouponId=' + userCouponId.id;
      } else {
        url = url + '&userCouponId=' + userCouponId.id;
      }
    }
    let res = await this.httpGet(url);
    if (res.code === 200) {
      let wrapper = document.getElementById('pay-wrapper');
       wrapper.innerHTML = '';
       wrapper.innerHTML = res.data;
      document.forms['punchout_form'].submit();
    } else {
      this.message.error(res.message);
    }
  }

  public coursePlay(id: number) {
    let url = this.baseUrl + '/course/play';
    let data = { id };
    this.httpPost(url, data);
  }

  public async getPrice() {
    let url = this.baseUrl + '/system/param/vip/price';
    let res = await this.httpGet(url);
    if (res.code === 200) {
      this.price = res.data.value;
    }
  }

  public async getCouponList() : Promise<any>{
    let url = this.baseUrl + '/user/coupon/list';
    return this.httpGet(url);
  }

  public getCouponByShare(): Promise<any> {
    let url = this.baseUrl + '/user/coupon/generate/share';
    return this.httpPost(url, {});
  }

  public async tokenValidate() {
    let res = await this.getInfoOfMine();
    if (res.code === 401) {
      this.user = null;
      this.token = null;
      this.logout();
      return new Promise((resolve) => {
        resolve(false);
      })
    } else {
      this.user = {
        id: res.data.id,
        mobile: res.data.mobile,
        vipFlag: res.data.vipFlag,
        qrCodeImageUrl: res.data.qrCodeImageUrl 
      };
      let data = {
        user: this.user,
        token: this.token
      };
      localStorage.setItem('userInfo', JSON.stringify(data));
      return new Promise((resolve) => {
        resolve(true);
      })
    }
  }

  public getPriceByPromoCode(promoCode: string) {
    let url = this.baseUrl + `/user/getPromo?promoCode=${promoCode}`;
    return this.httpGet(url);
  }
}
