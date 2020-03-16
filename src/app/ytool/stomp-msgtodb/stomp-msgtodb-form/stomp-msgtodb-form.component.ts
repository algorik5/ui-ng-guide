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

      /////////////////////////////// (추가)msgtypes
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




  ////////////////////////////////////////////////////////// check
  // msgtables = [
  //   { label: 'Apple', value: 'Apple', checked: true },
  //   { label: 'Pear', value: 'Pear', checked: false },
  //   { label: 'Orange', value: 'Orange', checked: false }
  // ];
  // msgtables_change(msgtables)//전체가 옴
  // {
  //   this.logging.debug("msgtables_change==="+ JSON.stringify(msgtables));
  // }




  ////////////////////////////////////////////////////////// table
  getTableData() { return this.table.getData(); }
  getTableColumns() { return this.table.getColumns(); }
  isEditable() { return this.table.isEditable(); }
  setEditable(edit) { this.table.setEditable(edit); }
  selectRow(data) {
    console.log("====== selectRow data=" + JSON.stringify(data));
    // this.pubsub.pub(this.topicprefix+".selectdata", data);
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

}
