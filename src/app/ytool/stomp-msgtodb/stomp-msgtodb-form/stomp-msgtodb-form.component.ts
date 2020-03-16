import { Component, OnInit } from '@angular/core';
import { AaloggingService } from 'src/app/aservice/aalogging.service';
import { AaformService } from 'src/app/aservice/aaform.service';
import { AastompService } from 'src/app/aservice/aastomp.service';
import { AapubsubService } from 'src/app/aservice/aapubsub.service';
import { AacountmapService } from 'src/app/aservice/aacountmap.service';
import { AajsonpathService } from 'src/app/aservice/aajsonpath.service';
import { AajsonsearchService } from 'src/app/aservice/aajsonsearch.service';
import { AamapService } from 'src/app/aservice/aamap.service';
import { ColorUtil } from 'src/app/autil/ColorUtil';
import { StringUtil } from 'src/app/autil/StringUtil';
import { AasqllocalService } from 'src/app/aservice/aasqllocal.service';
import { ArrayUtil } from 'src/app/autil/ArrayUtil';
import { AaflatdataService } from 'src/app/aservice/aaflatdata.service';
import { QueryUtil } from 'src/app/autil/QueryUtil';
import { AatableService } from 'src/app/aservice/aatable.service';
import { AalocalstorageService } from 'src/app/aservice/aalocalstorage.service';

@Component({
  selector: 'app-stomp-msgtodb-form',
  templateUrl: './stomp-msgtodb-form.component.html',
  styleUrls: ['./stomp-msgtodb-form.component.less']
  ,providers: [AatableService]
})
export class StompMsgtodbFormComponent implements OnInit {

  constructor(private logging:AaloggingService,private form:AaformService,private stomp:AastompService,private pubsub: AapubsubService
    ,private countmap:AacountmapService,private jsonpath: AajsonpathService,private jsonsearch:AajsonsearchService,private flatdata:AaflatdataService
    ,private sqllocal:AasqllocalService,private table: AatableService,private localstore:AalocalstorageService) { }

  topicprefix = "stompdbinsert.form";//this.topicprefix+".datas"

  ngOnInit() {

    // this.pubsub.sub(this.topicprefix+".data", data => {
    //   this.table.addData(data);
    // });

    this.formInit();
    ///////////////////////////////////////////////// table
    this.tableInit();
  }

  getFormgroup() { return this.form.getFormgroup(); }//html에서 호출
  getFormColumns() { return this.form.getControlNames(); }//html에서 호출
  getFormValue(name) { return this.form.getControlValue(name); }//html에서 호출

  formSubmit()//html에서 호출
  {
    let values = this.form.getControlValues();//[{name:x,value:x}...]
  }

  formInit()
  {
    this.countInit();
    this.stompsubInit();

  }

  /////////////////////////////// stompsub
  stompsubInit()
  {
    this.form.addControlValue("stompsub",this.stomp.getSubTopicApp());
    this.form.addControlValue("stompsubstatus","stop");
  }
  clickStompsub(){
    let status = this.form.getControlValue("stompsubstatus");
    this.logging.debug("===clickStompsub #status="+ status);
    if(status=="stop") { this.stomp.substop(); return; }

    let topic = this.form.getControlValue("stompsub");
    this.stomp.sub(topic,res=>{
      // this.logging.debug("==== stompsub msg # "+ JSON.stringify(res));

      this.countadd("recv",1);

      /////////////////////////////// pass시 insert/update
      this.msgtables_checked_pass(res);
    });
  }





  ////////////////////////////////////////////////////////// count
  countInit() { this.countadd("recv",0); this.countadd("insert",0); }
  countkeys() { return this.countmap.keysToArray(); }
  countvalue(key) { return this.countmap.getCount(key); }
  countadd(key,count) { this.countmap.addCount(key,count); }

  ////////////////////////////////////////////////////////// stat
  statmap = new AamapService();//cpu:{name:"cpu",value:"1.0",status:"warn"}
  statmapkeys() { return this.statmap.keysToArray(); }
  statmapvalue(key) { return this.statmap.get(key)["value"]; }
  statmapadd(key,value)
  {
    let status = "normal"; if(value >= 3) status = "warn"; if(value >= 4) status = "error";
    this.statmap.set(key,{key:key,value:value,status:status});
  }  
  statusIconName(key) { let status = this.statmap.get(key)["status"]; return ColorUtil.statusIconName(status); }
  statusIconColor(key){ let status = this.statmap.get(key)["status"]; return ColorUtil.statusIconColor(status); }





  ////////////////////////////////////////////////////////// table
  getTableData() { return this.table.getData(); }
  getTableColumns() { return this.table.getColumns(); }
  isEditable() { return this.table.isEditable(); }
  setEditable(edit) { this.table.setEditable(edit); }
  selectRow(data) {
    this.logging.debug("====== selectRow data=" + JSON.stringify(data));
    // this.pubsub.pub(this.topicprefix+".selectdata", data);
    this.msgtables_checked_add(data);
  }
  tableInit()
  {
    ////////////////////////////////////////////////////////// edit  
    this.table.setEditable(false);
    this.table.setColumns(["msg","table"]);
  }
  table_refresh()
  {
    this.table.clearData();

    let msgtablesstr = this.localstore.msgtablemapping_value();
    // this.logging.debug("table_refresh 1==="+ msgtablesstr);
    if(msgtablesstr.length<1) return;
    let msgtables = JSON.parse(msgtablesstr);
    this.logging.debug("table_refresh 2==="+ JSON.stringify(msgtables));
    msgtables.forEach(msgtable=>{
      let msg = msgtable["msg"];
      let tables = msgtable["tables"];
      tables.forEach(tablename=>{
        this.table.addData({msg:msg,table:tablename});
      });
    });
  }




  ////////////////////////////////////////////////////////// msg/table choose
  msgtables_checked = [];
  msgtables_checked_add(data)//{msg:..table:...checked:...}
  {
    if(data["checked"]==true) this.msgtables_checked = this.msgtables_checked.concat([data]);
    else this.msgtables_checked = this.msgtables_checked.filter(k=>!(k["msg"]==data["msg"] && k["table"]==data["table"]));

    this.logging.debug("====== msgtables_checked_add msgtables_checked=" + JSON.stringify(this.msgtables_checked));
  }
  msgtables_checked_pass(res) 
  {
    let msg = res["_type_"];

    /////////////////////////////// stats로 전달
    this.pubsub.pub("stomp-msgtodb.stats.msg",msg);

    let flatdatas = this.flatdata.objectToFlat(res);//[{type:...,host:...}]
    this.countadd("insert",flatdatas.length);
    let msgtables = this.msgtables_checked.filter(k=>k["msg"]==msg);
    msgtables.forEach(k=>{
      let table = k["table"];
      let columntypes = this.sqllocal.getColumns(table);
      if(this.sqllocal.hasPK(table))
      {
        let updatesql = QueryUtil.update_sql(table,columntypes);
        let rs = this.sqllocal.insert_pstmt(updatesql,flatdatas);
        if(rs < 1)
        {
          let insertsql = QueryUtil.insert_sql(table,columntypes);
          this.sqllocal.insert_pstmt(insertsql,flatdatas);
        }
      }
      else
      {
        let insertsql = QueryUtil.insert_sql(table,columntypes);
        this.sqllocal.insert_pstmt(insertsql,flatdatas);
      }
      /////////////////////////////// stats로 전달
      this.pubsub.pub("stomp-msgtodb.stats.table",table);
    });
  }
}

