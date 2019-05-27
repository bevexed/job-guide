import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { HttpService } from '../http.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-tixian-alipay',
  templateUrl: './tixian-alipay.component.html',
  styleUrls: ['./tixian-alipay.component.less']
})
export class TixianAlipayComponent implements OnInit {

  validateForm: FormGroup;
  public btn_clicked: boolean = false;
  public time: number = 60;
  public acount: number;

  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
    private modalService: NzModalService,
    public httpService: HttpService,
    private router: Router,
    private routeinfo: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      password: [null, [Validators.required, Validators.pattern('^[a-zA-Z0-9]{4,16}$')]],
      // checkPassword: [null, [Validators.required, this.confirmationValidator]],
      // nickname: [null, [Validators.required, Validators.pattern('^[a-zA-Z0-9]{4,16}$')]],
      phoneNumber: [null, [Validators.required, Validators.pattern('^[0-9]{11}$')]],
      // captcha: [null, [Validators.required]],
    });
    this.routeinfo.params.subscribe((params: Params) => {this.acount = params['acount']; });
    this.validateForm = this.fb.group({
      accountType: ['alipay', [Validators.required]],
      realName: [null, [Validators.required]],
      account: [null, [Validators.required]]
    });
  }

  public goBack() {
    history.go(-1);
  }
  public async tixianAlipay() {
    if (this.validateForm.invalid) {
      return;
    }
    // const data: any = {
    //   mobile: this.validateForm.value.phoneNumber,
    //   password: this.validateForm.value.password,
    // };
    // if (this.httpService.inviterId) {
    //   data.inviterId = this.httpService.inviterId;
    // }
    this.modalService.confirm({
      nzTitle: '是否将您当前的账户余额全部提现？',
      nzContent: '',
      nzOnOk: () => {
        const data: any = {
          amount: this.acount,
        };
        Object.assign(data, this.validateForm.value);
        this.httpService.withdraw(data).then((res: any) => {
          if (res.code === 200) {
            this.message.create('success', '申请提现成功。');
            // this.getAccountInfo();
            // this.getAccountList();
            // this.getWithdrawList();
            // this.closeModal();
          } else {
            return this.message.create('error', res.message);
          }
        });
      }
    });
    // const res = await this.httpService.register(data);
    // if (res.code === 200) {
    //   this.message.create('success', '提现成功');
    //   this.router.navigate(['../index']);
    // } else {
    //   this.message.create('error', res.message);
    // }
  }

}
