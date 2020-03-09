import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jsonview',
  templateUrl: './jsonview.component.html',
  styleUrls: ['./jsonview.component.less']
})
export class JsonviewComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.test_datas();
  }

  jsonviewdata = {};//{id:"id1",name:"name1"};

  test_data(){ this.jsonviewdata = {id:"id1",name:"name1"}; }
  test_datas(){ 
    //this.jsonviewdata = [{id:"id1",name:"name1"},{id:"id2",name:"name2"}]; 
    this.jsonviewdata = [
      {id:"id1",name:"name1"},{id:"id2",name:"name2"},{id:"id2",name:"name2"},{id:"id2",name:"name2"},{id:"id2",name:"name2"},{id:"id2",name:"name2"}
      ,{id:"id2",name:"name2"},{id:"id2",name:"name2"},{id:"id2",name:"name2"},{id:"id2",name:"name2"},{id:"id2",name:"name2"},{id:"id2",name:"name2"}
    ]; 
  }
}
