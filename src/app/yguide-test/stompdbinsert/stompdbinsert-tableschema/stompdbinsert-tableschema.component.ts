import { Component, OnInit } from '@angular/core';
import { AatableService } from 'src/app/aservice/aatable.service';
import { AapubsubService } from 'src/app/aservice/aapubsub.service';
import { AaloggingService } from 'src/app/aservice/aalogging.service';
import { AasqllocalService } from 'src/app/aservice/aasqllocal.service';
import { QueryUtil } from 'src/app/autil/QueryUtil';

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
    this.logging.debug("======= createtable start # "+ table);
    let columntypes = selectdata.map(data=>{ return {column:data["column"],type:data["type"]}; });

    let query = QueryUtil.createtable_sql(table,columntypes);
    let rs = this.sqllocal.createtable(query);
    if(rs > 0) this.pubsub.pub(this.topicprefix+".createtable",table);
    this.logging.debug("======= createtable end # "+ table +"#rs="+ rs);
  }
  testinsert() {

  }
  testselect() { 

  }

}
