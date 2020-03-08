import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SqlchartService } from '../sqlchart.service';
import { PubsubService } from 'src/app/aservice/pubsub.service';
import { SqlService } from 'src/app/aservice/sql.service';
import { LoggingService } from 'src/app/aservice/logging.service';

@Component({
  selector: 'app-sqlchart-condition',
  templateUrl: './sqlchart-condition.component.html',
  styleUrls: ['./sqlchart-condition.component.less']
})
export class SqlchartConditionComponent implements OnInit {

  constructor(private fb: FormBuilder,private pubsub:PubsubService,private sql:SqlService,private logging:LoggingService) { }

  ngOnInit() {
    this.formInit();
  }

  form: FormGroup;
  formInit()
  {
    this.form = this.fb.group({
      sql: [null, [Validators.required]],
      legend: [null, [Validators.required]],
      x: [null, [Validators.required]],
      y: [null, [Validators.required]],
      localdb: [true]
    });
    this.form.controls["sql"].setValue("select * from server \nwhere 1=1 \norder by host,time");

  }

  formSubmit()
  {
    this.logging.debug("============ formSubmit # ");
    let sql = this.form.controls["sql"].value;
    let datas = this.sql.select(sql);
    this.pubsub.pub("sqlchart.datas",datas);
  }
}
