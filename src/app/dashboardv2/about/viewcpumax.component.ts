import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-viewcpumax',
  template: `
  <nz-statistic [nzValue]="11.28 | number: '1.0-2'" [nzTitle]="'cpu'" [nzPrefix]="prefixTplOne" [nzSuffix]="'%'" [nzValueStyle]="{ color: '#3F8600' }"></nz-statistic>
  <ng-template #prefixTplOne><i nz-icon nzType="arrow-up"></i></ng-template>

  `,
  styles: []
})
export class ViewcpumaxComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
