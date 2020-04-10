import { Component, OnInit } from '@angular/core';
import { AapubsubService } from 'src/app/aservice/aapubsub.service';
import { AaloggingService } from 'src/app/aservice/aalogging.service';
import { AaformService } from 'src/app/aservice/aaform.service';
import { ColorUtil } from 'src/app/autil/ColorUtil';
//import { NzCodeEditorService } from 'ng-zorro-antd/code-editor';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.less']
  ,providers: [AaformService]
})
export class FormComponent implements OnInit {

  constructor(private form:AaformService,private pubsub:AapubsubService,private logging:AaloggingService) { }

  topicprefix = "myname.form";//this.topicprefix+".datas"

  ngOnInit() {
    //샘플 - pubsub form
    this.pubsub.sub(this.topicprefix+".datas",data=>{
      this.logging.debug("=== myname.form="+JSON.stringify(data))
      this.form.clearForm();
      this.form.addControls(Object.keys(data));//Object.keys(data).forEach(key=>{ this.form.addControl(key); });
      Object.keys(data).forEach(key=>{ this.form.setControlValue(key,data[key]); });
    });
    this.pubsub.sub(this.topicprefix+".data",row=>{//{name:col1,value:value1}
      this.logging.debug("=== myname.formrow="+JSON.stringify(row))
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
    this.test_data();
    // this.form.addControls(["host","ip"]);
    // this.form.setControlValue("host","host-1");
    // this.form.setControlValue("name","testname");
  }

  ////////////////////////////////////////////////////////// nz-tag 
  ////////////////////////////////////////////////////////// nz-tag
  values = [{name:"data",color:"lime"},{name:"array",color:"lime"},{name:"others",color:"lime"}];//red
  getValues() { return this.values; }
  clickValue(value) {//{name:data,color:"lime"}
    // this.tables = tables.map(table=>{ return {name:table,color:"lime"}} );
    if(value["color"]=="red") return;
    //ColorUtil.changeColor(value);
    ColorUtil.changeColorAll(this.values,"lime");
    ColorUtil.changeColorValue(value,"red"); 
  }

	
  ////////////////////////////////////////////////////////// testdata  
  test_data()
  {
    let datas = this.form.test_data();
    let data = datas[0];
    this.pubsub.pub(this.topicprefix+".datas",data);
  }
  test_no = 0;
  test_columnadd() { 
    this.test_no++;
    let row = {name:"no-"+this.test_no,value:"val-"+this.test_no};
    this.pubsub.pub(this.topicprefix+".data",row);
  }
}