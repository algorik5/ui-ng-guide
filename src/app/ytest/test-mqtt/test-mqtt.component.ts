import { Component, OnInit } from '@angular/core';
import { AaloggingService } from 'src/app/aservice/aalogging.service';
import { AaformService } from 'src/app/aservice/aaform.service';
import { AapubsubService } from 'src/app/aservice/aapubsub.service';

@Component({
  selector: 'app-test-mqtt',
  templateUrl: './test-mqtt.component.html',
  styleUrls: ['./test-mqtt.component.less']
})
export class TestMqttComponent implements OnInit {

  constructor(private logging:AaloggingService,private form:AaformService,private pubsub: AapubsubService) { }

  topicprefix = "myname.mqtt";//this.topicprefix+".datas"

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





  ////////////////////////////////////////// test
  // test_types = ["dbinfoall"];
  test_init()
  {
    this.form.addControlValue("test_type","-");
    this.form.addControlValue("test_data","-");
  }
  test_type_click()
  {
    this.test_result = [];
    this.test_stat = "";

    let test_type = this.form.getControlValue("test_type");

    let test_data = this.test_data_init(test_type);
    this.form.setControlValue("test_data",test_data);

    this.test_stat_title = test_type;
    if(test_type == "pub") { 
    }
    else if(test_type == "sub") { 
    }
  }
  ////////////////////// test_data
  test_data_init(test_type)
  {
    let test_data = {};
    if(test_type == "pub") test_data = {topic:"test/100",msg:"msg-1"};
    else if(test_type == "sub") test_data = {topic:"test/#"};
    return test_data;
  }
  ////////////////////// test_stat
  test_stat_title = "-";
  test_stat = "-";
  test_stat_color() { return "lime"; }
  test_stat_icon() { return "up"; }
  ////////////////////// test_result
  test_result = [];
  test_result_clear() {}

  ////////////////////// test_data
  test_data_1 = {};
  test_data_2 = {};
}
