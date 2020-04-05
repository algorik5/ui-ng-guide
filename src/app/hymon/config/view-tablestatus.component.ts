import { Component, OnInit, Input } from '@angular/core';
import { AapubsubService } from 'src/app/aservice/aapubsub.service';
import { AaloggingService } from 'src/app/aservice/aalogging.service';
import { AalocalstorageService } from 'src/app/aservice/aalocalstorage.service';
import { AasqllocalService } from 'src/app/aservice/aasqllocal.service';
import { QueryUtil } from 'src/app/autil/QueryUtil';
import { MSGUtil } from 'src/app/autil/MSGUtil';

@Component({
  selector: 'app-view-tablestatus',
  template: `
  <nz-input-group nzCompact style="margin-bottom: 8px;">
  &nbsp;<button nz-button (click)="refresh()">refresh</button>
  &nbsp;<button nz-button (click)="clear()">clear</button>
  &nbsp;<button nz-button (click)="createtable()">createtable</button>
</nz-input-group>

<app-atable [myname]="myname" [checkable]="false" [editable]="false"></app-atable>

  `,
  styles: []
})
export class ViewTablestatusComponent implements OnInit {

  constructor(private pubsub:AapubsubService,private logging:AaloggingService,private localstore:AalocalstorageService
    ,private sqllocal:AasqllocalService) { }

  @Input() myname = "right";

  ngOnInit() {
    this.logging.debug("======================== "+this.constructor.name+"#myname="+this.myname);
    this.pubsub.sub(this.myname+".refresh",datas=>{// {type:,table:,count:,insert:];
      this.logging.debug("============sub "+this.constructor.name+"#myname="+this.myname);
      this.refresh();
    });
  }

  refresh()
  {
    this.logging.debug("======= refresh start # "+ this.myname);
    this.pubsub.pub(this.myname+".tableclear","clear");

    let json = this.localstore.tablemapping_value();
    if(json == null || json.length < 1) return;
    json = json.map(v=>{ 
      v["exist"] = this.sqllocal.hasTable(v["table"]);
      v["count"] = this.sqllocal.select_count(v["table"]);
      return v;
    });
    this.logging.debug("======= refresh localstorage # "+ JSON.stringify(json));
    this.pubsub.pub(this.myname+".tabledatas",json);
    // let sql = QueryUtil.createtable_sql(this.tablename,this.tabledatas);
    // let rs = this.sqllocal.createtable(sql); 
    // if(rs > 0)
    // {
    //   this.savelocalstorage();
    //   // this.pubsub.pub(this.topicprefix+".createtable",this.tablename);
    // } 
    // this.logging.debug("======= createtable end # "+ this.tablename +"#rs="+ rs);

  }
  clear()
  {
    //db table도 삭제
    let json = this.localstore.tablemapping_value();
    if(json != null && json.length > 0)
    {
      json = json.forEach(v=>{ 
        this.sqllocal.droptable(v["table"]);
      });
    }

    this.localstore.tablemapping_clear();
    this.refresh();
  }

  createtable()
  {
    let json = this.localstore.tablemapping_value();
    if(json != null && json.length > 0)
    {
      json = json.forEach(v=>{ 
        let table = v["table"];
        let tableschema = v["tableschema"];
        let sql = QueryUtil.createtable_sql(table,tableschema);
        this.sqllocal.createtable(sql);
      });
    }
    this.refresh();
  }

}
