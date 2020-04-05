import { Component, OnInit, Input } from '@angular/core';
import { AapubsubService } from 'src/app/aservice/aapubsub.service';
import { AaloggingService } from 'src/app/aservice/aalogging.service';
import { AalocalstorageService } from 'src/app/aservice/aalocalstorage.service';

@Component({
  selector: 'app-view-msgstatus',
  template: `
  <nz-table #myTable [nzData]="tabledatas" [nzSize]="'small'" [nzScroll]="{ x: '1000px', y: '400px' }" nzBordered>
  <thead>
    <tr>
      <th nzWidth="50px" nzShowExpand></th>
      <th nzWidth="150px" nzLeft="50px">msg</th>
      <th nzWidth="200px">count</th>
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
export class ViewMsgstatusComponent implements OnInit {

  constructor(private pubsub:AapubsubService,private logging:AaloggingService,private localstore:AalocalstorageService) { }

  @Input() myname = "right";
  
  ngOnInit() {
    this.logging.debug("======================== "+this.constructor.name+"#myname="+this.myname);
    this.pubsub.sub(this.myname+".data",datas=>{//{"_type_":"server","host":"host-5","time":1586085636275,"cpu":5,"memory":10}
      let msg = datas["_type_"];
      let find = this.tabledatas.find(o=>o["msg"]==msg);
      if(find != null) { find["count"] = find["count"]+1; return; }
      let count = 1; 
      this.addtabledata(msg,count,datas);
    });

    this.tableInit();
  }

  //columns = ["type","table","count","insert"];

  tabledatas = [];
  mapOfExpandData: { [key: string]: boolean } = {};
  tableInit() {
    for (let i = 0; i < 3; i++) {
      let msg = "msg_"+i;
      this.addtabledata(msg,i,{host:"host-1",time:"2001",cpu:1,memory:11});
    }
  }

  addtabledata(msg,count,data)
  {
    this.tabledatas = this.tabledatas.concat({
      msg:msg,
      count: count,
      msgstring: JSON.stringify(data)
    });
}

  clickAction(msg){
    console.log("======= clickAction # "+ msg);
    let data = this.tabledatas.find(o=>o["msg"]==msg);
    this.pubsub.pub("hymon.config_tableschema.show",data);
  } 

}
