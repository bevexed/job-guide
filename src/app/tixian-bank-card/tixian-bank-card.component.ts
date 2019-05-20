import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';
import {composeAsyncValidators} from '@angular/forms/src/directives/shared';

@Component({
  selector: 'app-tixian-bank-card',
  templateUrl: './tixian-bank-card.component.html',
  styleUrls: ['./tixian-bank-card.component.less', '../tixian-alipay/tixian-alipay.component.less']
})
export class TixianBankCardComponent implements OnInit {

  validateForm: FormGroup;
  public btn_clicked: boolean = false;
  public time: number = 60;

  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
    public httpService: HttpService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      // checkPassword: [null, [Validators.required, this.confirmationValidator]],
      nickname: [null, [Validators.required, Validators.pattern('^[a-zA-Z0-9]{4,16}$')]],
      bankNumber: [null, [Validators.required, Validators.pattern('/^([1-9]{1})(\\d{14}|\\d{18})$/')]],
      bankName: [null, [Validators.required, Validators.pattern('^[a-zA-Z0-9]{4,16}$')]]
      // captcha: [null, [Validators.required]],
    });
  }

  public goBack() {
    history.go(-1);
  }
  public confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  }


  public async tixianBankCard() {
    if (this.validateForm.invalid) {
      return;
    }
    const data: any = {
      mobile: this.validateForm.value.bankNumber,
      // password: this.validateForm.value.password,
    };
    if (this.httpService.inviterId) {
      data.inviterId = this.httpService.inviterId;
    }
    // const res = await this.httpService.register(data);
    // if (res.code === 200) {
    //   this.message.create('success', '提现成功');
    //   this.router.navigate(['../index']);
    // } else {
    //   this.message.create('error', res.message);
    // }
  }

}
