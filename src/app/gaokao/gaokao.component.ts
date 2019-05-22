import {Component, OnInit} from '@angular/core';

const Tabs = [
  '招考政策', '高校动态', '志愿指南'
];

@Component({
  selector: 'app-gaokao',
  templateUrl: './gaokao.component.html',
  styleUrls: ['./gaokao.component.less']
})

export class GaokaoComponent implements OnInit {

  public Tabs = Tabs;
  public activeTab = 0;

  constructor() {
  }

  public changeTab = tab => this.activeTab = tab;

  ngOnInit() {
  }

}