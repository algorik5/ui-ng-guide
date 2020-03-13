import { Component, OnInit } from '@angular/core';
import { AatableService } from 'src/app/aservice/aatable.service';
import { AapubsubService } from 'src/app/aservice/aapubsub.service';
import { AaloggingService } from 'src/app/aservice/aalogging.service';
import { DateUtil } from 'src/app/autil/DateUtil';
import { MathUtil } from 'src/app/autil/MathUtil';
import { AasqllocalService } from 'src/app/aservice/aasqllocal.service';

@Component({
  selector: 'app-stompdbinsert-tableschema',
  templateUrl: './stompdbinsert-tableschema.component.html',
  styleUrls: ['./stompdbinsert-tableschema.component.less'],
  providers: [ AatableService ]
})
export class StompdbinsertTableschemaComponent implements OnInit {

  constructor(private table: AatableService, private pubsub: AapubsubService,private logging:AaloggingService,private sqllocal:AasqllocalService) {}

  topicprefix = "stompdbinsert.tableschema";//this.topicprefix+".datas"

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
    this.table.setColumns(["path","table","column","pk","samplevalue","checked"]);
    ////////////////////////////////////////////////////////// edit  
    this.table.setEditable(true);
  }

  /////////////////////////////////////////////////////////// button
  buttonStatus = "-";
  buttonStatusClick()
  {
    this.logging.debug("======= buttonStatusClick # "+ this.buttonStatus);
    if(this.buttonStatus == "createtable") this.createtable();
    else if(this.buttonStatus == "testinsert") this.testinsert();
    else if(this.buttonStatus == "testselect") this.testselect();
  }

  createtable()
  {
    let selectdata = this.table.getSelectData();
    let table = selectdata[0]["table"];
    let columntypes = selectdata.map(data=>{ return {column:data["column"],type:data["type"]}; });

    let columnQuery = null;
    columntypes.forEach((columntype,i)=>{
      if(columnQuery == null) columnQuery = ""+columntype["column"] +" "+ columntype["type"] ;
      else columnQuery = columnQuery +","+ columntype["column"] +" "+ columntype["type"] ;
    });
    let query = "create table "+ table + "( "+ columnQuery +" )";
    let rs = this.sqllocal.createtable(query);
  }
  testinsert() {}
  testselect() { }
}
