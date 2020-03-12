import { Component, OnInit } from '@angular/core';
import { AaloggingService } from 'src/app/aservice/aalogging.service';
import { AaformService } from 'src/app/aservice/aaform.service';
import { AastompService } from 'src/app/aservice/aastomp.service';
import { AacountmapService } from 'src/app/aservice/aacountmap.service';
import { AamapService } from 'src/app/aservice/aamap.service';
import { ColorUtil } from 'src/app/autil/ColorUtil';
import { AapubsubService } from 'src/app/aservice/aapubsub.service';
import { AajsonpathService } from 'src/app/aservice/aajsonpath.service';
import { ObjectUtil } from 'src/app/autil/ObjectUtil';
import { AajsonsearchService } from 'src/app/aservice/aajsonsearch.service';

@Component({
  selector: 'app-stompchart-form',
  templateUrl: './stompchart-form.component.html',
  styleUrls: ['./stompchart-form.component.less']
})
export class StompchartFormComponent implements OnInit {
  
  constructor(private logging:AaloggingService,private form:AaformService,private stomp:AastompService,private pubsub: AapubsubService
    ,private countmap:AacountmapService,private jsonpath: AajsonpathService,private jsonsearch:AajsonsearchService) { }

  topicprefix = "stompchart.stomp";//this.topicprefix+".datas"

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
      this.chartdataPub(res);//legend,x,y가 클릭되면 pub한다 
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
    this.jsonpathadd(msgtype["name"]);

    this.chartmsgtypePub(this.msgdatamap.get(this.curMsgtype));//jsonview로 포맷확인
  }

  /////////////////////////////// (추가)jsonpath
  jsonpathadd(msgtype) 
  {
    // this.logging.debug("============ jsonpathadd #msgtype="+msgtype);
    let msgdata = this.msgdatamap.get(msgtype);
    // this.logging.debug("============ jsonpathadd "+"#msgtype="+msgtype+"#msgdata="+msgdata);
    let jsonpathdata = this.jsonpath.getUniqueJsonPath(msgdata);
    this.logging.debug("============ jsonpathadd "+"#msgtype="+msgtype+"#jsonpathdata="+jsonpathdata);

    this.setChartColumns(jsonpathdata);
    // this.logging.debug("============ jsonpathadd #legends="+JSON.stringify(this.legends));
  }




  //////////////////////////////////// chart관련 - dynamicchart에서 복사
  legendColumns = []; xColumns = []; yColumns = [];
  curLegend; curX; curY;
  setChartColumns(columns)
  {
    if(columns == null || columns.length < 1) return;
    let colorColumns = ColorUtil.stringsToColorObject(columns,"lime");//color부여-//sql column은 color가 이미 부여됨(향후 변경)

    this.legendColumns = ObjectUtil.cloneObject(colorColumns);
    this.xColumns = ObjectUtil.cloneObject(colorColumns);
    this.yColumns = ObjectUtil.cloneObject(colorColumns);
  }
  getLegendColumns() { return this.legendColumns; }
  getXColumns() { return this.xColumns; }
  getYColumns() { return this.yColumns; }
  clickLegendColumn(column) { this.curLegend = column; ColorUtil.changeColorClick(this.legendColumns,"lime",column,"red"); this.changeSelect("legend",column); }
  clickXColumn(column) { this.curX = column; ColorUtil.changeColorClick(this.xColumns,"lime",column,"red"); this.changeSelect("x",column); }
  clickYColumn(column) { this.curY = column; ColorUtil.changeColorClick(this.yColumns,"lime",column,"red"); this.changeSelect("y",column); }

  changeSelectAll = false;
  changeSelect(type,column)
  {
    this.changeSelectAll = false;
    if(this.curLegend == null || this.curX == null || this.curY == null) return;
    if(this.curLegend == this.curX || this.curLegend == this.curY || this.curX == this.curY) return;
    
    this.changeSelectAll = true;
    this.chartclearPub();
    this.logging.debug("=== changeSelect # " +"#legend="+this.curLegend["name"]+"#x="+this.curX["name"]+"#y="+this.curY["name"])

    // let legend = this.curLegend["name"]; let x = this.curX["name"]; let y = this.curY["name"]; 
    // let sqldatas = this.sql.getDatas();
    // let chartdatas = sqldatas.map(data => { return {legend:data[legend],x:data[x],y:data[y]}; });
    // this.logging.debug("=== changeSelect 2 # " +"#chartdatas="+ JSON.stringify(chartdatas))
    // this.pubsub.pub(this.topicprefix+".datas", chartdatas);//"dynamicchart.datas"
  }
  chartmsgtypePub(data)
  {
    this.pubsub.pub(this.topicprefix+".jsonview",data);//선택변경되어 chart clear
  }
  chartclearPub()
  {
    this.pubsub.pub(this.topicprefix+".clear","clear-command");//선택변경되어 chart clear
  }
  chartdataPub(res) //legend,x,y가 클릭되면 pub한다 
  {
    if(this.changeSelectAll == false) return;
    if(res["_type_"] == null) return;
    if(res["_type_"] != this.curMsgtype) return;
    this.logging.debug("=== chartdataPub # " +"#changeSelectAll="+this.changeSelectAll+"#curMsgtype="+this.curMsgtype+"#_type_="+res["_type_"]);
    let legenddatas = this.jsonsearch.search(res,this.curLegend["name"]);
    let xdatas = this.jsonsearch.search(res,this.curX["name"]);
    let ydatas = this.jsonsearch.search(res,this.curY["name"]);
    if(legenddatas == null || legenddatas.length < 1) return;
    if(xdatas == null || xdatas.length < 1) return;
    if(ydatas == null || ydatas.length < 1) return;

    legenddatas.forEach((lgenddata,i)=>{
      this.pubsub.pub(this.topicprefix+".data",{legend:legenddatas[i],x:xdatas[i],y:ydatas[i]});//this.chart.addDatas(chartdatas);
    });
    // let legenddata = legenddatas[0];
    // let xdata = xdatas[0];
    // let ydata = ydatas[0];
  }
}
