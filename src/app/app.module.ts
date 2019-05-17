import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { IndexComponent } from './index/index.component';
import { CarsouelComponent } from './index/carsouel/carsouel.component';
import { VdItemModule } from './index/vd-item/vd-item.module';
import { DevelopmentComponent } from './development/development.component';
import { UsercenterComponent } from './usercenter/usercenter.component';
import { ProfessionComponent } from './profession/profession.component';
import { RegisterComponent } from './register/register.component';
import { PassComponent } from './pass/pass.component';
import { PassEditComponent } from './pass-edit/pass-edit.component';
import { HttpService } from './http.service';
import { IconModule } from '@ant-design/icons-angular';
import { VideoDetialComponent } from './video-detial/video-detial.component';
import { StoreModule } from '@ngrx/store';
import { counterReducer } from './store';
import { AuthService } from './auth.service';
import { ResultsComponent } from './results/results.component';
import { RewardComponent } from './reward/reward.component';
import { LoginComponent } from './login/login.component';

// li
import {HotComponent} from './hot/hot.component';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    CarsouelComponent,
    DevelopmentComponent,
    UsercenterComponent,
    ProfessionComponent,
    RegisterComponent,
    PassComponent,
    PassEditComponent,
    VideoDetialComponent,
    ResultsComponent,
    RewardComponent,
    LoginComponent,
    HotComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    VdItemModule,
    IconModule,
    StoreModule.forRoot({bannerlist: counterReducer})
    // environment.production? [] : HttpClientInMemoryWebApiModule.forRoot(
    //   InMemoryDataService, { dataEncapsulation: false }
    // )
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }, HttpService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
