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

@Component({
  selector: 'app-stompdbinsert-form',
  templateUrl: './stompdbinsert-form.component.html',
  styleUrls: ['./stompdbinsert-form.component.less']
})
export class StompdbinsertFormComponent implements OnInit {

  constructor(private logging:AaloggingService,private form:AaformService,private stomp:AastompService,private pubsub: AapubsubService
    ,private countmap:AacountmapService,private jsonpath: AajsonpathService,private jsonsearch:AajsonsearchService,private flatdata:AaflatdataService
    ,private sqllocal:AasqllocalService) { }

  topicprefix = "stompdbinsert.form";//this.topicprefix+".datas"

  ngOnInit() {

    // this.pubsub.sub(this.topicprefix+".data", data => {
    //   this.table.addData(data);
    // });

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

    this.initDbtables();
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

      /////////////////////////////// (추가)dbtable insert
      this.dbbtable_insert(res);
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
    let msgtypename = msgtype["name"];
    
    this.curMsgtype = msgtypename;
    ColorUtil.changeColorClick(this.getMsgtypes(),"lime",msgtype,"red");

    let msgdata = this.msgdatamap.get(msgtypename);
    this.tableschema_apply(msgtypename,msgdata);
    
    //debugjsonview
    this.pubsub.pub("stompdbinsert.debugjsonview.datas",msgdata);
  }



  /////////////////////////////// dbtable
  curDbtable = {};
  clickDbtable(dbtable) { 
    this.logging.debug("=== clickDbtable # " +"#table="+JSON.stringify(dbtable));
    this.curDbtable = dbtable; 
    ColorUtil.changeColorClick(this.dbtables,"lime",this.curDbtable,"red");
  }
  dbtables = [];
  initDbtables() 
  {
    this.pubsub.sub("stompdbinsert.tableschema.createtable", data => {
      let tables = this.sqllocal.dbtables();
      // console.log("=========sub stompdbinsert.tableschema.createtable createtable ="+ tables +"#array="+ Array.isArray(tables));
      this.dbtables = ArrayUtil.util_stringaddcolumnvalue(tables,"color","lime"); //[{name...color...}]
      console.log("=========sub stompdbinsert.tableschema.createtable createtable ="+ JSON.stringify(this.dbtables));
    });
  }
  dbbtable_insert(res)
  {
    if(res["_type_"] == null) return;
    let table = this.curDbtable["name"];
    if(res["_type_"] != table) return;
    this.logging.debug("=== dbbtable_insert # " +"#table="+this.curDbtable["name"]+"#_type_="+res["_type_"]);



    let dbdatas = [];
    let columns = this.sqllocal.getColumnNames(table);

    // /////////////////// pkpath
    // let columnfirst = columns[0]; columnfirst = StringUtil.replaceAll(columns[0],"__","/");
    // let pkpath = columns[0]["path"];//첫번째 path
    // let pkpatchsearchs = JsonPathUtil.searchObjects(datas,"//*[pk='Y']/path");//1.pk path
    // if(pkpatchsearchs != null && Object.keys(pkpatchsearchs).length>0) pkpath = pkpatchsearchs["path"];
    // else
    // {
    //   let data = datas.find(data=>data["path"].includes("[*]"));//2.array path
    //   if(data != null && Object.keys(data).length>0) pkpath = data["path"];
    //   LogUtil.debug("=== 2 #pkpath="+ JSON.stringify(pkpath));// +"#data="+JSON.stringify(data));
    // }
    // //////////////////// binding vaue
    // let editordata = JSON.parse(this.editordata);
    // let pkvalues = JsonPathUtil.searchObjects(editordata,pkpath);
    // LogUtil.debug("=== #pkpath="+ JSON.stringify(pkpath) +"#pkvalues="+ JSON.stringify(pkvalues));

    // let count = 0;
    // pkvalues.forEach((pk,pki)=>{
    //   let sqldata = {};
    //   let paths = datas.map(o=>o["path"]);
    //   paths.forEach((path,pathi)=>{
    //     let column = columns[pathi];
    //     let value = "";
    //     let searchs = JsonPathUtil.searchObjects(editordata,path);
    //     if(searchs!=null&&searchs.length>0)
    //     {
    //       if(path.includes("[*]")) value = searchs[pki];//array인 경우
    //       else value = searchs[0];//array아닌 경우
    //     }
    //     sqldata[column] = value;
    //   });
    //   console.log("\t #sql_insert sqldata=" + JSON.stringify(sqldata));
    //   count = count + this.dblocal.insert_pstmt(sql,sqldata);
    // });
    // this.jsonObject = "insert-"+ count;





    columns.forEach(column=>{
      column = StringUtil.replaceAll(column,"__","/");
      this.logging.debug("=== dbbtable_insert # " +"#column="+JSON.stringify(column));//+"#data="+data);
      let datas = this.jsonsearch.search(res,column);//여러건
      datas.forEach((data,i)=>{
        dbdatas.push
      });

    });
    this.logging.debug("=== dbbtable_insert END # " +"#table="+table+"#_type_="+res["_type_"]);
  }

  // getDbtables() { //사용안함 > 아래의 이슈때문에 ...
  //   ////html에서 함수를 연결해서 그런가? 호출횟수가 엄청 많구나...흠... 변경감지때문인가 ?
  //   //    임시땜빵 - length가 같으면 return 안함
  //   let tables = this.sqllocal.dbtables();
  //   if(tables.length == this.dbtables.length) return this.dbtables;
  //   console.log("=========getDbtables="+ tables);
  //   let newtables = ArrayUtil.util_stringaddcolumnvalue(tables,"color","lime"); //[{name...color...}]
  //   this.dbtables = newtables;
  //   return this.dbtables;
  // } 

  /////////////////////////////// tableschema
  tableschema_apply(msgtype,msgdata) 
  {
    // let jsonpathdata = this.jsonpath.getUniqueJsonPath(msgdata);
    // let table = this.jsonsearch.search(msgdata,"//_type_")[0];
    // let tableschemas = jsonpathdata.map(path=>{ 
    //   let column = StringUtil.replaceAll(path,"/","__"); column = StringUtil.replaceAll(column,".","_");
    //   let samplevalue = this.jsonsearch.search(msgdata,path)[0];
    //   return {path:path,table:table,column:column,pk:"N",samplevalue:samplevalue,checked:true};
    // });//"path","column","pk","samplevalue"


    let flatdatas = this.flatdata.objectToFlat(msgdata);//[{type:...,host:...}]
    let table = flatdatas[0]["_type_"];
    let tableschemas = Object.keys(flatdatas[0]).map(key=>{
      let value = flatdatas[0][key];
      return {path:"-",table:table,column:key,pk:"N",samplevalue:value,checked:true};
    });

    this.pubsub.pub("stompdbinsert.tableschema.datas",tableschemas);
    this.logging.debug("============ tableschema_apply "+"#msgtype="+msgtype+"#tableschemas="+tableschemas);
  }
}
