import { Component, OnInit } from '@angular/core';
import { SqlqueryService } from '../sqlquery.service';
import { PubsubService } from 'src/app/aservice/pubsub.service';
import { TableService } from 'src/app/aservice/table.service';

@Component({
  selector: 'app-sqlquery-list',
  templateUrl: './sqlquery-list.component.html',
  styleUrls: ['./sqlquery-list.component.less']
})
export class SqlqueryListComponent implements OnInit {

  constructor(private table:TableService,private pubsub:PubsubService) { }

  tableData = [];
  ngOnInit() {
    this.tableData = this.table.test_data();

    this.pubsub.sub("sqlquery.datas",datas => {
      this.tableData = datas;
    });
  }

  selectRow(data)
  {
    console.log("====== selectRow data="+JSON.stringify(data));
    this.pubsub.pub("sqlquery.data",data);
  }
}
