import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AaloggingService } from './aalogging.service';
import { zTestDataUtil } from '../autil/zTestDataUtil';

////////////////////////////// usage (샘플 - dynamictable-detail)
//html - <form nz-form [formGroup]="getFormgroup()" (ngSubmit)="formSubmit()"> <ng-container *ngFor="let column of getFormColumns()"> <nz-form-item> ...
//ts 1 - constructor(private form:FormService (또는 new FormService)
//ts 2 - getFormgroup() { return this.form.getFormgroup(); }
//ts 3 - getFormColumns() { return this.form.getControlNames(); }
//form clear - this.form.clearForm(); 
//form add control - this.form.addControl(key); 
//form add value - this.form.setControlValue(key,data[key]);
//form get value - this.form.getControlValue(name);
//참고.NullInjectorError: No provider for FormBuilder - service에서 FormBuilder사용시 발생 >>> app.modules.ts > FormsModule,ReactiveFormsModule 

@Injectable({
  providedIn: 'root',
})
//@Injectable()
export class AaformService {

  constructor(private fb: FormBuilder,private logging:AaloggingService) { this.initForm(); }

  formgroup: FormGroup;
  initForm()
  {
    this.logging.debug("initForm");
    this.formgroup = this.fb.group({});
  }
  getFormgroup() { return this.formgroup; }
  clearForm()
  {
    this.logging.debug("clearForm");
    //안됨-이전control남아있음 - this.formgroup.reset();
    this.formgroup = this.fb.group({});
  }

  addControls(names:Array<string>) { names.forEach(name => { this.addControl(name); }); }
  addControl(name)
  {
    this.formgroup.addControl(name,new FormControl(null,Validators.required));
  }
  addControlValue(name,value)
  {
    this.formgroup.addControl(name,new FormControl(null,Validators.required));
    this.formgroup.controls[name].setValue(value);
  }
  setControlValue(name,value)
  {
    this.formgroup.controls[name].setValue(value);
  }
  getControlValue(name)
  {
    return this.formgroup.controls[name].value;
  }

  getControlNames()
  {
    //if(this.formgroup == null) return [];
    //if(this.formgroup.controls == null) return [];
    return Object.keys(this.formgroup.controls);
  }
  getControlValues()
  {
    let names = this.getControlNames();
    let values = [];//[{name:x,value:x}]
    names.forEach(name=>{ values.push({name:name,value:this.getControlValue(name)}); });
    return values;
  }


  //////////////// test data
  testmode = true;
  test_data()
  {
    if(this.testmode == false) return;
    let datas = zTestDataUtil.test_data();
    return datas;
  }
  test_data_row()
  {
    // let data = datas[0];//{id:"id-1",name:"name-1"};
    // if(datas.length%3==1) [1].forEach(no=>data["no-"+no] = no);
    // if(datas.length%3==2) [1,2].forEach(no=>data["no-"+no] = no);
    // return data;
  }
}
