import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-userfilter',
  templateUrl: './userfilter.component.html',
  styleUrls: ['./userfilter.component.less']
})
export class UserfilterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  
	email?: string = "email";
	name?: string = "name";
	role?: string = "role";
	banned?: string | boolean = true;
}
