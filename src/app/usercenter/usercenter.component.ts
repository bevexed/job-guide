import {Component, OnInit} from '@angular/core';
import {HttpService} from '../http.service';
import {NzModalService, NzMessageService} from 'ng-zorro-antd';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {Router, NavigationEnd, ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-usercenter',
  templateUrl: './usercenter.component.html',
  styleUrls: ['./usercenter.component.less']
})
export class UsercenterComponent implements OnInit {
  isVisible = false;
  validateForm: FormGroup;
  public accountInfo: any;
  public accountList: any;
  public currentPage = 1;
  public withdrawList: any;
  public withdrawcurrentPage = 1;
  public coupon: any;
  public selected = 0;

  constructor(
    private fb: FormBuilder,
    public httpService: HttpService,
    private modalService: NzModalService,
    private message: NzMessageService,
    private router: Router,
  ) {
  }

  public changeSelect(num) {
    this.selected = num;
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      accountType: ['alipay', [Validators.required]],
      account: [null, [Validators.required]],
      realName: [null, [Validators.required]],
      bankName: [null]
    });
    this.getAccountInfo();
    this.getAccountList();
    this.getWithdrawList();
  }

  public async getAccountList() {
    const data = {
      size: 10,
      current: this.currentPage
    };
    const res = await this.httpService.getAccountList(data);
    if (res.code === 200) {
      this.accountList = res.data;
    }
  }

  public typeChange() {
    if (this.validateForm.value.accountType === 'bank_card') {
      this.validateForm.setControl('bankName', new FormControl('', Validators.required));
    } else {
      this.validateForm.setControl('bankName', new FormControl(''));
    }
  }

  public withdraw() {
    if (this.validateForm.invalid) {
      return;
    }
    this.modalService.confirm({
      nzTitle: '是否将您当前的账户余额全部提现？',
      nzContent: '',
      nzOnOk: () => {
        if (this.accountInfo.balance === 0) {
          return this.message.create('error', '当前账户余额不支持提现');
        }
        const data: any = {
          amount: this.accountInfo.balance,
        };
        Object.assign(data, this.validateForm.value);
        this.httpService.withdraw(data).then((res: any) => {
          if (res.code === 200) {
            this.message.create('success', '申请提现成功。');
            this.getAccountInfo();
            this.getAccountList();
            this.getWithdrawList();
            this.closeModal();
          } else {
            return this.message.create('error', res.message);
          }
        });
      }
    });
  }

  public showModal(): void {
    this.isVisible = true;
  }

  public closeModal(): void {
    this.isVisible = false;
    this.validateForm.reset();
  }

  public async getMyCoupon() {
    const res = await this.httpService.getCouponList();
    if (res.code === 200) {
      if (res.data.length) {
        this.coupon = res.data[0];
      }
    }
  }

  private async getAccountInfo() {
    const res = await this.httpService.getInfoOfMine();
    if (res.code === 200) {
      this.accountInfo = res.data;
    } else if (res.code === 401) {
      this.httpService.logout();
    }
  }

  private async getWithdrawList() {
    const data = {
      size: 10,
      current: this.withdrawcurrentPage
    };
    const res = await this.httpService.getWithdrawList(data);
    if (res.code === 200) {
      this.withdrawList = res.data;
    }
  }
}
