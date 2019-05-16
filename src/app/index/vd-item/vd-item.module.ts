import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VditemComponent } from './vditem/vditem.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [VditemComponent],
  imports: [
    CommonModule,
    RouterModule,
    NgZorroAntdModule
  ],
  exports: [
    VditemComponent
  ]
})
export class VdItemModule { }
