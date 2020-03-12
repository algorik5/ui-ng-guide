import { Component, OnInit } from "@angular/core";
import { AapubsubService } from "src/app/aservice/aapubsub.service";
import { AatableService } from "src/app/aservice/aatable.service";
import { AaloggingService } from 'src/app/aservice/aalogging.service';

@Component({
  selector: 'app-dynamicchart-table',
  templateUrl: './dynamicchart-table.component.html',
  styleUrls: ['./dynamicchart-table.component.less']
})
export class DynamicchartTableComponent implements OnInit {
  constructor(private table: AatableService, private pubsub: AapubsubService,private logging:AaloggingService) {}

  topicprefix = "dynamicchart.chart";//this.topicprefix+".datas"

  ngOnInit() {
    this.tableInit();

    this.pubsub.sub(this.topicprefix+".datas", datas => {
      this.table.setData(datas);
    });

    this.pubsub.sub(this.topicprefix+".column", column => {
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
    this.pubsub.pub(this.topicprefix+".selectrow", data);
  }
}
