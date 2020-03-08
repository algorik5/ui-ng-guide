import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { PubsubService } from 'src/app/aservice/pubsub.service';
import { LoggingService } from 'src/app/aservice/logging.service';
import { FormService } from 'src/app/aservice/form.service';

@Component({
  selector: 'app-dynamictable-detail',
  templateUrl: './dynamictable-detail.component.html',
  styleUrls: ['./dynamictable-detail.component.less']
})
export class DynamictableDetailComponent implements OnInit {

  constructor(private form:FormService,private pubsub:PubsubService,private logging:LoggingService) { }

  ngOnInit() {

    this.pubsub.sub("dynamictable.data",data=>{
      this.logging.debug("=== dynamictable.data="+JSON.stringify(data))

      this.form.clearForm();
      Object.keys(data).forEach(key=>{ this.form.addControl(key); });
      Object.keys(data).forEach(key=>{ this.form.setControlValue(key,data[key]); });
    });
  }

  getFormgroup() { return this.form.getFormgroup(); }
  getFormColumns() { return this.form.getControlNames(); }
  getFormValue(name) { return this.form.getControlValue(name); }

  formSubmit()
  {

  }
}