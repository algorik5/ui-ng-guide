import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SqlqueryService } from '../sqlquery.service';
import { PubsubService } from 'src/app/aservice/pubsub.service';

@Component({
  selector: 'app-sqlquery-update',
  templateUrl: './sqlquery-update.component.html',
  styleUrls: ['./sqlquery-update.component.less']
})
export class SqlqueryUpdateComponent implements OnInit {

  constructor(private fb: FormBuilder,private pubsub:PubsubService) { }

  ngOnInit() {
    this.formInit();

    this.pubsub.sub("sqlquery.data",data=>{
      this.form.controls["name"].setValue(data["name"]);
      this.form.controls["age"].setValue(data["age"]);
      this.form.controls["address"].setValue(data["address"]);
    });
  }

  form: FormGroup;
  formInit()
  {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      age: [null, [Validators.required]],
      address: [null, [Validators.required]]
    });
  }

  formSubmit()
  {

  }

}
