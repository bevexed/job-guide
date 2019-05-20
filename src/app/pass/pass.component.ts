import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../http.service';
import { NzMessageService } from 'ng-zorro-antd';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pass',
  templateUrl: './pass.component.html',
  styleUrls: ['./pass.component.less', '../usercenter/usercenter.component.less', '../register/register.component.less']
})
export class PassComponent implements OnInit {

  validateForm: FormGroup;
  public btn_clicked: boolean = false;
  public time: number = 60;

  constructor(
    private fb: FormBuilder,
    public httpService: HttpService,
    private message: NzMessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.httpService.tokenValidate();
    this.validateForm = this.fb.group({
      password: [null, [Validators.required, Validators.pattern('^[a-zA-Z0-9]{4,16}$')]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      mobile: [null, [Validators.required, Validators.pattern('^[0-9]{11}$')]],
      captcha: [null, [Validators.required]],
    });
  }

  public async submitForm() {
    if (this.validateForm.invalid) {
      return;
    }
    let data = Object.assign({}, this.validateForm.value);
    delete data.checkPassword;
    let res = await this.httpService.passportSubmit(data);
    if (res.code === 200) {
      this.message.create('success', '修改密码成功');
      // this.router.navigate(['../index'])
    } else {
      this.message.create('error', res.message);
    }
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  getBtnText() {
    if (!this.btn_clicked) {
      return '获取短信验证码';
    } else {
      return '倒计时'+ this.time +'s';
    }
  }

  public async getCaptcha() {
    let value = this.validateForm.get('mobile').value;
    if (!value) {
      return;
    }
    let res = await this.httpService.getPassportCaptcha(value);
    if (res.code === 200) {
      this.btn_clicked = true;
      let timer = setInterval(() => {
        if (this.time === 0) {
          this.btn_clicked = false;
          this.time = 60;
          clearInterval(timer);
        } else {
          this.time -= 1;
        }
      }, 1000)
      this.message.create('success', '验证码发送成功，请注意查收');
    } else {
      this.message.create('error', res.message);
    }
  }

}
