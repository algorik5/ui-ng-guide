import { Component, OnInit, Input } from '@angular/core';
import { AapubsubService } from 'src/app/aservice/aapubsub.service';
import { AaloggingService } from 'src/app/aservice/aalogging.service';
import { AalocalstorageService } from 'src/app/aservice/aalocalstorage.service';
import { AasqllocalService } from 'src/app/aservice/aasqllocal.service';
import { QueryUtil } from 'src/app/autil/QueryUtil';

@Component({
  selector: 'app-view-tablestatus',
  template: `
  <nz-input-group nzCompact style="margin-bottom: 8px;">
  &nbsp;<input type="text" style="width: 100px" nz-input [(ngModel)]="msgname" [disabled]="true"/>
  &nbsp;<input type="text" style="width: 100px" nz-input [(ngModel)]="tablename" />
  &nbsp;<button nz-button (click)="createtable()">createtable</button>
</nz-input-group>

<app-atable [myname]="myname" [checkable]="false" [editable]="true"></app-atable>

  `,
  styles: []
})
export class ViewTablestatusComponent implements OnInit {

  constructor(private pubsub:AapubsubService,private logging:AaloggingService,private localstore:AalocalstorageService
    ,private sqllocal:AasqllocalService) { }

  @Input() myname = "right";

  msgname = "-";
  tablename = "-";
  tabledatas = [];
  ngOnInit() {
    this.logging.debug("======================== "+this.constructor.name+"#myname="+this.myname);
    this.pubsub.sub(this.myname+".tableschema",datas=>{// {type:,table:,count:,insert:];
      this.tabledatas = [];
      this.msgname = datas["msg"];
      this.tablename = datas["msg"];
      let json = JSON.parse(datas["msgstring"]);
      Object.keys(json).forEach(key=>{
        let data = {column:key,type:"string",pk:"N",sample:json[key]};
        this.tabledatas = this.tabledatas.concat(data);
      });
      this.pubsub.pub(this.myname+".tabledatas",this.tabledatas);
      this.open();
    });
  }

  createtable()
  {
    this.logging.debug("======= createtable start # "+ this.tablename);

    let sql = QueryUtil.createtable_sql(this.tablename,this.tabledatas);
    let rs = this.sqllocal.createtable(sql);
    if(rs > 0)
    {
      this.savelocalstorage();
      // this.pubsub.pub(this.topicprefix+".createtable",this.tablename);
    } 
    this.logging.debug("======= createtable end # "+ this.tablename +"#rs="+ rs);

  }

  savelocalstorage()
  {
    this.localstore.msgtablemapping_add(this.msgname,this.tablename);
    this.logging.debug("======= savelocalstorage end # "+ this.tablename +"#rs="+ this.localstore.msgtablemapping_get(this.msgname));
    // this.pubsub.pub("stompdbinsert.debugjsonview.localStorage","");
  }

  /////////////////////////////////////////////// drawer
  visible = false;
  place = "right";
  open(): void { this.visible = true; }
  close(): void { this.visible = false; }

}
