import { Component, OnInit, Input } from '@angular/core';
import { AapubsubService } from 'src/app/aservice/aapubsub.service';
import { AaloggingService } from 'src/app/aservice/aalogging.service';
// 
// 

@Component({
  selector: 'app-view-center',
  template: `
<nz-table #myTable [nzData]="datas" [nzSize]="'small'" [nzScroll]="{ x: '1000px', y: '400px' }" nzBordered>
  <thead>
    <tr>
      <th nzWidth="50px" nzShowExpand></th>
      <th nzWidth="150px" nzLeft="50px">msg</th>
      <th nzWidth="200px">count</th>
      <th nzWidth="200px">table</th>
      <th>msgstring</th>
      <th nzWidth="100px" nzRight="0px">Action</th>
    </tr>
  </thead>
  <tbody>
    <ng-template ngFor let-data [ngForOf]="myTable.data">
      <tr>
        <td nzShowExpand [(nzExpand)]="mapOfExpandData[data.msg]"></td>
        <td nzLeft="50px">{{ data.msg }}</td>
        <td>{{ data.count }}</td>
        <td>{{ data.table }}</td>
        <td>{{ data.msgstring }}</td>
        <td nzRight="0px">
          <button nz-button nzType="link" (click)="clickAction(data.msg)">create table</button>
        </td>
      </tr>
      <tr [nzExpand]="mapOfExpandData[data.msg]">
        <td></td>
        <td colspan="5">{{ data.msgstring }}</td>
      </tr>
    </ng-template>
  </tbody>
</nz-table>
  `,
  styles: []
})
export class ViewCenterComponent implements OnInit {

  constructor(private pubsub:AapubsubService,private logging:AaloggingService) { }

  @Input() myname = "right";
  
  ngOnInit() {
    this.logging.debug("======================== "+this.constructor.name+"#myname="+this.myname);
    this.pubsub.sub(this.myname+".showright",datas=>{
      // this.open();
    });

    this.tableInit();
  }

  columns = ["type","table","count","insert"];

  datas = [];
  mapOfExpandData: { [key: string]: boolean } = {};
  tableInit() {
    for (let i = 0; i < 5; i++) {
      this.datas.push({
        msg:"msg-"+i,
        count: i,
        table: "table-"+i,
        msgstring: "{ host:host-1 ... }"
      });
    }
  }

  clickAction(id){
    console.log("======= clickAction # "+ id);
    this.pubsub.pub(this.myname+".showright","fire");
  } 
}
