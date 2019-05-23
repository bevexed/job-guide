import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-gaokao-detail',
  templateUrl: './gaokao-detail.component.html',
  styleUrls: ['./gaokao-detail.component.less']
})
export class GaokaoDetailComponent implements OnInit {

  constructor(
    public router: Router
  ) {
  }

  ngOnInit() {
  }

}
