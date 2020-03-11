import { Component, OnInit } from '@angular/core';
import { AaloggingService } from 'src/app/aservice/aalogging.service';
import { AaformService } from 'src/app/aservice/aaform.service';

@Component({
  selector: 'app-form-static',
  templateUrl: './form-static.component.html',
  styleUrls: ['./form-static.component.less']
})
export class FormStaticComponent implements OnInit {

  constructor(private logging:AaloggingService,private form:AaformService) { }

  ngOnInit() {

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
    this.form.addControls(["name"]);
  }
}
