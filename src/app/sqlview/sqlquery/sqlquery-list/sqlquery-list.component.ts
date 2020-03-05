import { Component, OnInit } from '@angular/core';
import { SqlqueryService } from '../sqlquery.service';
import { PubsubService } from 'src/app/aservice/pubsub.service';

@Component({
  selector: 'app-sqlquery-list',
  templateUrl: './sqlquery-list.component.html',
  styleUrls: ['./sqlquery-list.component.less']
})
export class SqlqueryListComponent implements OnInit {

  constructor(private pubsub:PubsubService) { }

  ngOnInit() {
    this.pubsub.sub("sqlquery.datas",datas => {
      this.tableData = datas; 
    });
  }

  selectRow(data)
  {
    console.log("====== selectRow data="+JSON.stringify(data));
    this.pubsub.pub("sqlquery.data",data);
  }
  
  tableData = [
    {key: '1',checked:false,name: 'John Brown',age: 32,address: 'New York No. 1 Lake Park' },
    {key: '2',checked:false,name: 'Jim Green',age: 42,address: 'London No. 1 Lake Park' },
    {key: '3',checked:false,name: 'Joe Black',age: 32,address: 'Sidney No. 1 Lake Park' }
  ];

}
