import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { PubsubService } from "src/app/aservice/pubsub.service";
import { SqlService } from "src/app/aservice/sql.service";
import { LoggingService } from "src/app/aservice/logging.service";
import { FormService } from "src/app/aservice/form.service";

@Component({
  selector: 'app-dynamicchart-condition',
  templateUrl: './dynamicchart-condition.component.html',
  styleUrls: ['./dynamicchart-condition.component.less']
})
export class DynamicchartConditionComponent implements OnInit {
  constructor(
    //private fb: FormBuilder,
    private form:FormService,
    private pubsub: PubsubService,
    private sql: SqlService,
    private logging: LoggingService
  ) {}

  ngOnInit() {
    this.formInit();
  }

  formInit()
  {
    this.form.addControl("sql");
    this.form.setControlValue("sql","select * from server \nwhere 1=1 \norder by host,time");
  }
  getFormgroup() { return this.form.getFormgroup(); }
  getFormColumns() { return this.form.getControlNames(); }
  getFormValue(name) { return this.form.getControlValue(name); }

  formSubmit() {
    // this.logging.debug("============ formSubmit # ");
    // let sql = this.form.controls["sql"].value;
    // let datas = this.sql.select(sql);
    // this.pubsub.pub("dynamicchart.datas", datas);
  }

  getColumns() { return this.sql.getColumns(); }

  clickColumn(column)
  {
    this.sql.changeColumnColor(column);
    this.pubsub.pub("dynamicchart.column", column["name"]);
  }
}
