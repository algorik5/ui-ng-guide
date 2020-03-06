import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { PubsubService } from "src/app/aservice/pubsub.service";
import { SqlService } from "src/app/aservice/sql.service";
import { LoggingService } from "src/app/aservice/logging.service";

@Component({
  selector: "app-dynamictable-condition",
  templateUrl: "./dynamictable-condition.component.html",
  styleUrls: ["./dynamictable-condition.component.less"]
})
export class DynamictableConditionComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private pubsub: PubsubService,
    private sql: SqlService,
    private logging: LoggingService
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
    let datas = this.sql.select(sql);
    this.pubsub.pub("dynamictable.datas", datas);
  }

  getColumns() { return this.sql.getColumns(); }

  clickColumn(column)
  {
    this.sql.changeColumnColor(column);
    this.pubsub.pub("dynamictable.column", column["name"]);
  }
}
