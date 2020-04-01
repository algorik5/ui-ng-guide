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

  @Input() myname = "table";
  @Input() editable = false;
  @Input() checkable = false;
  ngOnInit() {
    this.logging.debug("======================== AtableComponent "+"#myname="+this.myname+"#editable="+this.editable+"#checkable="+this.checkable);

    this.pubsub.sub(this.myname+".tabledatas", datas => {
      this.table.setData(datas);//this.table.clearData(); this.table.addDatas(datas);
      this.logging.debug("=== tabledatas "+"#myname="+this.myname+"#editable="+this.editable+"#checkable="+this.checkable);
    });
    this.pubsub.sub(this.myname+".tabledata", data => {
      if(Array.isArray(data)) this.table.addDatas(data);
      else this.table.addData(data);
    });
    this.pubsub.sub(this.myname+".tableclear", data => {
      this.table.clearColumns();
      this.table.clearData();
    });

    this.pubsub.sub(this.myname+".tablecolumnshow", data => {
      this.table.changeColumnShow(data);
    });
    this.pubsub.sub(this.myname+".tableeditable", data => {
      this.editable = data;
      // this.table.setEdiable(data);
      this.logging.debug("=== tableeditable "+"#myname="+this.myname+"#editable="+this.editable+"#checkable="+this.checkable);
    });
    this.pubsub.sub(this.myname+".tablecheckable", data => {
      this.checkable = data;
      // this.table.setCheckable(data);
      this.logging.debug("=== tablecheckable "+"#myname="+this.myname+"#editable="+this.editable+"#checkable="+this.checkable);
    });
    this.pubsub.sub(this.myname+".tablecheckall", data => {
      this.setCheckAll(data);
    });

    this.tableInit();
  }
  
  getTableData() { return this.table.getData(); }
  getTableColumns() { return this.table.getColumns(); }
  // isEditable() { return this.table.isEditable(); }
  // setEditable(edit) { this.table.setEditable(edit); }
  // isCheckable() { return this.table.isCheckable(); }
  // setCheckable(check) { this.table.setCheckable(check); }
  // checkedall = false;
  setCheckAll(checkedall) { 
    // this.checkedall = this.checkedall?false:true; 
    // ArrayUtil.setColumnValue(this.table.getData(),"checked",this.checkedall); 
    ArrayUtil.setColumnValue(this.table.getData(),"checked",checkedall); 
  }
  selectRow(data) {
    // console.log("====== selectRow data=" + JSON.stringify(data));
    this.pubsub.pub(this.myname+".tableselectdata", data);
  }
  tableInit()
  {
    // ////////////////////////////////////////////////////////// edit  
    // this.table.setEditable(false);
    // ////////////////////////////////////////////////////////// checkable
    // this.table.setCheckable(true);
  }
 
  /////////////////////////////////////////////////////////// button
  // buttonStatus = "-";
  // buttonStatusClick()
  // {
  //   this.logging.debug("======= buttonStatusClick # "+ this.buttonStatus);
  // }
}
