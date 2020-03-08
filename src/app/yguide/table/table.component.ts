import { Component, OnInit } from "@angular/core";
import { PubsubService } from "src/app/aservice/pubsub.service";
import { TableService } from "src/app/aservice/table.service";
import { LoggingService } from 'src/app/aservice/logging.service';
import { DateUtil } from 'src/app/autil/DateUtil';
import { MathUtil } from 'src/app/autil/MathUtil';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.less']
})
export class TableComponent implements OnInit {

  constructor(private table: TableService, private pubsub: PubsubService,private logging:LoggingService) {}

  ngOnInit() {
    //pubsub-table 샘플
    this.pubsub.sub("mytable.datas", datas => {
      this.table.setData(datas);//this.table.clearData(); this.table.addDatas(datas);
    });
    this.pubsub.sub("mytable.data", data => {
      this.table.addData(data);
    });

    //pubsub-table 샘플 - 컬럼 show
    this.pubsub.sub("mytable.columnshow", column => {
      this.table.changeColumnShow(column);
    });

    this.tableInit();
  }

  getTableData() { return this.table.getData(); }
  getTableColumns() { return this.table.getColumns(); }

  selectRow(data) {
    // console.log("====== selectRow data=" + JSON.stringify(data));
    this.pubsub.pub("mytable.dataselect", data);
  }

  tableInit()
  {
    ////////////////////////////////////////////////////////// testdata  
    this.test_datas();
  }

  testdata_use = true;
  test_datas()
  {
    if(this.testdata_use == false) return;
    let datas = this.table.test_data();
    this.pubsub.pub("mytable.datas",datas);//this.table.setData(datas);
  }
  test_no = 0;
  test_data() { 
    this.test_no++; let curdate = new Date(); let date = DateUtil.addDays(curdate,this.test_no);
    let value = MathUtil.random(0,10);
    let data = {host:"host-x",ip:"ip-x",date:date,cpu:value,memory:value*2,checked:false};
    //this.pubsub.pub("mytable.data",data);//
    this.table.addDatas(data);
  }
  test_columnshow()
  {
    this.pubsub.pub("mytable.columnshow","host");//this.table.changeColumnShow("host");
  }

}
