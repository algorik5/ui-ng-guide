import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AapubsubService } from "src/app/aservice/aapubsub.service";
import { AasqlService } from "src/app/aservice/aasql.service";
import { AaloggingService } from "src/app/aservice/aalogging.service";
import { ColorUtil } from 'src/app/autil/ColorUtil';

@Component({
  selector: "app-dynamictable-condition",
  templateUrl: "./dynamictable-condition.component.html",
  styleUrls: ["./dynamictable-condition.component.less"]
})
export class DynamictableConditionComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private pubsub: AapubsubService,
    private sql: AasqlService,
    private logging: AaloggingService
  ) {}

  ngOnInit() {
    this.formInit();
  }

  form: FormGroup;
  formInit() {
    this.form = this.fb.group({
      sql: [null, [Validators.required]]
    });
    
    this.form.controls["sql"].setValue(
      "select * from server \nwhere 1=1 \norder by host,time"
    );
  }

  formSubmit() {
    this.logging.debug("============ formSubmit # ");
    let sql = this.form.controls["sql"].value;
    // let datas = this.sql.select(sql);
    // this.pubsub.pub("dynamictable.datas", datas);
    this.sql.select(sql,rs=>{ 
      //let newdatas = ArrayUtil.util_tolowercase_allfields(rs);//임시 - HOST > host
      this.pubsub.pub("sqlquery.datas",rs); 
    });

  }

  getColumns() { return this.sql.getColumns(); }

  clickColumn(column)
  {
    ColorUtil.changeColor(column);
    this.pubsub.pub("dynamictable.column", column["name"]);
  }
}
