import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AapubsubService } from 'src/app/aservice/aapubsub.service';
import { AaloggingService } from 'src/app/aservice/aalogging.service';
import { AaformService } from 'src/app/aservice/aaform.service';

@Component({
  selector: 'app-dynamictable-detail',
  templateUrl: './dynamictable-detail.component.html',
  styleUrls: ['./dynamictable-detail.component.less']
})
export class DynamictableDetailComponent implements OnInit {

  constructor(private form:AaformService,private pubsub:AapubsubService,private logging:AaloggingService) { }

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