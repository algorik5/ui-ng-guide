import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';

@Component({
  selector: 'app-layout-input',
  templateUrl: './layout-input.component.html',
  styleUrls: ['./layout-input.component.less']
})
export class LayoutInputComponent implements OnInit,OnDestroy,OnChanges {

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



  ////////////////////////////////////////////////////////// checkbox
  msgtables = [
    { label: 'Apple', value: 'Apple', checked: true },
    { label: 'Pear', value: 'Pear', checked: false },
    { label: 'Orange', value: 'Orange', checked: false }
  ];
  msgtables_change(msgtables)//전체가 전달됨-의미없음
  {
    // this.logging.debug("msgtables_change==="+ JSON.stringify(msgtables));
  }

}
