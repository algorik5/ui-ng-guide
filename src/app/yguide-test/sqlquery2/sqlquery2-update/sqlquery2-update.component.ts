import { Component, OnInit } from '@angular/core';
import { AaformService } from 'src/app/aservice/aaform.service';
import { AapubsubService } from 'src/app/aservice/aapubsub.service';
import { AaloggingService } from 'src/app/aservice/aalogging.service';
import { AasqlService } from 'src/app/aservice/aasql.service';

@Component({
  selector: 'app-sqlquery2-update',
  templateUrl: './sqlquery2-update.component.html',
  styleUrls: ['./sqlquery2-update.component.less']
  ,providers: [AaformService]
})
export class Sqlquery2UpdateComponent implements OnInit {

  constructor(private form:AaformService,private pubsub:AapubsubService,private logging:AaloggingService,private sql:AasqlService) { }

  ngOnInit() {
    //샘플 - pubsub form
    this.pubsub.sub("sqlquery2.dataselect",data=>{
      this.logging.debug("=== sqlquery2.data="+JSON.stringify(data))
      this.form.clearForm();
      this.form.addControls(Object.keys(data));//Object.keys(data).forEach(key=>{ this.form.addControl(key); });
      Object.keys(data).forEach(key=>{ this.form.setControlValue(key,data[key]); });
    });
    // this.pubsub.sub("sqlquery2.columnadd",row=>{//{name:col1,value:value1}
    //   this.logging.debug("=== sqlquery2.columnadd="+JSON.stringify(row))
    //   //this.form.clearForm();
    //   this.form.addControl(row["name"]);
    //   this.form.setControlValue(row["name"],row["value"]);
    // });

    this.formInit();
  }

  getFormgroup() { return this.form.getFormgroup(); }//html에서 호출
  getFormColumns() { return this.form.getControlNames(); }//html에서 호출
  getFormValue(name) { return this.form.getControlValue(name); }//html에서 호출

  formSubmit()//html에서 호출
  {
    let values = this.form.getControlValues();//[{name:x,value:x}...]
    let query = "update server set "
      +"\n cpu='"+this.form.getControlValue("cpu")+"'"
      +"\n ,memory='"+this.form.getControlValue("memory")+"'"
      +"\n where 1=1"
      +"\n and   host='"+this.form.getControlValue("host")+"'"
      ;

    let rs = this.sql.update(query,res=>{ this.logging.debug("update res="+res); });
    //this.pubsub.pub("sqlquery2.datas",sqldatas);
  }

  formInit()
  {
    ////////////////////////////////////////////////////////// testdata  
    //this.test_data();
    // this.form.addControls(["host","ip"]);
    // this.form.setControlValue("host","host-1");
    // this.form.setControlValue("ip","ip-0");
  }
	
  ////////////////////////////////////////////////////////// testdata  
  test_data()
  {
    let datas = this.form.test_data();
    let data = datas[0];
    this.pubsub.pub("sqlquery2.data",data);
  }
  test_no = 0;
  test_columnadd() { 
    this.test_no++;
    let row = {name:"no-"+this.test_no,value:"val-"+this.test_no};
    this.pubsub.pub("sqlquery2.columnadd",row);
  }
}
