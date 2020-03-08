import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SqlqueryService } from '../sqlquery.service';
import { AapubsubService } from 'src/app/aservice/aapubsub.service';

@Component({
  selector: 'app-sqlquery-update',
  templateUrl: './sqlquery-update.component.html',
  styleUrls: ['./sqlquery-update.component.less']
})
export class SqlqueryUpdateComponent implements OnInit {

  constructor(private fb: FormBuilder,private pubsub:AapubsubService) { }

  ngOnInit() {
    this.formInit();

    this.pubsub.sub("sqlquery.data",data=>{
      this.form.controls["host"].setValue(data["host"]);
      this.form.controls["ip"].setValue(data["ip"]);
      this.form.controls["date"].setValue(data["date"]);
      this.form.controls["cpu"].setValue(data["cpu"]);
      this.form.controls["memory"].setValue(data["memory"]);
    });
  }

  form: FormGroup;
  formInit()
  {
    this.form = this.fb.group({
      host: [null, [Validators.required]],
      ip: [null, [Validators.required]],
      date: [null, [Validators.required]],
      cpu: [null, [Validators.required]],
      memory: [null, [Validators.required]],
    });
  }

  formSubmit()
  {

  }

}
