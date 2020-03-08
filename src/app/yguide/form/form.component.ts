import { Component, OnInit } from '@angular/core';
import { PubsubService } from 'src/app/aservice/pubsub.service';
import { LoggingService } from 'src/app/aservice/logging.service';
import { FormService } from 'src/app/aservice/form.service';
//import { NzCodeEditorService } from 'ng-zorro-antd/code-editor';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.less']
  ,providers: [FormService]
})
export class FormComponent implements OnInit {

  constructor(private form:FormService,private pubsub:PubsubService,private logging:LoggingService) { }

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
    this.test_data();
    // this.form.addControls(["host","ip"]);
    // this.form.setControlValue("host","host-1");
    // this.form.setControlValue("ip","ip-0");
  }
	
  ////////////////////////////////////////////////////////// testdata  
  test_data()
  {
    let datas = this.form.test_data();
    let data = datas[0];
    this.pubsub.pub("myform.data",data);
  }
  test_no = 0;
  test_columnadd() { 
    this.test_no++;
    let row = {name:"no-"+this.test_no,value:"val-"+this.test_no};
    this.pubsub.pub("myform.columnadd",row);
  }
}