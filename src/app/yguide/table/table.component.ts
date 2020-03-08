import { Component, OnInit } from "@angular/core";
import { PubsubService } from "src/app/aservice/pubsub.service";
import { TableService } from "src/app/aservice/table.service";
import { LoggingService } from 'src/app/aservice/logging.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.less']
})
export class TableComponent implements OnInit {

  constructor(private table: TableService, private pubsub: PubsubService,private logging:LoggingService) {}

  ngOnInit() {
    this.testdata();

    //pubsub-table 샘플
    this.pubsub.sub("xxx.datas", datas => {
      this.table.setData(datas);
    });

    //pubsub-table 샘플 - 컬럼 show
    this.pubsub.sub("xxx.column", column => {
      this.table.changeColumnShow(column);
    });
  }

  getTableData() { return this.table.getData(); }
  getTableColumns() { return this.table.getColumns(); }
  selectRow(data) {
    // console.log("====== selectRow data=" + JSON.stringify(data));
    this.pubsub.pub("xxx.data", data);
  }

  testdata_use = true;
  testdata()
  {
    if(this.testdata_use == false) return;
    let datas = this.table.test_data();
    this.table.setData(datas);
  }

}
