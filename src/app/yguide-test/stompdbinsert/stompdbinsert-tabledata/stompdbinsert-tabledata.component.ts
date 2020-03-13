import { Component, OnInit } from '@angular/core';
import { AatableService } from 'src/app/aservice/aatable.service';
import { AapubsubService } from 'src/app/aservice/aapubsub.service';
import { AaloggingService } from 'src/app/aservice/aalogging.service';
import { DateUtil } from 'src/app/autil/DateUtil';
import { MathUtil } from 'src/app/autil/MathUtil';

@Component({
  selector: 'app-stompdbinsert-tabledata',
  templateUrl: './stompdbinsert-tabledata.component.html',
  styleUrls: ['./stompdbinsert-tabledata.component.less'],
  providers: [ AatableService ]
})
export class StompdbinsertTabledataComponent implements OnInit {

  constructor(private table: AatableService, private pubsub: AapubsubService,private logging:AaloggingService) {}

  topicprefix = "stompdbinsert.tabledata";//this.topicprefix+".datas"

  ngOnInit() {
    //pubsub-table 샘플
    this.pubsub.sub(this.topicprefix+".datas", datas => {
      this.table.setData(datas);//this.table.clearData(); this.table.addDatas(datas);
    });
    this.pubsub.sub(this.topicprefix+".data", data => {
      this.table.addData(data);
    });

    //pubsub-table 샘플 - 컬럼 show
    this.pubsub.sub(this.topicprefix+".columnshow", column => {
      this.table.changeColumnShow(column);
    });

    this.tableInit();
  }

  getTableData() { return this.table.getData(); }
  getTableColumns() { return this.table.getColumns(); }

  selectRow(data) {
    // console.log("====== selectRow data=" + JSON.stringify(data));
    this.pubsub.pub(this.topicprefix+".selectdata", data);
  }

  tableInit()
  {
  }
}
