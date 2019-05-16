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

  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
    public httpService: HttpService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      password: [null, [Validators.required, Validators.pattern('^[a-zA-Z0-9]{4,16}$')]],
      // nickname: [null, [Validators.required, Validators.pattern('^[a-zA-Z0-9]{4,16}$')]],
      username: [null, [Validators.required, Validators.pattern('^[0-9]{11}$')]],
    });
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
