import { Component, OnInit } from '@angular/core';
import { AapubsubService } from 'src/app/aservice/aapubsub.service';
import { AaloggingService } from 'src/app/aservice/aalogging.service';
import { AaformService } from 'src/app/aservice/aaform.service';

@Component({
  selector: 'app-form-readonly',
  templateUrl: './form-readonly.component.html',
  styleUrls: ['./form-readonly.component.less']
  ,providers: [AaformService]
})
export class FormReadonlyComponent implements OnInit {

  constructor(private form:AaformService,private pubsub:AapubsubService,private logging:AaloggingService) { }

  ngOnInit() {

    //pubsub-form 샘플
    this.pubsub.sub("myform-readonly.data",data=>{
      this.logging.debug("=== myform-readonly.data="+JSON.stringify(data))
      this.form.clearForm();
      this.form.addControls(Object.keys(data));//Object.keys(data).forEach(key=>{ this.form.addControl(key); });
      Object.keys(data).forEach(key=>{ this.form.setControlValue(key,data[key]); });
    });
    this.pubsub.sub("myform-readonly.columnadd",row=>{//{name:col1,value:value1}
      this.logging.debug("=== myform-readonly.columnadd="+JSON.stringify(row))
      //this.form.clearForm();
      this.form.addControl(row["name"]);
      this.form.setControlValue(row["name"],row["value"]);
    });

    this.formInit();
  }

  getFormgroup() { return this.form.getFormgroup(); }
  getFormColumns() { return this.form.getControlNames(); }
  getFormValue(name) { return this.form.getControlValue(name); }

  formSubmit()
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
    this.pubsub.pub("myform-readonly.data",data);
  }
  test_no = 0;
  test_columnadd() { 
    this.test_no++;
    let row = {name:"no-"+this.test_no,value:"val-"+this.test_no};
    this.pubsub.pub("myform-readonly.columnadd",row);
  }  
}