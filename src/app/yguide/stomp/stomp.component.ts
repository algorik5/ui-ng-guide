import { Component, OnInit } from '@angular/core';
import { AaformService } from 'src/app/aservice/aaform.service';
import { AaloggingService } from 'src/app/aservice/aalogging.service';
import { ColorUtil } from 'src/app/autil/ColorUtil';

@Component({
  selector: 'app-stomp',
  templateUrl: './stomp.component.html',
  styleUrls: ['./stomp.component.less']
})
export class StompComponent implements OnInit {

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

  ////////////////////////////////////////////////////////// nz-tag
  name = "testdatas";
  tags = [{name:"pub",color:"lime"},{name:"sub",color:"lime"}];//red
  getTags() { return this.tags; }

  clickTag(tag) {//{name:data,color:"lime"}
    if(tag["color"]=="red") return;
    ColorUtil.changeColorAll(this.tags,"lime");
    ColorUtil.changeColorValue(tag,"red");

  }
}
