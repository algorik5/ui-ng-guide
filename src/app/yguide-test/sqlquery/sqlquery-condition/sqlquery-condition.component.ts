import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PubsubService } from 'src/app/aservice/pubsub.service';
import { SqlService } from 'src/app/aservice/sql.service';
import { LoggingService } from 'src/app/aservice/logging.service';

@Component({
  selector: 'app-sqlquery-condition',
  templateUrl: './sqlquery-condition.component.html',
  styleUrls: ['./sqlquery-condition.component.less']
})
export class SqlqueryConditionComponent implements OnInit {

  constructor(private fb: FormBuilder,private pubsub:PubsubService,private sql:SqlService,private logging:LoggingService) { }

  ngOnInit() {
    this.formInit();
  }

  form: FormGroup;
  formInit()
  {
    this.form = this.fb.group({
      sql: [null, [Validators.required]],
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
    this.form.controls["sql"].setValue("select * from server \nwhere 1=1 \norder by host,time");

  }

  formSubmit()
  {
    this.logging.debug("============ formSubmit # ");
    let sql = this.form.controls["sql"].value;
    let datas = this.sql.select(sql);
    this.pubsub.pub("sqlquery.datas",datas);
  }

}
