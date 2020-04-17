import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less']
})
export class ProfileComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

	email?: string = "email";
	name?: string = "name";
	role?: string = "role";
  banned?: string | boolean = true;
 
  




  onChange(){}
  onChangeDebounced(){}
}
