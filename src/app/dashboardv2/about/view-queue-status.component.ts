import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-queue-status',
  template: `
  <!-- <h4>queue status</h4> -->
  <nz-table #basicTable [nzData]="tabledata" nzTitle="queue status">
    <thead>
      <tr> <th>Name</th> <th>Age</th> <th>Address</th></tr>
    </thead>
    <tbody>
      <tr *ngFor="let data of basicTable.data"> <td>{{ data.name }}</td> <td>{{ data.age }}</td> <td>{{ data.address }}</td> </tr>
    </tbody>
  </nz-table>
  `,
  styles: []
})
export class ViewQueueStatusComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  /////////////////////////////// table
  tabledata = [
    { key: '1', name: 'John Brown', age: 32, address: 'New York No. 1 Lake Park' },
    { key: '2', name: 'Jim Green', age: 42, address: 'London No. 1 Lake Park' },
    { key: '3', name: 'Joe Black', age: 32, address: 'Sidney No. 1 Lake Park' }
  ];

}
