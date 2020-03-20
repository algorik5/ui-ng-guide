import { Component, OnInit } from '@angular/core';
import { AaloggingService } from 'src/app/aservice/aalogging.service';
import { AaformService } from 'src/app/aservice/aaform.service';
import { AapubsubService } from 'src/app/aservice/aapubsub.service';

import ResClient from 'resclient';

@Component({
  selector: 'app-test-websocket',
  templateUrl: './test-websocket.component.html',
  styleUrls: ['./test-websocket.component.less']
})
export class TestWebsocketComponent implements OnInit {

  constructor(private logging:AaloggingService,private form:AaformService,private pubsub: AapubsubService) { }

  topicprefix = "myname.websocket";//this.topicprefix+".datas"

  ngOnInit() {

    this.pubsub.sub(this.topicprefix+".datas",data => {
    });
    this.pubsub.sub(this.topicprefix+".data",data => {
    });

    ////////////////////////////////////////// form
    this.formInit();

    ////////////////////////////////// test
    this.test_init();
  }

  ////////////////////////////////////////// form
  getFormgroup() { return this.form.getFormgroup(); }//html에서 호출
  getFormColumns() { return this.form.getControlNames(); }//html에서 호출
  getFormValue(name) { return this.form.getControlValue(name); }//html에서 호출
  formSubmit()//html에서 호출
  {
    let values = this.form.getControlValues();//[{name:x,value:x}...]
  }
  formInit()
  {
  }





  // test_types = ["dbinfoall"];
  test_init()
  {
    this.form.addControlValue("test_type","-");
    this.form.addControlValue("test_data","-");
  }

  ws_url = "ws://localhost:14223";
  client:ResClient;
  createClient()
  {
    if(this.client == null)
    {
      this.logging.debug("#################### ResClient start # "+ this.ws_url);
      this.client = new ResClient(this.ws_url);
      this.logging.debug("#################### ResClient client # "+ this.client.getHostUrl());
      // this.client.on((event,handler)=>{//connect,disconnect,error
      //   this.logging.debug("\t === on # ");//+event +":"+ handler);
      // });
    }
  }

  test_pub()
  {
    // this.createClient();
    // this.client.get("test.1").then(model => {
    //   this.logging.debug("=== (get) MSG # "+JSON.stringify(model));
    //   model.on("change",()=>{
    //     this.logging.debug("\t === (change) MSG # "+JSON.stringify(model));
    //   });
    // }).catch(err => {
    //   this.logging.debug("### error # "+JSON.stringify(err));
    // });
  }
  test_sub() 
  {
    this.createClient();
    this.client.get("test.1").then(model => {
      this.logging.debug("=== (get) MSG # "+JSON.stringify(model));
      model.on("change",()=>{
        this.logging.debug("\t === (change) MSG # "+JSON.stringify(model));
      });
    }).catch(err => {
      this.logging.debug("### error # "+JSON.stringify(err));
    });
  }

  //   this.test_result = [];
  //   this.test_stat = "";

  //   let test_type = this.form.getControlValue("test_type");

  //   let test_data = this.test_data_init(test_type);
  //   this.form.setControlValue("test_data",test_data);

  //   this.test_stat_title = test_type;
  //   if(test_type == "pub") {
  //     this.client.get("test.1").then(model => {
  //       this.logging.debug("\t === MSG # "+JSON.stringify(model));
  //     }).catch(err => {
  //       this.logging.debug("### error # "+JSON.stringify(err));
  //     });
  //   }
  //   else if(test_type == "sub") { 
  //   }
  // }
  
  ////////////////////// test_data
  test_data_init(test_type)
  {
    let test_data = {};
    if(test_type == "pub") test_data = {topic:"test/100",msg:"msg-1"};
    else if(test_type == "sub") test_data = {topic:"test/#"};
    return JSON.stringify(test_data);
  }
  ////////////////////// test_stat
  test_stat_title = "-";
  test_stat = "-";
  test_stat_color() { return "lime"; }
  test_stat_icon() { return "up"; }
  ////////////////////// test_result
  test_result = [];
  test_result_clear() {}

}
