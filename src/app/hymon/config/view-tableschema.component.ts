import { Component, OnInit, Input } from '@angular/core';
import { AapubsubService } from 'src/app/aservice/aapubsub.service';
import { AaloggingService } from 'src/app/aservice/aalogging.service';
import { AalocalstorageService } from 'src/app/aservice/aalocalstorage.service';
import { QueryUtil } from 'src/app/autil/QueryUtil';
import { AasqllocalService } from 'src/app/aservice/aasqllocal.service';
import { MSGUtil } from 'src/app/autil/MSGUtil';

@Component({
  selector: 'app-view-tableschema',
  template: `
  <nz-drawer nzTitle="Right" [nzWidth]="600" [nzClosable]="false" [nzVisible]="visible" [nzPlacement]="place" (nzOnClose)="close()">
    <nz-input-group nzCompact style="margin-bottom: 8px;">
      &nbsp;<input type="text" style="width: 100px" nz-input [(ngModel)]="msgname" [disabled]="true"/>
      &nbsp;<input type="text" style="width: 100px" nz-input [(ngModel)]="tablename" />
      &nbsp;<button nz-button (click)="createtable()">createtable</button>
    </nz-input-group>

    <app-atable [myname]="myname" [checkable]="false" [editable]="true"></app-atable>
  </nz-drawer>
  `,
  styles: []
})
export class ViewTableschemaComponent implements OnInit {

  constructor(private pubsub:AapubsubService,private logging:AaloggingService,private localstore:AalocalstorageService
    ,private sqllocal:AasqllocalService) { }

  @Input() myname = "right";

  msgname = "-";
  tablename = "-";
  tableschema = [];
  ngOnInit() {
    this.logging.debug("======================== "+this.constructor.name+"#myname="+this.myname);
    this.pubsub.sub(this.myname+".show",datas=>{// {type:,table:,count:,insert:];
      this.msgname = datas["msg"];
      this.tablename = datas["msg"];
      this.tableschema = MSGUtil.msgToTableColumn(datas["msgstring"]);
      // let json = JSON.parse(datas["msgstring"]);
      // Object.keys(json).forEach(key=>{
      //   let data = {column:key,type:"string",pk:"N",sample:json[key]};
      //   this.tabledatas = this.tabledatas.concat(data);
      // });
      this.pubsub.pub(this.myname+".tabledatas",this.tableschema);
      this.open();
    });
  }

  createtable()
  {
    this.logging.debug("======= createtable start # "+ this.tablename);

    let sql = QueryUtil.createtable_sql(this.tablename,this.tableschema);
    let rs = this.sqllocal.createtable(sql);
    if(rs > 0)
    {
      this.localstore.tablemapping_add(this.tablename,this.msgname,this.tableschema);
      this.pubsub.pub("hymon.config_tablestatus.refresh","refresh");
    } 
    this.logging.debug("======= createtable end # "+ this.tablename +"#rs="+ rs);

  }

  /////////////////////////////////////////////// drawer
  visible = false;
  place = "right";
  open(): void { this.visible = true; }
  close(): void { this.visible = false; }

}
