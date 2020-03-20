import { Component, OnInit } from '@angular/core';
import { AaformService } from 'src/app/aservice/aaform.service';
import { AaloggingService } from 'src/app/aservice/aalogging.service';
import { ColorUtil } from 'src/app/autil/ColorUtil';
import { AastompService } from 'src/app/aservice/aastomp.service';
import { AacountmapService } from 'src/app/aservice/aacountmap.service';
import { AamapService } from 'src/app/aservice/aamap.service';
import { AapubsubService } from 'src/app/aservice/aapubsub.service';
import { MSGUtil } from 'src/app/autil/MSGUtil';

@Component({
  selector: 'app-stomp',
  templateUrl: './stomp.component.html',
  styleUrls: ['./stomp.component.less']
})
export class StompComponent implements OnInit {

  constructor(private logging:AaloggingService,private form:AaformService,private stomp:AastompService,private pubsub: AapubsubService
    ,private countmap:AacountmapService) { }

  topicprefix = "myname.stomp";//this.topicprefix+".datas"

  ngOnInit() {

    this.formInit();

    // this.pubsub.sub(this.topicprefix+".data",data => {

    // });

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
    this.test_list_display();
    this.test_hello();
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

      this.pubsub.pub(this.topicprefix+".data",res);//this.chart.addDatas(chartdatas);
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






  ////////////////////////////////// test list
  test_list = [];
  test_list_add(data){ this.test_list = this.test_list.concat(data); }//주의-다른쓰레드에서 push는 안먹힘-this.test_list.push(data); }
  test_list_clear(){ this.test_list = []; }
  test_list_display()
  {
    //sub 샘플
    this.pubsub.sub(this.topicprefix+".data", data => {
      this.test_list_add("app]"+ JSON.stringify(data));

      //this.statmapadd("cpu",2); this.statmapadd("memory",3); this.statmapadd("disk",4);
      let msgtype = data["_type_"]; msgtype = MSGUtil.getTypeCompact(msgtype);
      if(msgtype.includes("GAP_DATA")) { 
        this.statmapadd("GAP.SRT",data["GAP"]["SRT"]);
        this.statmapadd("GAP.END",data["GAP"]["END"]);
        this.statmapadd("GAP.ERR",data["GAP"]["ERR"]);
      }
    });
  }

  /////////////////////////////// test hello
  test_hello()
  {
    this.form.addControlValue("hellopub",this.stomp.getPubTopic());
    this.form.addControlValue("hellosub",this.stomp.getSubTopic());
    this.form.addControlValue("hellosubstatus","stop");
  }
  clickHelloPub(){
    this.test_list_add(">>>>>>>>>>>>>>>>>>> clickHelloPub");
    let topic = this.form.getControlValue("hellopub");
    let msg = {name:"test1",value:"hello"};
    this.stomp.pub(topic,msg);
  }
  clickHelloSub(){
    let status = this.form.getControlValue("hellosubstatus");
    this.logging.debug("===clickHelloSub #status="+ status);
    if(status=="stop") { this.stomp.substop(); return; }

    let topic = this.form.getControlValue("hellosub");
    this.stomp.sub(topic,res=>{
      // this.logging.debug("==== hellosub msg # "+ JSON.stringify(res));
      this.test_list_add("hello]"+ JSON.stringify(res));
    });
  }
}
