import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzModalService,NzMessageService } from 'ng-zorro-antd';
import { HttpService } from '../http.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-tixian-bank-card',
  templateUrl: './tixian-bank-card.component.html',
  styleUrls: ['./tixian-bank-card.component.less', '../tixian-alipay/tixian-alipay.component.less']
})
export class TixianBankCardComponent implements OnInit {

  validateForm: FormGroup;
  public btn_clicked: boolean = false;
  public time: number = 60;
  private money: number;

  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
    public httpService: HttpService,
    private router: Router,
    private modalService: NzModalService,
    private routeinfo: ActivatedRoute
  ) {
    routeinfo.queryParams.subscribe(queryParams => {
      const money = queryParams.acount;
      this.money = money;
    });
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      // checkPassword: [null, [Validators.required, this.confirmationValidator]],
      realName: [null, [Validators.required, Validators.pattern('^[a-zA-Z0-9]{4,16}$')]],
      bankNumber: [null, [Validators.required, Validators.pattern('/^([1-9]{1})(\\d{14}|\\d{18})$/')]],
      bankName: [null, [Validators.required, Validators.pattern('^[a-zA-Z0-9]{4,16}$')]]
      // captcha: [null, [Validators.required]],
    });
    this.validateForm = this.fb.group({
      accountType: ['bank_card', [Validators.required]],
      realName: [null, [Validators.required]],
      bankNumber: [null, [Validators.required]],
      bankName: [null,[Validators.required]]
    });
  }

  public goBack() {
    history.go(-1);
  }


  public async tixianBankCard() {
    if (this.validateForm.invalid) {
      return;
    }
    this.modalService.confirm({
      nzTitle: '是否将您当前的账户余额全部提现？',
      nzContent: '',
      nzOnOk: () => {
        const data: any = {
          amount: this.money,
        };
        Object.assign(data, this.validateForm.value);
        this.httpService.withdraw(data).then((res: any) => {
          if (res.code === 200) {
            this.message.create('success', '申请提现成功。');
            this.router.navigate(['../index']);
          } else {
            return this.message.create('error', res.message);
          }
        });
      }
    });
  }

}
