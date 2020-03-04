import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usertable',
  templateUrl: './usertable.component.html',
  styleUrls: ['./usertable.component.less']
})
export class UsertableComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  columns = ['created_at', 'email', 'name', 'role', 'banned'];
  total = 3;
  items = [
    {created_at:"1",email:"email1",name:"name1",role:"role1",banned:true},
    {created_at:"2",email:"email2",name:"name2",role:"role2",banned:true},
    {created_at:"3",email:"email3",name:"name3",role:"role3",banned:false}
  ];

  pageSize = 1;
}
