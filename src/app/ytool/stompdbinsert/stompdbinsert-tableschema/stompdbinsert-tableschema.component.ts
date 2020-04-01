import { Component, OnInit } from '@angular/core';
import { AatableService } from 'src/app/aservice/aatable.service';
import { AapubsubService } from 'src/app/aservice/aapubsub.service';
import { AaloggingService } from 'src/app/aservice/aalogging.service';
import { AasqllocalService } from 'src/app/aservice/aasqllocal.service';
import { QueryUtil } from 'src/app/autil/QueryUtil';
import { AalocalstorageService } from 'src/app/aservice/aalocalstorage.service';

@Component({
  selector: 'app-stompdbinsert-tableschema',
  templateUrl: './stompdbinsert-tableschema.component.html',
  styleUrls: ['./stompdbinsert-tableschema.component.less'],
  providers: [ AatableService ]
})
export class StompdbinsertTableschemaComponent implements OnInit {

  constructor(private table: AatableService, private pubsub: AapubsubService,private logging:AaloggingService,private sqllocal:AasqllocalService,
    private localstore:AalocalstorageService) {}

  topicprefix = "stompdbinsert.tableschema";//this.topicprefix+".datas"

  ngOnInit() {
    //pubsub-table 샘플
    this.pubsub.sub(this.topicprefix+".datas", datas => {
      this.table.setData(datas);//this.table.clearData(); this.table.addDatas(datas);
      this.setMsgTable(datas);
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
  editable = false;
  selectRow(data) {
    // console.log("====== selectRow data=" + JSON.stringify(data));
    this.pubsub.pub(this.topicprefix+".selectdata", data);
  }

  tableInit()
  {
    this.table.setColumns(["column","type","pk","samplevalue","checked"]);
    ////////////////////////////////////////////////////////// edit  
    // this.table.setEditable(true);
  }

  /////////////////////////////////////////////////////////// button
  stompmsg = "-";
  stompdbtable = "-";
  setMsgTable(datas) 
  { 
    let typedata = datas.find(data=>data["column"]=="_type_");
    this.stompmsg = typedata["samplevalue"];
    this.stompdbtable = typedata["samplevalue"];//table
  }
  createtable()
  {
    let selectdata = this.table.getSelectData();
    let columntypes = selectdata.map(data=>{ return {column:data["column"],type:data["type"],pk:data["pk"]}; });
    // let columntypes = this.table.getColumns(table);
    this.logging.debug("======= createtable start # "+ this.stompdbtable);

    let sql = QueryUtil.createtable_sql(this.stompdbtable,columntypes);
    let rs = this.sqllocal.createtable(sql);
    if(rs > 0)
    {
      this.savelocalstorage();
      this.pubsub.pub(this.topicprefix+".createtable",this.stompdbtable);
    } 
    this.logging.debug("======= createtable end # "+ this.stompdbtable +"#rs="+ rs);
  }
  // inputValue = "";
  savelocalstorage()
  {
    this.localstore.msgtablemapping_add(this.stompmsg,this.stompdbtable);
    this.logging.debug("======= savelocalstorage end # "+ this.stompdbtable +"#rs="+ this.localstore.msgtablemapping_get(this.stompmsg));
    this.pubsub.pub("stompdbinsert.debugjsonview.localStorage","");
  }
  testinsert() {
    let selectdata = this.table.getSelectData();
    let columntypes = selectdata.map(data=>{ return {column:data["column"],type:data["type"],pk:data["pk"]}; });
    // let columntypes = this.table.getColumns(table);
    this.logging.debug("======= testinsert start # "+ this.stompdbtable);

    let sql = QueryUtil.insert_sql(this.stompdbtable,columntypes);
    let samplevalue = {}; selectdata.forEach(data=>{ samplevalue[data["column"]]= data["samplevalue"]; });
    let rs = this.sqllocal.insert_pstmt(sql,samplevalue);
    this.logging.debug("======= testinsert end # "+ this.stompdbtable +"#rs="+ rs);
  }
  testselect() { 
    let selectdata = this.table.getSelectData();
    let columntypes = selectdata.map(data=>{ return {column:data["column"],type:data["type"],pk:data["pk"]}; });
    // let columntypes = this.table.getColumns(table);
    this.logging.debug("======= testselect start # "+ this.stompdbtable);

    let sql = QueryUtil.select_sql(this.stompdbtable,columntypes);
    let rs = this.sqllocal.select(sql);
    this.pubsub.pub("stompdbinsert.tabledata.data",rs);
    this.logging.debug("======= testselect end  # "+ this.stompdbtable +"#rs="+ rs);
  }

}
