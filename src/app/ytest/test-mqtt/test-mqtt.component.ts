import { Component, OnInit } from '@angular/core';
import { AaloggingService } from 'src/app/aservice/aalogging.service';
import { AaformService } from 'src/app/aservice/aaform.service';
import { AapubsubService } from 'src/app/aservice/aapubsub.service';

/* 
결론 - mqtt사용안함
=========== 참고 (mosquitto 실행-2중화 등은 ?)
mosquitto -v -p 10001
mosquitto_sub -h localhost -p 10001 -t test/# -v	<<< -d(debug)
mosquitto_pub -h localhost -p 10001 -t test/1 -m msg1	<<< -d(debug)
(참고-online test) online test : https://mitsuruog.github.io/what-mqtt/ 

=========================================에러(사용불가) - mqtt.js (browserMqtt.js) <<< 현재
import { connect } from 'mqtt';
const client = connect('wxs://localhost:10001');
=========================================에러(사용불가) - paho-mqtt (paho-mqtt.js) <<< 2년
npm install paho-mqtt
angular.json > "./node_modules/paho-mqtt/paho-mqtt-min.js"
(안됨) declare var Paho; declare var PahoMQTT;

=========================================테스트안함 - ngx-mqtt <<< 5개월(MQTT.js 내장)
npm install ngx-mqtt <<< 5개월(MQTT.js 내장)
*/


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
      console.log("=========== connect start # ");
      // console.log("=========== connect client # "+ client);
      console.log("=========== connect con # ");
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

  ////////////////////// test_data
  test_data_1 = {};
  test_data_2 = {};
}
