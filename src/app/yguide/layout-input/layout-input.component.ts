import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout-input',
  templateUrl: './layout-input.component.html',
  styleUrls: ['./layout-input.component.less']
})
export class LayoutInputComponent implements OnInit {

  constructor() { }

  ngOnInit() {
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
