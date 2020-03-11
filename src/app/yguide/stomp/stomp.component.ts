import { Component, OnInit } from '@angular/core';
import { AaformService } from 'src/app/aservice/aaform.service';
import { AaloggingService } from 'src/app/aservice/aalogging.service';
import { ColorUtil } from 'src/app/autil/ColorUtil';
import { AastompService } from 'src/app/aservice/aastomp.service';

@Component({
  selector: 'app-stomp',
  templateUrl: './stomp.component.html',
  styleUrls: ['./stomp.component.less']
})
export class StompComponent implements OnInit {

  constructor(private logging:AaloggingService,private form:AaformService,private stomp:AastompService) { }

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
    });
  }

  ////////////////////////////////////////////////////////// nz-tag
  name = "testdatas";
  tags = [{name:"pub",color:"lime"},{name:"sub",color:"lime"}];//red
  getTags() { return this.tags; }

  clickTag(tag) {//{name:data,color:"lime"}
    if(tag["color"]=="red") return;
    ColorUtil.changeColorAll(this.tags,"lime");
    ColorUtil.changeColorValue(tag,"red");

  }
}
