import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AapubsubService } from 'src/app/aservice/aapubsub.service';
import { AaloggingService } from 'src/app/aservice/aalogging.service';
import { AaformService } from 'src/app/aservice/aaform.service';
import { AasqlService } from 'src/app/aservice/aasql.service';
import { JSONUtil } from 'src/app/autil/JSONUtil';

@Component({
  selector: 'app-dynamictable-detail',
  templateUrl: './dynamictable-detail.component.html',
  styleUrls: ['./dynamictable-detail.component.less']
})
export class DynamictableDetailComponent implements OnInit {

  constructor(private form:AaformService,private pubsub:AapubsubService,private logging:AaloggingService,private sql:AasqlService) { }

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
    this.test_update();
  }

  test_update()
  {
    this.logging.debug("======== test_update start #");//+ JSONUtil.stringify(this.form.getControlValues()));
    ///////////////////////// 그냥 샘플
    let setstr = null;
    let values = this.form.getControlValues();//[{name...value}...]
    values.forEach((v,i)=>{
      if(["checked","HOST","TIME"].includes(v["name"])) return;
      if(setstr == null) setstr = v["name"] +"='"+ v["value"]+"'";
      else setstr = setstr +","+ v["name"] +"='"+ v["value"]+"'";
    });

    let wherestr = "HOST='"+ this.form.getControlValue("HOST") +"'"
      +"and TIME='"+ this.form.getControlValue("TIME") +"'";

    let sql = "update server"
    +" set "+ setstr
    +" where "+ wherestr;

    this.logging.debug("======== test_update sql="+sql);
    this.sql.update(sql,res=>{
      this.logging.debug("======== test_update result="+res);
    });
  }
}
