import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-view-form-zorro',
  template: `
  <h3>app-view-form-zorro</h3>
  <form nz-form [formGroup]="validateForm" (ngSubmit)="formSubmit()">
  <nz-form-item>
      <nz-form-label nzRequired nzFor="email">User Name</nz-form-label>
      <nz-form-control nzErrorTip="Please input your username!">
          <nz-input-group nzPrefixIcon="user">
            <input type="text" nz-input formControlName="userName" placeholder="Username" />
          </nz-input-group>
      </nz-form-control>
  </nz-form-item>
  <nz-form-item>
      <nz-form-label nzRequired nzFor="email">Password</nz-form-label>
      <nz-form-control nzErrorTip="Please input your Password!">
          <nz-input-group nzPrefixIcon="lock">
            <input type="password" nz-input formControlName="password" placeholder="Password" />
          </nz-input-group>
      </nz-form-control>
  </nz-form-item>
  <nz-form-item>
    <nz-form-control>
      <label nz-checkbox formControlName="remember"> <span>Remember me</span> </label>
      <a>Forgot password</a>
      <br>
      <button nz-button [nzType]="'primary'">Log in</button>
      <br>
      Or
      <a>register now!</a>
    </nz-form-control>
  </nz-form-item>
</form>

  `,
  styles: []
})
export class ViewFormZorroComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.formInit();
  }

  validateForm: FormGroup;
  formInit()
  {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }

  formSubmit()
  {

  }

}
