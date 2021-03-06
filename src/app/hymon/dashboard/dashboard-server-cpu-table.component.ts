
import { Component, OnInit } from "@angular/core";
import { AapubsubService } from "src/app/aservice/aapubsub.service";
import { AatableService } from "src/app/aservice/aatable.service";
import { AaloggingService } from 'src/app/aservice/aalogging.service';
import { DateUtil } from 'src/app/autil/DateUtil';
import { MathUtil } from 'src/app/autil/MathUtil';
import { zTestDataUtil } from 'src/app/autil/zTestDataUtil';
import { ArrayUtil } from 'src/app/autil/ArrayUtil';

@Component({
  selector: 'app-dashboard-server-cpu-table',
  template: `
  <nz-table #myTable1 nzBordered [nzData]="getTableData()" nzSize="small">
  <thead>
    <tr>
      <ng-container *ngFor="let column of getTableColumns()">
        <th *ngIf="column.show">{{column["name"]}}</th>
      </ng-container>
    </tr>
  </thead>
  <tbody>
    <ng-container *ngFor="let data of myTable1.data">
      <tr>
        <ng-container *ngFor="let column of getTableColumns()">
          <td *ngIf="column.show">
            <ng-container *ngIf="!editable">{{data[column["name"]]}}</ng-container>
            <ng-container *ngIf="editable"> <input type="text" nz-input [(ngModel)]='data[column["name"]]'/></ng-container>
          </td>
        </ng-container>
      </tr>
    </ng-container>
  </tbody>
</nz-table>
  `,
  styles: []
  ,providers: [AatableService]
})
export class DashboardServerCpuTableComponent implements OnInit {

  constructor(private table: AatableService, private pubsub: AapubsubService,private logging:AaloggingService) {}

  topicprefix = "hymon.dashboard-server-cpu-table";//this.topicprefix+".datas"

  ngOnInit() {
    //pubsub-table 샘플
    this.pubsub.sub(this.topicprefix+".datas", datas => {
      this.table.setData(datas);//this.table.clearData(); this.table.addDatas(datas);
    });
    this.pubsub.sub(this.topicprefix+".data", data => {
      if(Array.isArray(data)) this.table.addDatas(data);
      else this.table.addData(data);
    });
    this.pubsub.sub(this.topicprefix+".clear", data => {
      this.table.clearColumns();
      this.table.clearData();
    });

    //pubsub-table 샘플 - 컬럼 show
    this.pubsub.sub(this.topicprefix+".columnshow", column => {
      this.table.changeColumnShow(column);
    });

    this.tableInit();
  }

  getTableData() { return this.table.getData(); }
  getTableColumns() { return this.table.getColumns(); }
  editable = false;
  selectRow(data) {
    // console.log("====== selectRow data=" + JSON.stringify(data));
    this.pubsub.pub(this.topicprefix+".selectdata", data);
  }
  tableInit()
  {
    ////////////////////////////////////////////////////////// edit  
    // this.table.setEditable(false);

    ////////////////////////////////////////////////////////// testdata  
    // this.test_datas();
  }
}
