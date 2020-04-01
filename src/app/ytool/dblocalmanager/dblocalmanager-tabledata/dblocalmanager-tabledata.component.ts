import { Component, OnInit } from '@angular/core';
import { AatableService } from 'src/app/aservice/aatable.service';
import { AapubsubService } from 'src/app/aservice/aapubsub.service';
import { AaloggingService } from 'src/app/aservice/aalogging.service';
import { zTestDataUtil } from 'src/app/autil/zTestDataUtil';
import { ArrayUtil } from 'src/app/autil/ArrayUtil';
import { DateUtil } from 'src/app/autil/DateUtil';
import { MathUtil } from 'src/app/autil/MathUtil';

@Component({
  selector: 'app-dblocalmanager-tabledata',
  templateUrl: './dblocalmanager-tabledata.component.html',
  styleUrls: ['./dblocalmanager-tabledata.component.less']
})
export class DblocalmanagerTabledataComponent implements OnInit {

  constructor(private table: AatableService, private pubsub: AapubsubService,private logging:AaloggingService) {}

  topicprefix = "dblocalmanager.tabledata";//this.topicprefix+".datas"

  ngOnInit() {
    //pubsub-table 샘플
    this.pubsub.sub(this.topicprefix+".datas", datas => {
      this.table.setData(datas);//this.table.clearData(); this.table.addDatas(datas);
    });
    this.pubsub.sub(this.topicprefix+".data", data => {
      if(Array.isArray(data)) this.table.addDatas(data);
      else this.table.addData(data);
    });
    this.pubsub.sub(this.topicprefix+".clear", data => {
      this.table.clearColumns();
      this.table.clearData();
    });

    //pubsub-table 샘플 - 컬럼 show
    this.pubsub.sub(this.topicprefix+".columnshow", column => {
      this.table.changeColumnShow(column);
    });

    this.tableInit();
  }

  getTableData() { return this.table.getData(); }
  getTableColumns() { return this.table.getColumns(); }
  editable = false;
  checkable = false;
  selectRow(data) {
    // console.log("====== selectRow data=" + JSON.stringify(data));
    this.pubsub.pub(this.topicprefix+".selectdata", data);
  }
  tableInit()
  {
    ////////////////////////////////////////////////////////// edit  
    // this.table.setEditable(false);

  }
  /////////////////////////////////////////////////////////// button
  buttonStatus = "-";
  buttonStatusClick()
  {
    this.logging.debug("======= buttonStatusClick # "+ this.buttonStatus);
  }

}