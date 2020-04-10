import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.less']
})
export class LayoutComponent implements OnInit,OnDestroy,OnChanges {

  constructor() { }

  ngOnInit() {
    console.log("=============== ngOnInit    - "+ this.constructor.name );
  }
  ngOnDestroy() {
    console.log("=============== ngOnDestroy - "+ this.constructor.name );
  }
  ngOnChanges() {
    console.log("=============== ngOnChanges - "+ this.constructor.name );
  }

}
