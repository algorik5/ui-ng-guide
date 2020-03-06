import { Component, OnInit } from '@angular/core';
import { PubsubService } from 'src/app/aservice/pubsub.service';
import { zTestDataUtil } from 'src/app/autil/zTestDataUtil';
import { TableService } from 'src/app/aservice/table.service';

@Component({
  selector: 'app-sqlchart-list',
  templateUrl: './sqlchart-list.component.html',
  styleUrls: ['./sqlchart-list.component.less']
})
export class SqlchartListComponent implements OnInit {

  constructor(private table:TableService,private pubsub:PubsubService) { }

  tableData = [];
  ngOnInit() {
    this.tableData = this.table.test_data();

    this.pubsub.sub("sqlchart.datas",datas => {
      this.tableData = datas; 
    });
  }

  selectRow(data)
  {
    console.log("====== selectRow data="+JSON.stringify(data));
    //this.pubsub.pub("sqlchart.data",data);
  }
}
  