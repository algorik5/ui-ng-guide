import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-view-form-hapify',
  template: `
  <h3>app-view-form-hapify</h3>
  <form nz-form [formGroup]="validateForm" (ngSubmit)="fromSubmit()">
  <nz-form-item>
      <nz-form-label>{{ 'user' }}</nz-form-label>
      <input nz-input formControlName="userName" class="w-100" (keyup)="onChangeDebounced()" [placeholder]="'common_value-string'"/>
  </nz-form-item>

  <nz-form-item>
      <nz-form-label>{{ 'password' }}</nz-form-label>
      <input nz-input formControlName="password" class="w-100" (keyup)="onChangeDebounced()" [placeholder]="'common_value-string'"/>
  </nz-form-item>

  <nz-form-item>
      <nz-form-label>{{ 'banned' }}</nz-form-label>
      <nz-select class="w-100" [nzPlaceHolder]="'common_value-boolean'" (ngModelChange)="onChange()" [nzAllowClear]="true" >
          <nz-option [nzValue]="true" [nzLabel]="'common_true'" ></nz-option>
          <nz-option [nzValue]="false" [nzLabel]="'common_false'" ></nz-option>
      </nz-select>
  </nz-form-item>

  <button nz-button nzType="primary" [disabled]="validateForm.invalid" [nzLoading]="loading" > {{ 'common_save' }} </button>

</form>

  `,
  styles: []
})
export class ViewFormHapifyComponent implements OnInit {

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
