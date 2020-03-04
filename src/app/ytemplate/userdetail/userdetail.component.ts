import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-userdetail',
  templateUrl: './userdetail.component.html',
  styleUrls: ['./userdetail.component.less']
})
export class UserdetailComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  email?: string = "email";
	name?: string = "name";
	role?: string = "role";
  banned?: string | boolean = true;
  created_at = 1;
  last_connected_at = 1;
}
