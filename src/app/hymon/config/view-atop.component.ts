import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-atop',
  template: `
  <nz-input-group [nzSize]="'medium'">
   <div nz-col nzSpan="1"> <i nz-icon [nzType]="'arrow-left'" (click)="leftClick()"></i> </div>
   <div nz-col nzSpan="1"> <nz-divider nzType="vertical"></nz-divider> </div>

    
    <div nz-col nzSpan="7"> <input type="text" nz-input [(ngModel)]="inputValue" /> </div>
    <div nz-col nzSpan="7"> <button nz-button nzType="dashed" (click)="savelocalstorage()">savelocalstorage</button> </div>
    <div nz-col nzSpan="6"> aaa </div>

    <div nz-col nzSpan="1"> <nz-divider nzType="vertical"></nz-divider> </div>
    <div nz-col nzSpan="1"> <i nz-icon [nzType]="'arrow-right'" (click)="rightClick()"></i> </div>
  </nz-input-group>
  `,
  styles: []
})
export class ViewAtopComponent implements OnInit {
  // <nz-divider nzType="vertical"></nz-divider>

  constructor() { }

  ngOnInit() {
  }
  
  buttonStatus = "-";
  inputValue = "--";

  leftClick() {}
  rightClick() {}

}
