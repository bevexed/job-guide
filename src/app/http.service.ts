import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {timeout} from 'rxjs/operators';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {environment} from '../environments/environment';
import {ReplaySubject} from 'rxjs';
import {Router} from '@angular/router';
import {PlatformLocation} from '@angular/common';

declare var WeixinJSBridge: Boolean;

export enum BANNER_TYPELIST {
  develop_banner = 0,
  profession_banner,
  mobile_develop_banner,
  mobile_profession_banner
}

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  // public baseUrl = 'http://39.98.232.64:9090';
  public baseUrl = 'http://api.zhichangsinan.com';
  public token: string;
  public user: any;
  public loginModal = false;
  public devType = true;
  public inviterId: number;
  public vipModal = false;
  public price = 299;
  public pageCache: any = {
    hots: null,
    jobs: null,
    link_jobs: null,
    unlimited_jobs: null,
    develope: null
  };
  public coupon: any;
  public ishistoryback: ReplaySubject<any> = new ReplaySubject<any>();
  /** 设备类型，true：PC， false：移动端 */
  private headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  public isWeixin: any;
  /** 是否是通过历史记录进入页面的 */

    // li
  public weixinImgUrl: string;
  public weixinShow = false;
  public timer;

  constructor(
    private http: HttpClient,
    private message: NzMessageService,
    private modalService: NzModalService,
    private router: Router,
    private location: PlatformLocation
  ) {
    if (environment.production) {
      this.baseUrl = 'http://api.zhichangsinan.com';
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
    const sUserAgent = navigator.userAgent.toLowerCase();
    const bIsIpad = sUserAgent.match(/ipad/i);
    const bIsIphoneOs = sUserAgent.match(/iphone os/i);
    const bIsMidp = sUserAgent.match(/midp/i);
    const bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i);
    const bIsUc = sUserAgent.match(/ucweb/i);
    const bIsAndroid = sUserAgent.match(/android/i);
    const bIsCE = sUserAgent.match(/windows ce/i);
    const bIsWM = sUserAgent.match(/windows mobile/i);
    const isWeixinF = sUserAgent.match(/MicroMessenger/i);
    if (isWeixinF == 'micromessenger') {
      this.isWeixin = true;
    } else {
      this.isWeixin = false;
    }
    console.log(this.isWeixin);
    if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM || isWeixin) { // 移动设备
      this.devType = false;
      document.body.style.cssText = 'min-width: initial;';
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
    const pathname = this.location.hash;
    console.log(this.location);
    if (pathname.indexOf('usercenter') > -1 || pathname.indexOf('passport') > -1) {
      this.router.navigate(['../index']);
    }
  }

  public getIndex(): Promise<any> {
    const url = this.baseUrl + '/home/page/module';
    return this.httpGet(url);
  }

  public getMobileIndex(): Promise<any> {
    const url = this.baseUrl + '/home/page/mobile/module';
    return this.httpGet(url);
  }

  public getBannerByType(type: string): Promise<any> {
    const url = this.baseUrl + `/page/module/banner?moduleCode=${type}`;
    return this.httpGet(url);
  }

  public getDevelop(): Promise<any> {
    const url = this.baseUrl + '/course/category/develop/list';
    return this.httpGet(url);
  }

  public getProfrssionTypeList(): Promise<any> {
    const url = this.baseUrl + '/course/category/profession/list';
    return this.httpGet(url);
  }

  public getProfessionById(id: number): Promise<any> {
    const url = this.baseUrl + `/course/profession/list?courseCategoryId=${id}`;
    return this.httpGet(url);
  }

  public login(data: any): Promise<any> {
    const url = this.baseUrl + '/user/login';
    return this.httpPost(url, data);
  }

  public getCaptcha(mobile: string): Promise<any> {
    const url = this.baseUrl + '/user/register/send/captcha';
    const data = {mobile};
    return this.httpPost(url, data, true);
  }

  public register(data: Object): Promise<any> {
    const url = this.baseUrl + '/user/register';
    return this.httpPost(url, data, true);
  }

  public getCourseDetail(id: number): Promise<any> {
    const url = this.baseUrl + `/course/detail?courseId=${id}`;
    return this.httpGet(url);
  }

  public getInfoOfMine(): Promise<any> {
    const url = this.baseUrl + '/user/me';
    return this.httpGet(url);
  }

  public getAccountList(data: any): Promise<any> {
    const url = this.baseUrl + `/account/funds/record?size=${data.size}&current=${data.current}`;
    return this.httpGet(url);
  }

  public getWithdrawList(data: any): Promise<any> {
    const url = this.baseUrl + `/account/withdraw/record?size=${data.size}&current=${data.current}`;
    return this.httpGet(url);
  }

  public withdraw(data: any): Promise<any> {
    // let url = this.baseUrl + `/account/withdraw/apply?amount=${amount}`;
    const url = this.baseUrl + `/account/withdraw/apply`;
    return this.httpPost(url, data);
  }

  /** 获取修改密码的验证码 */
  public getPassportCaptcha(mobile: string): Promise<any> {
    const url = this.baseUrl + '/user/change/password/send/captcha';
    const data = {mobile};
    return this.httpPost(url, data);
  }

  /** 修改密码 */
  public passportSubmit(data: any): Promise<any> {
    const url = this.baseUrl + '/user/change/password';
    return this.httpPost(url, data);
  }

  // 获取openid
  public getOpenId(code: any): Promise<any> {
    const url = this.baseUrl + '/wxpay/getOpenid';
    return this.httpPost(url, code);
  }

  // 微信支付
  public wxpay(userId: string, promoCode: string, userCouponId: string, openId: string, payChannel: any) {
    const url = this.baseUrl + `/wxpay/gzhOrder?promoCode=${promoCode}
    &userCouponId=${userCouponId}&openId=${openId}`;
    return this.httpGet(url);
  }

  /** 打开支付弹窗 */
  public async openPayModal() {
    this.getPrice();
    const res = await this.getCouponList();
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
          // this.vipModal = false;
          // this.loginModal = true;
          this.router.navigateByUrl('/login');
        }
      });
    }
  }

  public coursePlay(id: number) {
    const url = this.baseUrl + '/course/play';
    const data = {id};
    this.httpPost(url, data);
  }

  public async getPrice() {
    const url = this.baseUrl + '/system/param/vip/price';
    const res = await this.httpGet(url);
    if (res.code === 200) {
      this.price = res.data.value;
    }
  }

  public async getCouponList(): Promise<any> {
    const url = this.baseUrl + '/user/coupon/list';
    return this.httpGet(url);
  }

  public getCouponByShare(): Promise<any> {
    const url = this.baseUrl + '/user/coupon/generate/share';
    return this.httpPost(url, {});
  }

  public async tokenValidate() {
    const res = await this.getInfoOfMine();
    if (res.code === 401) {
      this.user = null;
      this.token = null;
      this.logout();
      return new Promise((resolve) => {
        resolve(false);
      });
    } else {
      this.user = {
        id: res.data.id,
        mobile: res.data.mobile,
        vipFlag: res.data.vipFlag,
        qrCodeImageUrl: res.data.qrCodeImageUrl
      };
      const data = {
        user: this.user,
        token: this.token
      };
      localStorage.setItem('userInfo', JSON.stringify(data));
      return new Promise((resolve) => {
        resolve(true);
      });
    }
  }

  public getPriceByPromoCode(promoCode: string) {
    const url = this.baseUrl + `/user/getPromo?promoCode=${promoCode}`;
    return this.httpGet(url);
  }

  public GetQueryString(name: string) {
    const reg = new RegExp( '(^|&)' + name + '=([^&]*)(&|$)'); // 构造一个含有目标参数的正则表达式对象
    const r = window.location.search.substr(1).match(reg); // 匹配目标参数
    if (r != null) { return unescape(r[2]); } return null; // 返回参数值
  }

  /** 支付 */
  public async pay(payType: string,  promoCode?: string, userCouponId?: any) {
    if (!this.user) {
      this.modalService.error({
        nzTitle: '权限不足',
        nzContent: '请您先进行登录',
        nzOnOk: () => {
          // this.vipModal = false;
          // this.loginModal = true;
          this.router.navigateByUrl('/login');
        }
      });
      return;
    }
    const results = await this.tokenValidate();
    console.log(results);
    if (!results) {
      return this.modalService.error({
        nzTitle: '权限不足',
        nzContent: '请您重新进行登录',
        nzOnOk: () => {
          // this.vipModal = false;
          // this.loginModal = true;
          this.router.navigateByUrl('/login');
        }
      });
    }

    // 支付分路口
    switch (payType) {
      case '微信': {
        try {
          let url = this.baseUrl + '/wxpay/qrcode';
          console.log(promoCode, userCouponId);
          if (promoCode) {
            if (url.indexOf('?') === -1) {
              url = url + '?promoCode=' + promoCode;
            } else {
              url = url + '&promoCode=' + promoCode;
            }
          }

          if (userCouponId) {
            if (url.indexOf('?') === -1) {
              url = url + '?userCouponId=' + userCouponId.id;
            } else {
              url = url + '&userCouponId=' + userCouponId.id;
            }
          }

          const res = await this.getWeiXinQrcode(url);
          console.log(res);
          if (res.code === 200) {
            this.weixinImgUrl = res.data.qrcodeurl;
            this.weixinShow = true;

            // 支付 回调
            const orderno = res.data.orderno;
            if (this.weixinShow) {
              this.timer = setInterval(
                async () => {
                  if (!this.weixinShow) {
                    clearInterval(this.timer);
                    this.timer = null;
                    return;
                  }
                  const result = await this.getWeixinCallBack(orderno);
                  if (result.data) {
                    clearInterval(this.timer);
                    this.timer = null;
                    this.message.success('支付成功');
                    setTimeout(() => {
                      window.location.reload(true);
                    });
                  }
                }
                , 1000);
            }

          }
        } catch (e) {

        }
        break;
      }
      case '支付宝': {

        let url = this.baseUrl + '/order/alipay/trade/wap';

        if (promoCode) {
          if (url.indexOf('?') === -1) {
            url = url + '?promoCode=' + promoCode;
          } else {
            url = url + '&promoCode=' + promoCode;
          }
        }
        if (userCouponId) {
          if (url.indexOf('?') === -1) {
            url = url + '?userCouponId=' + userCouponId.id;
          } else {
            url = url + '&userCouponId=' + userCouponId.id;
          }
        }
        const res = await this.httpGet(url);
        if (res.code === 200) {
          const wrapper = document.getElementById('pay-wrapper');
          wrapper.innerHTML = '';
          wrapper.innerHTML = res.data;
          document.forms['punchout_form'].submit();
        } else {
          this.message.error(res.message);
        }

        break;
      }
      case 'wechat': {
        const code = this.GetQueryString('code');
        if (!code) {
          window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxc80f049c9265d854' +
            '&redirect_uri=http%3a%2f%2fwww.zhichangsinan.com&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
        } else {
          const res = await this.getOpenId(code);

          let url = this.baseUrl + '/wxpay/gzhOrder';

          if (promoCode) {
            if (url.indexOf('?') === -1) {
              url = url + '?promoCode=' + promoCode;
            } else {
              url = url + '&promoCode=' + promoCode;
            }
          }
          if (userCouponId) {
            if (url.indexOf('?') === -1) {
              url = url + '?userCouponId=' + userCouponId.id;
            } else {
              url = url + '&userCouponId=' + userCouponId.id;
            }
          }
          if (res.openId) {
            if (url.indexOf('?') === -1) {
              url = url + '?openId=' + res.openId;
            } else {
              url = url + '&openId=' + res.openId;
            }
          }
          const respone = await this.httpGet(url);
          console.log(respone);
          // WeixinJSBridge.invoke('getBrandIAPPayRequest', {
          //                   'appId' : 'wxf8b4f85f3a794e77', // 公众号名称，由商户传入
          //                   'timeStamp' : '189026618', // 时间戳 这里随意使用了一个值
          //                   'nonceStr' : 'adssdasssd13d', // 随机串
          //                    'package' : 'bankType=CITIC_CREDIT&bankName=%e4%b8%ad%e4%bf%a1%e9%93%b6%e8%a1%8c&sign' +
          //                      '=CF8922F49431FFE8A1834D0B32B25CE3',
          //                   // 扩展字段，由商户传入
          //                  'signType': 'SHA1', // 微信签名方式:sha1
          //                   'paySign': '1e6f13f78ca0ec43fbb80899087f77568af66987' //微信签名
          //                 },
          //                 function(e) {
          //                        alert(e.err_msg);
          //                    });
          // wx.config({
          //   debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          //   appId: '', // 必填，公众号的唯一标识
          //   timestamp: , // 必填，生成签名的时间戳
          //   nonceStr: '', // 必填，生成签名的随机串
          //   signature: '', // 必填，签名
          //   jsApiList: [
          //     'chooseWXPay'
          //   ] // 必填，需要使用的JS接口列表
          // });
  //         wx.ready({
  //           wx.chooseWXPay({
  //             timestamp: 0, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
  //             nonceStr: '', // 支付签名随机串，不长于 32 位
  //             package: '', // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
  //             signType: '', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
  //             paySign: '', // 支付签名
  //             success: function (response) {
  // // 支付成功后的回调函数
  //             }
  //           })
  //         })
          // if (res.code === 200) {
          //   const wrapper = document.getElementById('pay-wrappers');
          //   wrapper.innerHTML = '';
          //   wrapper.innerHTML = res.data;
          //   document.forms['punchout_form'].submit();
          // } else {
          //   this.message.error(res.message);
          // }

        }
        break;
      }

      default:
        break;
    }
  }


  // 二开
  // li 微信 支付
  // FIXME: 还有一个支付 不知道干啥的
  public getWeiXinQrcode(url: string) {
    return this.httpGet(url);
  }

  // li 微信 支付 回调
  public getWeixinCallBack(orderno: string) {
    const url = 'http://api.zhichangsinan.com/order/isorderpay?orderno=' + orderno;
    return this.httpGet(url);
  }
}
