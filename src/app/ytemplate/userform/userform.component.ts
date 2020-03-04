import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-userform',
  templateUrl: './userform.component.html',
  styleUrls: ['./userform.component.less']
})
export class UserformComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initform();
  }

	email?: string = "email";
	name?: string = "name";
	role?: string = "role";
  banned?: string | boolean = true;
  password:string = "pass";

  form: FormGroup;
  initform()
  {
    this.form = this.formBuilder.group({
			email: new FormControl(this.email, [
				Validators.email,
				Validators.required
			]),
			name: new FormControl(name, [Validators.required]),
			password: new FormControl(
				this.password,
				[Validators.minLength(6)].concat(Validators.required)
			),
			role: new FormControl(this.role, [Validators.required]),
			banned: new FormControl(this.banned, [
				Validators.required
			])
		});

  }
}
