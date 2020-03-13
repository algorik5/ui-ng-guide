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

@Component({
  selector: 'app-stompdbinsert-form',
  templateUrl: './stompdbinsert-form.component.html',
  styleUrls: ['./stompdbinsert-form.component.less']
})
export class StompdbinsertFormComponent implements OnInit {

  constructor(private logging:AaloggingService,private form:AaformService,private stomp:AastompService,private pubsub: AapubsubService
    ,private countmap:AacountmapService,private jsonpath: AajsonpathService,private jsonsearch:AajsonsearchService) { }

  topicprefix = "stompdbinsert.stomp";//this.topicprefix+".datas"

  ngOnInit() {

    this.formInit();
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

    /////////////////////////////// test 
    // this.test_list_display();
    // this.test_hello();
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
      this.msgtypesadd(res);

      /////////////////////////////// (추가)chart관련
      // this.pubsub.pub(this.topicprefix+".data",res);//this.chart.addDatas(chartdatas);
      // this.chartdataPub(res);//legend,x,y가 클릭되면 pub한다 
    });
  }


  ////////////////////////////////////////////////////////// count
  countInit() { this.countadd("recv",0); }
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







  /////////////////////////////// (추가)msgtypes
  msgtypemap = new AamapService();
  msgdatamap = new AamapService();
  msgtypecountmap = new AacountmapService();
  //msgtypes = [];
  getMsgtypes() { return this.msgtypemap.valuesToArray(); }//{name:..,color:}
  msgtypesadd(data) {
      let msgtype = data["_type_"];
      this.msgtypecountmap.addCount(msgtype,1);
      if(this.msgtypemap.has(msgtype)==false) 
      {
        this.msgtypemap.set(msgtype,{name:msgtype,color:"lime"});
        this.msgdatamap.set(msgtype,data);
      }
  }
  curMsgtype;
  clickMsgtype(msgtype)
  {
    this.curMsgtype = msgtype["name"];
    ColorUtil.changeColorClick(this.getMsgtypes(),"lime",msgtype,"red");

    this.tableschema_apply(msgtype["name"]);
  }

  /////////////////////////////// tableschema
  tableschema_apply(msgtype) 
  {
    let msgdata = this.msgdatamap.get(msgtype);
    // this.logging.debug("============ tableschema_apply "+"#msgtype="+msgtype+"#msgdata="+msgdata);
    let jsonpathdata = this.jsonpath.getUniqueJsonPath(msgdata);
    // this.logging.debug("============ tableschema_apply "+"#msgtype="+msgtype+"#jsonpathdata="+jsonpathdata);
    let table = this.jsonsearch.search(msgdata,"//_type_")[0];
    let tableschemas = jsonpathdata.map(path=>{ 
      let column = StringUtil.replaceAll(path,"/","_"); column = StringUtil.replaceAll(column,".","_");
      let samplevalue = this.jsonsearch.search(msgdata,path)[0];
      return {path:path,table:table,column:column,pk:"N",samplevalue:samplevalue,checked:true};
    });//"path","column","pk","samplevalue"
    this.pubsub.pub("stompdbinsert.tableschema.datas",tableschemas);
    this.logging.debug("============ tableschema_apply "+"#msgtype="+msgtype+"#tableschemas="+tableschemas);
  }
}
