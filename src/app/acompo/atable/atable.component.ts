import { Component, OnInit, Input } from "@angular/core";
import { AapubsubService } from "src/app/aservice/aapubsub.service";
import { AatableService } from "src/app/aservice/aatable.service";
import { AaloggingService } from 'src/app/aservice/aalogging.service';
import { DateUtil } from 'src/app/autil/DateUtil';
import { MathUtil } from 'src/app/autil/MathUtil';
import { zTestDataUtil } from 'src/app/autil/zTestDataUtil';
import { ArrayUtil } from 'src/app/autil/ArrayUtil';

@Component({
  selector: 'app-atable',
  templateUrl: './atable.component.html',
  styleUrls: ['./atable.component.less']
  ,providers: [AatableService]
})
export class AtableComponent implements OnInit {

  constructor(private table: AatableService, private pubsub: AapubsubService,private logging:AaloggingService) {}

  @Input() parentname = "acompo"; myname = "table";
  ngOnInit() {
    //pubsub-table 샘플
    this.pubsub.sub(this.parentname+"."+this.myname+".datas", datas => {
      this.table.setData(datas);//this.table.clearData(); this.table.addDatas(datas);
    });
    this.pubsub.sub(this.parentname+"."+this.myname+".data", data => {
      if(Array.isArray(data)) this.table.addDatas(data);
      else this.table.addData(data);
    });
    this.pubsub.sub(this.parentname+"."+this.myname+".clear", data => {
      this.table.clearColumns();
      this.table.clearData();
    });

    this.pubsub.sub(this.parentname+"."+this.myname+".columnshow", data => {
      this.table.changeColumnShow(data);
    });
    this.pubsub.sub(this.parentname+"."+this.myname+".editable", data => {
      this.table.setEditable(data);
    });
    this.pubsub.sub(this.parentname+"."+this.myname+".checkable", data => {
      this.table.setCheckable(data);
    });
    this.pubsub.sub(this.parentname+"."+this.myname+".checkall", data => {
      this.setCheckAll(data);
    });

    this.tableInit();
  }
  
  getTableData() { return this.table.getData(); }
  getTableColumns() { return this.table.getColumns(); }
  isEditable() { return this.table.isEditable(); }
  setEditable(edit) { this.table.setEditable(edit); }
  isCheckable() { return this.table.isCheckable(); }
  setCheckable(check) { this.table.setCheckable(check); }
  // checkedall = false;
  setCheckAll(checkedall) { 
    // this.checkedall = this.checkedall?false:true; 
    // ArrayUtil.setColumnValue(this.table.getData(),"checked",this.checkedall); 
    ArrayUtil.setColumnValue(this.table.getData(),"checked",checkedall); 
  }
  selectRow(data) {
    // console.log("====== selectRow data=" + JSON.stringify(data));
    this.pubsub.pub(this.parentname+"."+this.myname+".selectdata", data);
  }
  tableInit()
  {
    ////////////////////////////////////////////////////////// edit  
    this.table.setEditable(false);
    ////////////////////////////////////////////////////////// checkable
    this.table.setCheckable(true);
  }
 
  /////////////////////////////////////////////////////////// button
  // buttonStatus = "-";
  // buttonStatusClick()
  // {
  //   this.logging.debug("======= buttonStatusClick # "+ this.buttonStatus);
  // }
}
