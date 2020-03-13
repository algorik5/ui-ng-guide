import { Component, OnInit } from "@angular/core";
import { AapubsubService } from "src/app/aservice/aapubsub.service";
import { AatableService } from "src/app/aservice/aatable.service";
import { AaloggingService } from 'src/app/aservice/aalogging.service';
import { DateUtil } from 'src/app/autil/DateUtil';
import { MathUtil } from 'src/app/autil/MathUtil';
import { zTestDataUtil } from 'src/app/autil/zTestDataUtil';
import { ArrayUtil } from 'src/app/autil/ArrayUtil';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.less']
})
export class TableComponent implements OnInit {

  constructor(private table: AatableService, private pubsub: AapubsubService,private logging:AaloggingService) {}

  topicprefix = "myname.table";//this.topicprefix+".datas"

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
  isEditable() { return this.table.isEditable(); }
  setEditable(edit) { this.table.setEditable(edit); }
  selectRow(data) {
    // console.log("====== selectRow data=" + JSON.stringify(data));
    this.pubsub.pub(this.topicprefix+".selectdata", data);
  }
  tableInit()
  {
    ////////////////////////////////////////////////////////// edit  
    this.table.setEditable(false);

    ////////////////////////////////////////////////////////// testdata  
    this.test_datas();
  }
  /////////////////////////////////////////////////////////// button
  buttonStatus = "-";
  buttonStatusClick()
  {
    this.logging.debug("======= buttonStatusClick # "+ this.buttonStatus);
  }







  ////////////////////////////////////////////////////////// testdata  
  test_datas()
  {
    //let datas = this.table.test_data();
    let datas = zTestDataUtil.test_data();
    ArrayUtil.setColumnValue(datas,"checked",false);//datas.forEach(data=>data["checked"]=true);
    this.pubsub.pub(this.topicprefix+".datas",datas);//this.table.setData(datas);
  }
  test_no = 0;
  test_data() { 
    this.test_no++; let curdate = new Date(); let date = DateUtil.addDays(curdate,this.test_no);
    let value = MathUtil.random(0,10);
    let data = {host:"host-x",ip:"ip-x",date:date,cpu:value,memory:value*2,checked:false};
    this.pubsub.pub(this.topicprefix+".data",data);//this.table.addDatas(data);
  }
  test_columnshow()
  {
    this.pubsub.pub(this.topicprefix+".columnshow","host");//this.table.changeColumnShow("host");
  }
  test_editable = false; test_edit() { this.test_editable = this.test_editable?false:true; this.table.setEditable(this.test_editable); }
  test_checked = false; test_check() { this.test_checked = this.test_checked?false:true; ArrayUtil.setColumnValue(this.table.getData(),"checked",this.test_checked); }
}
