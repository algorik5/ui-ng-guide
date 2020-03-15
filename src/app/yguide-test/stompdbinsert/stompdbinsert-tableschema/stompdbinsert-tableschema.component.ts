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
    this.table.setColumns(["path","table","column","type","pk","samplevalue","checked"]);
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
    let columntypes = selectdata.map(data=>{ return {column:data["column"],type:data["type"],pk:data["pk"]}; });
    // let columntypes = this.table.getColumns(table);
    this.logging.debug("======= createtable start # "+ table);

    let sql = QueryUtil.createtable_sql(table,columntypes);
    let rs = this.sqllocal.createtable(sql);
    if(rs > 0) this.pubsub.pub(this.topicprefix+".createtable",table);
    this.logging.debug("======= createtable end # "+ table +"#rs="+ rs);
  }
  testinsert() {
    let selectdata = this.table.getSelectData();
    let table = selectdata[0]["table"];
    let columntypes = selectdata.map(data=>{ return {column:data["column"],type:data["type"],pk:data["pk"]}; });
    // let columntypes = this.table.getColumns(table);
    this.logging.debug("======= testinsert start # "+ table);

    let sql = QueryUtil.insert_sql(table,columntypes);
    let samplevalue = {}; selectdata.forEach(data=>{ samplevalue[data["column"]]= data["samplevalue"]; });
    let rs = this.sqllocal.insert_pstmt(sql,samplevalue);
    this.logging.debug("======= testinsert end # "+ table +"#rs="+ rs);
  }
  testselect() { 
    let selectdata = this.table.getSelectData();
    let table = selectdata[0]["table"];
    let columntypes = selectdata.map(data=>{ return {column:data["column"],type:data["type"],pk:data["pk"]}; });
    // let columntypes = this.table.getColumns(table);
    this.logging.debug("======= testselect start # "+ table);

    let sql = QueryUtil.select_sql(table,columntypes);
    let rs = this.sqllocal.select(sql);
    this.pubsub.pub("stompdbinsert.tabledata.data",rs);
    this.logging.debug("======= testselect end # "+ table +"#rs="+ rs);
  }

}
