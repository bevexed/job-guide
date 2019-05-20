import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tixian-alipay',
  templateUrl: './tixian-alipay.component.html',
  styleUrls: ['./tixian-alipay.component.less']
})
export class TixianAlipayComponent implements OnInit {

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
      password: [null, [Validators.required, Validators.pattern('^[a-zA-Z0-9]{4,16}$')]],
      // checkPassword: [null, [Validators.required, this.confirmationValidator]],
      // nickname: [null, [Validators.required, Validators.pattern('^[a-zA-Z0-9]{4,16}$')]],
      phoneNumber: [null, [Validators.required, Validators.pattern('^[0-9]{11}$')]],
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

  getBtnText() {
    if (!this.btn_clicked) {
      return '获取验证码';
    } else {
      return '倒计时' + this.time + 's';
    }
  }

  public async getCaptcha(e: MouseEvent) {
    e.preventDefault();
    if (this.validateForm.get('phoneNumber').errors) {
      return this.message.create('error', '请输入正确的电话号码');
    }
    const res = await this.httpService.getCaptcha(this.validateForm.get('phoneNumber').value);
    if (res.code === 200) {
      this.btn_clicked = true;
      const timer = setInterval(() => {
        if (this.time === 0) {
          this.btn_clicked = false;
          this.time = 60;
          clearInterval(timer);
        } else {
          this.time -= 1;
        }
      }, 1000);
      this.message.create('success', '请注意查收验证码');
    } else {
      this.message.create('error', res.message);
    }
  }

  public async tixianAlipay() {
    if (this.validateForm.invalid) {
      return;
    }
    const data: any = {
      mobile: this.validateForm.value.phoneNumber,
      password: this.validateForm.value.password,
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
