import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IndexComponent} from './index/index.component';
import {DevelopmentComponent} from './development/development.component';
import {UsercenterComponent} from './usercenter/usercenter.component';
import {ProfessionComponent} from './profession/profession.component';
import {RegisterComponent} from './register/register.component';
import {PassComponent} from './pass/pass.component';
import {VideoDetialComponent} from './video-detial/video-detial.component';
import {AuthService} from './auth.service';
import {ResultsComponent} from './results/results.component';
import {RewardComponent} from './reward/reward.component';
import {LoginComponent} from './login/login.component';
import {TixianComponent} from './tixian/tixian.component';
import {TixianAlipayComponent} from './tixian-alipay/tixian-alipay.component';
import {TixianBankCardComponent} from './tixian-bank-card/tixian-bank-card.component';
import {ZixunComponent} from './zixun/zixun.component';
import {ZixunDetailComponent} from './zixun-detail/zixun-detail.component';
// li
// 热门
import {HotComponent} from './hot/hot.component';
import {GaokaoComponent} from './gaokao/gaokao.component';
import {GaokaoDetailComponent} from './gaokao-detail/gaokao-detail.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'profession'
  },
  {
    path: 'index',
    component: IndexComponent
  },
  {
    path: 'index/:inviterId',
    component: IndexComponent
  },
  {
    path: 'development',
    component: DevelopmentComponent
  },
  {
    path: 'profession',
    component: ProfessionComponent
  },
  {
    path: 'usercenter',
    component: UsercenterComponent,
    canActivate: [AuthService]
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'passport',
    component: PassComponent
  },
  {
    path: 'vd/:id',
    component: VideoDetialComponent
  },
  {
    path: 'results',
    component: ResultsComponent,
    canActivate: [AuthService]
  },
  {
    path: 'reward',
    component: RewardComponent
  },
  {
    path: 'tixian',
    component: TixianComponent
  },
  {
    path: 'tixianAlipay',
    component: TixianAlipayComponent
  },
  {
    path: 'tixianBank',
    component: TixianBankCardComponent
  },
  {
    path: 'zixun',
    component: ZixunComponent
  },
  // li
  {
    path: 'hot',
    component: HotComponent
  },
  {
    path: 'zixunDetail',
    component: ZixunDetailComponent
  },
  {
    path: 'gaokao',
    component: GaokaoComponent
  },
  {
    path: 'gaokao-detail',
    component: GaokaoDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
