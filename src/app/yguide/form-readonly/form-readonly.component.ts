import { Component, OnInit } from '@angular/core';
import { PubsubService } from 'src/app/aservice/pubsub.service';
import { LoggingService } from 'src/app/aservice/logging.service';
import { FormService } from 'src/app/aservice/form.service';

@Component({
  selector: 'app-form-readonly',
  templateUrl: './form-readonly.component.html',
  styleUrls: ['./form-readonly.component.less']
})
export class FormReadonlyComponent implements OnInit {

  constructor(private form:FormService,private pubsub:PubsubService,private logging:LoggingService) { }

  ngOnInit() {

    this.testdata();

    //pubsub-form 샘플
    this.pubsub.sub("xxx.data",data=>{
      this.logging.debug("=== xxx.data="+JSON.stringify(data))
      this.form.clearForm();
      this.form.addControls(Object.keys(data));//Object.keys(data).forEach(key=>{ this.form.addControl(key); });
      Object.keys(data).forEach(key=>{ this.form.setControlValue(key,data[key]); });
    });
  }

  getFormgroup() { return this.form.getFormgroup(); }
  getFormColumns() { return this.form.getControlNames(); }
  getFormValue(name) { return this.form.getControlValue(name); }

  formSubmit()
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