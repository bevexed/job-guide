import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less', '../usercenter/usercenter.component.less']
})
export class LoginComponent implements OnInit {

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
      password: '123456',
      // nickname: [null, [Validators.required, Validators.pattern('^[a-zA-Z0-9]{4,16}$')]],
      username: [null, [Validators.required, Validators.pattern('^[0-9]{11}$')]],
      captcha: [null, [Validators.required]]
    });
  }

  public async getCaptcha(e: MouseEvent) {
    e.preventDefault();
    if (this.validateForm.get('username').errors) {
      return this.message.create('error', '请输入正确的电话号码');
    }
    let res = await this.httpService.getCaptcha(this.validateForm.get('username').value);
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
      }, 1000);
      this.message.create('success', '请注意查收验证码');
    } else {
      this.message.create('error', res.message);
    }
  }
  getBtnText() {
    if (!this.btn_clicked) {
      return '获取短信验证码';
    } else {
      return '倒计时'+ this.time +'s';
    }
  }

  public async login() {
    if (this.validateForm.valid) {
      let res = await this.httpService.login(this.validateForm.value);
      if (res.code === 200) {
        localStorage.setItem('userInfo', JSON.stringify(res.data));
        this.httpService.token = res.data.token;
        this.httpService.user = res.data.user;
        this.httpService.init();
        this.message.create('success', '登录成功');
        this.router.navigate(['../index']);
      } else {
        this.message.create('error', res.message);
      }
    }
  }

}
