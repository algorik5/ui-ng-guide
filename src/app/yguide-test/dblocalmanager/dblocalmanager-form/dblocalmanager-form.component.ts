import { Component, OnInit } from '@angular/core';
import { AaformService } from 'src/app/aservice/aaform.service';
import { AapubsubService } from 'src/app/aservice/aapubsub.service';
import { AaloggingService } from 'src/app/aservice/aalogging.service';
import { ColorUtil } from 'src/app/autil/ColorUtil';
import { AasqllocalService } from 'src/app/aservice/aasqllocal.service';
import { ArrayUtil } from 'src/app/autil/ArrayUtil';

@Component({
  selector: 'app-dblocalmanager-form',
  templateUrl: './dblocalmanager-form.component.html',
  styleUrls: ['./dblocalmanager-form.component.less']
  ,providers: [AaformService]
})
export class DblocalmanagerFormComponent implements OnInit {

  constructor(private form:AaformService,private pubsub:AapubsubService,private logging:AaloggingService,private sqllocal:AasqllocalService) { }

  topicprefix = "myname.form";//this.topicprefix+".datas"

  ngOnInit() {
    //샘플 - pubsub form
    this.pubsub.sub(this.topicprefix+".datas",data=>{
      this.logging.debug("=== myname.form="+JSON.stringify(data))
      this.form.clearForm();
      this.form.addControls(Object.keys(data));//Object.keys(data).forEach(key=>{ this.form.addControl(key); });
      Object.keys(data).forEach(key=>{ this.form.setControlValue(key,data[key]); });
    });
    this.pubsub.sub(this.topicprefix+".data",row=>{//{name:col1,value:value1}
      this.logging.debug("=== myname.formrow="+JSON.stringify(row))
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
    this.form.addControls(["tables","sql"]);

    // this.form.addControls(["host","ip"]);
    // this.form.setControlValue("host","host-1");
    // this.form.setControlValue("ip","ip-0");
  }

  ////////////////////////////////////////////////////////// nz-tag 
  tables = [];
  clickRefresh() {
    let tables = this.sqllocal.dbtables();
    this.tables = tables.map(table=>{ return {name:table,color:"lime"}} );
  }
  ////////////////////////////////////////////////////////// nz-tag
  clickTable(table) {//{name:data,color:"lime"}
    if(table["color"]=="red") return;
    //ColorUtil.changeColor(value);
    ColorUtil.changeColorAll(this.tables,"lime");
    ColorUtil.changeColorValue(table,"red"); 

    let columns = this.sqllocal.getColumns(table["name"]);
    this.pubsub.pub("dblocalmanager.tableschema.datas",columns);

    this.form.setControlValue("sql","select * from "+ table["name"] +"\nwhere 1=1");
  }

  ////////////////////////////////////////////////////////// select
  clickSelect()
  {
    let sql = this.form.getControlValue("sql");
    let rs = this.sqllocal.select(sql);
  }

}
