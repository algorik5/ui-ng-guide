import { Component, OnInit } from '@angular/core';
import { PubsubService } from 'src/app/aservice/pubsub.service';
import { LoggingService } from 'src/app/aservice/logging.service';
import { FormService } from 'src/app/aservice/form.service';
//import { NzCodeEditorService } from 'ng-zorro-antd/code-editor';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.less']
})
export class FormComponent implements OnInit {

  constructor(private form:FormService,private pubsub:PubsubService,private logging:LoggingService) { }

  ngOnInit() {
    this.testdata();

    //샘플 - pubsub form
    this.pubsub.sub("xxx.data",data=>{
      this.logging.debug("=== xxx.data="+JSON.stringify(data))
      this.form.clearForm();
      this.form.addControls(Object.keys(data));//Object.keys(data).forEach(key=>{ this.form.addControl(key); });
      Object.keys(data).forEach(key=>{ this.form.setControlValue(key,data[key]); });
      });
  }

  getFormgroup() { return this.form.getFormgroup(); }//html에서 호출
  getFormColumns() { return this.form.getControlNames(); }//html에서 호출
  getFormValue(name) { return this.form.getControlValue(name); }//html에서 호출

  formSubmit()//html에서 호출
  {

  }


  testdata()
  {
    let data = this.form.test_data();

    this.form.clearForm();
    this.form.addControls(Object.keys(data));//Object.keys(data).forEach(key=>{ this.form.addControl(key); });
    Object.keys(data).forEach(key=>{ this.form.setControlValue(key,data[key]); });
  }
}