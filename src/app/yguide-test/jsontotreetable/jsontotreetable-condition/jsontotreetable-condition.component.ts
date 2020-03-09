import { Component, OnInit } from '@angular/core';
import { AaformService } from 'src/app/aservice/aaform.service';
import { AapubsubService } from 'src/app/aservice/aapubsub.service';
import { AaloggingService } from 'src/app/aservice/aalogging.service';
import { ColorUtil } from 'src/app/autil/ColorUtil';

@Component({
  selector: 'app-jsontotreetable-condition',
  templateUrl: './jsontotreetable-condition.component.html',
  styleUrls: ['./jsontotreetable-condition.component.less']
})
export class JsontotreetableConditionComponent implements OnInit {

  constructor(private form:AaformService,private pubsub:AapubsubService,private logging:AaloggingService) { }

  ngOnInit() {
    //샘플 - pubsub form
    this.pubsub.sub("myform.data",data=>{
      this.logging.debug("=== myform.data="+JSON.stringify(data))
      this.form.clearForm();
      this.form.addControls(Object.keys(data));//Object.keys(data).forEach(key=>{ this.form.addControl(key); });
      Object.keys(data).forEach(key=>{ this.form.setControlValue(key,data[key]); });
    });
    this.pubsub.sub("myform.columnadd",row=>{//{name:col1,value:value1}
      this.logging.debug("=== myform.columnadd="+JSON.stringify(row))
      //this.form.clearForm();
      this.form.addControl(row["name"]);
      this.form.setControlValue(row["name"],row["value"]);
    });

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
    ////////////////////////////////////////////////////////// testdata  
    //this.test_data();
    // this.form.addControls(["host","ip"]);
    // this.form.setControlValue("host","host-1");
    // this.form.setControlValue("ip","ip-0");
  }
  
  ////////////////////////////////////////////////////////// nz-tag
  name = "testdatas";
  values = [{name:"data",color:"lime"},{name:"array",color:"lime"},{name:"others",color:"lime"}];//red
  getValues() { return this.values; }
  clickValue(value) {//{name:data,color:"lime"}
    if(value["color"]=="red") return;
    //ColorUtil.changeColor(value);
    ColorUtil.changeColorAll(this.values,"lime");
    ColorUtil.changeColorValue(value,"red"); 

    let data = {};
    if(value["name"]=="data") data = this.test_data;
    else if(value["name"]=="array") data = this.test_array;
    else if(value["name"]=="others") data = this.test_others;
    this.pubsub.pub("myeditor.data",data);

  }

  test_data = {a:"a1",b:"b1"};
  test_array = [{a:"a1",b:"b1"},{a:"a1",b:"b1"}];
  test_others = [{a:"a1",b:"b1",child:[{c:"c1"}]},{a:"a1",b:"b1"}];
}
