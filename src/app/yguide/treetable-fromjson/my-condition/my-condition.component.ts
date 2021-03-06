import { Component, OnInit } from '@angular/core';
import { AaformService } from 'src/app/aservice/aaform.service';
import { AapubsubService } from 'src/app/aservice/aapubsub.service';
import { AaloggingService } from 'src/app/aservice/aalogging.service';
import { AatreetableService } from 'src/app/aservice/aatreetable.service';
import { AajsonpathService } from 'src/app/aservice/aajsonpath.service';
import { ColorUtil } from 'src/app/autil/ColorUtil';

@Component({
  selector: 'app-my-condition',
  templateUrl: './my-condition.component.html',
  styleUrls: ['./my-condition.component.less']
})
export class MyConditionComponent implements OnInit {

  constructor(private form:AaformService,private pubsub:AapubsubService,private logging:AaloggingService
    ,private treetable: AatreetableService,private jsonpath:AajsonpathService) { }

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
  }

  usejsonpath = "Y";
  ////////////////////////////////////////////////////////// nz-tag
  name = "testdatas";
  values = [{name:"data",color:"lime"},{name:"datachild",color:"lime"},{name:"array",color:"lime"},{name:"others",color:"lime"}];//red
  getValues() { return this.values; }
  clickValue(value) {//{name:data,color:"lime"}
    if(value["color"]=="red") return;
    //ColorUtil.changeColor(value);
    ColorUtil.changeColorAll(this.values,"lime");
    ColorUtil.changeColorValue(value,"red"); 

    let data = {};
    if(value["name"]=="data") data = this.test_data;
    else if(value["name"]=="datachild") data = this.test_datachild;
    else if(value["name"]=="array") data = this.test_array;
    else if(value["name"]=="others") data = this.test_others;
    this.pubsub.pub("treetable-fromjson.editordata",data);

    
    let treedatas = null;
    if(this.usejsonpath=="Y")//jsonpath 사용하지 않는 경우 (path에 값 입력)
    {
      let jsonpathdata = this.jsonpath.convertJSONPath(data);
      treedatas = this.treetable.convertTreeTableData(jsonpathdata);
    }
    else//jsonpath 사용하지 않는 경우 (path에 값 -)
    {
      treedatas = this.treetable.convertTreeTableData(data);
    }

    this.pubsub.pub("treetable-fromjson.treetable",treedatas);
  }

  test_data = {a:"a1",b:"b1"};
  //test_datachild = {a:"a1",b:"b1",c:{ca:"ca1",cb:"cb1"}};
  //test_datachild = {a:"a1",b:"b1",c:{ca:"ca1",cb:"cb1"},d:{da:"da1",db:"db1"}};
  test_datachild = {a:"a1",b:"b1",
    c:{ca:"ca1",cb:"cb1",
      cc:{cca:"cca1",ccb:"ccb1"}},
    d:{da:"da1",db:"db1"}};
  //test_array = [{a:"a1",b:"b1"},{a:"a1",b:"b1"}];
  //test_array = [{a:"a1",b:"b1",c:{ca:"ca1",cb:"cb1"}},{d:"d2",e:"e1"}];
  test_array = [{a:"a1",b:"b1",
    c:{ca:"ca1",cb:"cb1"},
      cc:[{cca:"cca1",ccb:"ccb1"},{cca:"cca2",ccb:"ccb2"}]},
    {d:"d2",e:"e1"}];
  test_others = [{a:"a1",b:"b1",child:[{c:"c1"}]},{a:"a1",b:"b1"}];

}
