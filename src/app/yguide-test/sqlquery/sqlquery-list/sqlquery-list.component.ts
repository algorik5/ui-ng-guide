import { Component, OnInit } from '@angular/core';
import { AapubsubService } from 'src/app/aservice/aapubsub.service';
import { AatableService } from 'src/app/aservice/aatable.service';

@Component({
  selector: 'app-sqlquery-list',
  templateUrl: './sqlquery-list.component.html',
  styleUrls: ['./sqlquery-list.component.less']
})
export class SqlqueryListComponent implements OnInit {

  constructor(private table:AatableService,private pubsub:AapubsubService) { }

  ngOnInit() {
    this.tableInit();

    this.pubsub.sub("sqlquery.datas",datas => {
      this.table.setData(datas); 
    });
  }

  tableInit()
  {
    let datas = this.table.test_data();
    this.table.setData(datas);
  }
  getTableData() { return this.table.getData(); }
  
  selectRow(data)
  {
    console.log("====== selectRow data="+JSON.stringify(data));
    this.pubsub.pub("sqlquery.data",data);
  }
}
