import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { DevelopmentComponent } from './development/development.component';
import { UsercenterComponent } from './usercenter/usercenter.component';
import { ProfessionComponent } from './profession/profession.component';
import { RegisterComponent } from './register/register.component';
import { PassComponent } from './pass/pass.component';
import { VideoDetialComponent } from './video-detial/video-detial.component';
import { AuthService } from './auth.service';
import { ResultsComponent } from './results/results.component';
import { RewardComponent } from './reward/reward.component';
import { LoginComponent } from './login/login.component';
import { TixianComponent } from './tixian/tixian.component';
import { TixianAlipayComponent } from './tixian-alipay/tixian-alipay.component';
import { TixianBankCardComponent } from './tixian-bank-card/tixian-bank-card.component';
// li
// 热门
import {HotComponent} from './hot/hot.component';
const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'index'
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

  // li
  {
    path: 'hot',
    component: HotComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
