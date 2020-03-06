import { Component, OnInit } from "@angular/core";
import { PubsubService } from "src/app/aservice/pubsub.service";
import { TableService } from "src/app/aservice/table.service";
import { LoggingService } from 'src/app/aservice/logging.service';

@Component({
  selector: "app-dynamictable-result",
  templateUrl: "./dynamictable-result.component.html",
  styleUrls: ["./dynamictable-result.component.less"]
})
export class DynamictableResultComponent implements OnInit {
  constructor(private table: TableService, private pubsub: PubsubService,private logging:LoggingService) {}

  ngOnInit() {
    this.table.test_data();

    this.pubsub.sub("dynamictable.datas", datas => {
      this.table.setData(datas);
    });

    this.pubsub.sub("dynamictable.column", column => {
      //this.logging.debug("=== column="+ column)
      this.table.changeColumnShow(column);
    });
  }

  getTableData() { return this.table.getData(); }
  getTableColumns() { return this.table.getColumns(); }

  selectRow(data) {
    // console.log("====== selectRow data=" + JSON.stringify(data));
    this.pubsub.pub("dynamictable.data", data);
  }
}
