import { Component, OnInit } from '@angular/core';
// <th nzShowExpand></th>
// <td nzShowExpand [(nzExpand)]="mapOfExpandData[data.id]"></td>

@Component({
  selector: 'app-view-center',
  template: `
<nz-table #myTable [nzData]="listOfData" [nzSize]="'small'" [nzScroll]="{ x: '1150px', y: '240px' }">
  <thead>
    <tr>
      <th nzWidth="150px" nzLeft="0px">Full Name</th>
      <th nzWidth="100px" nzLeft="150px">Age</th>
      <th nzWidth="100px">Column 1</th>
      <th nzWidth="100px" nzRight="0px">Action</th>
    </tr>
  </thead>
  <tbody>
    <ng-template ngFor let-data [ngForOf]="myTable.data">
      <tr>
        <td nzLeft="0px">{{ data.name }}</td>
        <td nzLeft="150px">{{ data.age }}</td>
        <td>{{ data.address }}</td>
        <td nzRight="0px">
          <a>action</a>
        </td>
      </tr>
      <tr [nzExpand]="mapOfExpandData[data.id]">
        <td></td>
        <td colspan="3">{{ data.address }}</td>
      </tr>
    </ng-template>
  </tbody>
</nz-table>
  `,
  styles: []
})
export class ViewCenterComponent implements OnInit {

  constructor() { }

  listOfData = [];
  mapOfExpandData: { [key: string]: boolean } = {};
  ngOnInit() {
    for (let i = 0; i < 100; i++) {
      this.listOfData.push({
        id:"id-"+i,
        name: `Edward King ${i}`,
        age: 32,
        address: `London`
      });
    }
  }
}
