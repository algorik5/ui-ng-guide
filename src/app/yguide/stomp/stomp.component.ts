import { Component, OnInit } from '@angular/core';
import { AaformService } from 'src/app/aservice/aaform.service';
import { AaloggingService } from 'src/app/aservice/aalogging.service';
import { ColorUtil } from 'src/app/autil/ColorUtil';
import { AastompService } from 'src/app/aservice/aastomp.service';
import { AacountmapService } from 'src/app/aservice/aacountmap.service';
import { AamapService } from 'src/app/aservice/aamap.service';

@Component({
  selector: 'app-stomp',
  templateUrl: './stomp.component.html',
  styleUrls: ['./stomp.component.less']
})
export class StompComponent implements OnInit {

  constructor(private logging:AaloggingService,private form:AaformService,private stomp:AastompService,private countmap:AacountmapService) { }

  ngOnInit() {

    this.formInit();
    this.countInit();
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
    this.form.addControlValue("hellopub",this.stomp.getPubTopic());
    this.form.addControlValue("hellosub",this.stomp.getSubTopic());
    this.form.addControlValue("appsub",this.stomp.getSubTopicApp());
    this.form.addControlValue("hellosubstatus","stop");
    this.form.addControlValue("appsubstatus","stop");
  }

  clickHelloPub(){
    let topic = this.form.getControlValue("hellopub");
    let msg = {name:"test1",value:"hello"};
    this.stomp.pub(topic,msg);
  }
  recvmsgs = [];
  recvcount = 0;
  clearList(){ this.recvmsgs = []; this.recvcount = 0; }
  clickHelloSub(){
    let status = this.form.getControlValue("hellosubstatus");
    this.logging.debug("===clickHelloSub #status="+ status);
    if(status=="stop") { this.stomp.substop(); return; }

    let topic = this.form.getControlValue("hellosub");
    this.stomp.sub(topic,res=>{
      // this.logging.debug("==== hellosub msg # "+ JSON.stringify(res));
      this.recvcount++;
      this.recvmsgs.push("hello]"+res)//JSON.stringify(res));
    });
  }
  //appsubstatus = "stop";
  clickAppSub(){
    let status = this.form.getControlValue("appsubstatus");
    this.logging.debug("===clickAppSub #status="+ status);
    if(status=="stop") { this.stomp.substop(); return; }

    let topic = this.form.getControlValue("appsub");
    this.stomp.sub(topic,res=>{
      // this.logging.debug("==== appsub msg # "+ JSON.stringify(res));
      this.recvcount++;
      this.recvmsgs.push("app  ]"+JSON.stringify(res));


      this.countadd("recv",1);

      //this.statmapadd("cpu",2); this.statmapadd("memory",3); this.statmapadd("disk",4);
      if(res["_type_"]=="GAP_DATA") { 
        this.statmapadd("GAP.SRT",res["GAP"]["SRT"]);
        this.statmapadd("GAP.END",res["GAP"]["END"]);
        this.statmapadd("GAP.ERR",res["GAP"]["ERR"]);
      }
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
}
