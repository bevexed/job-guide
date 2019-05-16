import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-carsouel',
  templateUrl: './carsouel.component.html',
  styleUrls: ['./carsouel.component.less']
})
export class CarsouelComponent implements OnInit {
  @Input() data: any[];

  constructor() { }

  ngOnInit() {
    console.log(this.data)
  }

}
