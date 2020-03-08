import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AapubsubService } from 'src/app/aservice/aapubsub.service';
import { AasqlService } from 'src/app/aservice/aasql.service';
import { AaloggingService } from 'src/app/aservice/aalogging.service';

@Component({
  selector: 'app-sqlquery-condition',
  templateUrl: './sqlquery-condition.component.html',
  styleUrls: ['./sqlquery-condition.component.less']
})
export class SqlqueryConditionComponent implements OnInit {

  constructor(private fb: FormBuilder,private pubsub:AapubsubService,private sql:AasqlService,private logging:AaloggingService) { }

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
