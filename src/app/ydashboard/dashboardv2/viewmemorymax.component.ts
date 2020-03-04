import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-viewmemorymax',
  template: `
  <nz-statistic [nzValue]="9.3 | number: '1.0-2'" [nzTitle]="'memory'" [nzPrefix]="prefixTplTwo" [nzSuffix]="'%'" [nzValueStyle]="{ color: '#CF1322' }" > </nz-statistic>
  <ng-template #prefixTplTwo><i nz-icon nzType="arrow-down"></i></ng-template>
  `,
  styles: []
})
export class ViewmemorymaxComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
