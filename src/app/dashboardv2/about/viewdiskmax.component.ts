import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-viewdiskmax',
  template: `
  <nz-statistic [nzValue]="9.3 | number: '1.0-2'" [nzTitle]="'disk'" [nzPrefix]="prefixTplTwo" [nzSuffix]="'%'" [nzValueStyle]="{ color: '#3F8600' }" > </nz-statistic>
  <ng-template #prefixTplTwo><i nz-icon nzType="arrow-down"></i></ng-template>
  `,
  styles: []
})
export class ViewdiskmaxComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
