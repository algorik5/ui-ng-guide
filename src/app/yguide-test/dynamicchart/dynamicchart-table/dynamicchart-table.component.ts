import { Component, OnInit } from "@angular/core";
import { PubsubService } from "src/app/aservice/pubsub.service";
import { TableService } from "src/app/aservice/table.service";
import { LoggingService } from 'src/app/aservice/logging.service';

@Component({
  selector: 'app-dynamicchart-table',
  templateUrl: './dynamicchart-table.component.html',
  styleUrls: ['./dynamicchart-table.component.less']
})
export class DynamicchartTableComponent implements OnInit {
  constructor(private table: TableService, private pubsub: PubsubService,private logging:LoggingService) {}

  ngOnInit() {
    this.tableInit();

    this.pubsub.sub("dynamicchart.datas", datas => {
      this.table.setData(datas);
    });

    this.pubsub.sub("dynamicchart.column", column => {
      //this.logging.debug("=== column="+ column)
      this.table.changeColumnShow(column);
    });
  }

  tableInit()
  {
    let datas = this.table.test_data();
    this.table.setData(datas);
  }
  getTableData() { return this.table.getData(); }
  getTableColumns() { return this.table.getColumns(); }

  selectRow(data) {
    // console.log("====== selectRow data=" + JSON.stringify(data));
    this.pubsub.pub("dynamicchart.data", data);
  }
}
