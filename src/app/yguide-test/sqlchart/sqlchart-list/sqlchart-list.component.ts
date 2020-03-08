import { Component, OnInit } from '@angular/core';
import { AapubsubService } from 'src/app/aservice/aapubsub.service';
import { zTestDataUtil } from 'src/app/autil/zTestDataUtil';
import { AatableService } from 'src/app/aservice/aatable.service';

@Component({
  selector: 'app-sqlchart-list',
  templateUrl: './sqlchart-list.component.html',
  styleUrls: ['./sqlchart-list.component.less']
})
export class SqlchartListComponent implements OnInit {

  constructor(private table:AatableService,private pubsub:AapubsubService) { }

  ngOnInit() {
    this.tableInit();

    this.pubsub.sub("sqlchart.datas",datas => {
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
    //this.pubsub.pub("sqlchart.data",data);
  }
}
  