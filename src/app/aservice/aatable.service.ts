import { Injectable } from '@angular/core';
import { AaloggingService } from './aalogging.service';
import { zTestDataUtil } from '../autil/zTestDataUtil';

@Injectable({
  providedIn: 'root'
})
export class AatableService {

  constructor(private logging:AaloggingService) { }

  datas = [];
  getData() { return this.datas; }
  clearData() { this.datas = []; }
  setData(mydatas)
  {
    this.datas = mydatas;
    this.setColumns(this.datas);
    this.logging.debug("=== setData mydata="+JSON.stringify(mydatas))
  }

  addDatas(mydatas)
  {
    this.datas = this.datas.concat(mydatas);
    this.logging.debug("=== addDatas mydata="+JSON.stringify(mydatas))
  }
  addData(mydata)
  {
    this.datas.push(mydata);
    this.logging.debug("=== addData mydata="+JSON.stringify(mydata))
  }

  columns = [];//[{name:xxx,enable:xxx},...]
  clearColumns() { this.columns = []; }
  setColumns(mydatas)
  {
    this.clearColumns();
    if(this.datas == null || this.datas.length < 1) return this.columns;
    //this.columns = Object.keys(this.rs[0]);
    this.columns = Object.keys(this.datas[0]).map((column,i)=>{ return {name:column,show:true}; });
  }
  getColumns()
  {
    return this.columns;
  }
  changeColumnShow(column) 
  { 
    let find = this.columns.find(data=>data["name"]==column);
    if(find["show"] == null) { find["show"] = true; return; }
    if(find["show"] == true) find["show"] = false;
    else find["show"] = true;
    this.logging.debug("=== changeColumnShow find="+JSON.stringify(find))
  }


  ////////////////////////////// test data
  testmode = true;
  test_data()
  {
    if(this.testmode == false) return;
    let tableData = [];
    let datas = zTestDataUtil.test_data();
    datas.forEach((data,i)=>{
      //this.addDataRow(data["host"],data["date"],data["cpu"]);//data["memory"]
      //{key: '1',checked:false,name: 'John Brown',age: 32,address: 'New York No. 1 Lake Park' },
      data["checked"] = false;
      tableData.push(data);
    });
    return tableData;
  }


  









  //////////////////////////////// 사용법
  /*
    ///////// html
    <ibm-table [model]="getTableModel()" size="sm" showSelectionColumn="true" striped="true" sortable="true" enableSingleSelect="true" (selectRow)="tableSelectRow($event)"> </ibm-table>

    ///////// ts
    constructor(private table:TableService)
    getTableModel() { return this.table.getTableModel(); }
    // 입력
    this.table.clearTable();
    datas.forEach({...
      if(i==0) this.table.setColumn(mydata);
      this.table.addData(mydata);

    ///////// 주의
    ~constructor에서 사용하면 singleton이므로 모든 화면에서 데이터 공유됨
    ~2개의 TableService를 사용하고 싶으면 new TableService() 사용

  */

  // private debug = true;
  // private tableModel = new TableModel();
  // getTableModel() { return this.tableModel; }//this.test_data(); }
  
  // getDataLength() { return this.tableModel.data.length; }
  // getData() 
  // { 
  //   this.logging.debug("=== table getData start #length="+this.tableModel.data.length);//+ Object.keys(data));
  //   let datas = [];
  //   let columns = this.getColumn();
  //   this.tableModel.data.forEach((o,i)=>{
  //     //this.logging.debug("\t === data forEach #i="+i+"#o="+JSON.stringify(o));//[{"rowSpan":1,"colSpan":1,"data":"//id"},{"rowSpan":1,"colSpan":1,"data":"id"},{"rowSpan":1,"colSpan":1,"data":"string"},{"rowSpan":1,"colSpan":1,"data":"N"}]
  //     if(o == null || Object.keys(o).length < 1) return;//첫번째 row는 빈값이네 ...
  //     let values = o.map(o2=>o2["data"]);
  //     //this.logging.debug("=== dataarray="+dataarray);
  //     let data = {}; columns.forEach((column,i)=>data[column]=values[i]);//{col1:v1,col2:v2...}
  //     datas.push(data);
  //   });
  //   this.logging.debug("=== table getData end   #datas="+ JSON.stringify(datas));//+ Object.keys(data));
  //   return datas;//[{col1=x,col2=...}]
  // }
  // getSelectDataByEvent(selectEvent)
  // {
  //   let row = selectEvent.selectedRowIndex;
  //   return this.getSelectData(row);
  // }
  // getSelectData(row)
  // {
  //   //{col=v1,col2=...}
  //   //let columns = selectEvent.model['header'].map(o=>o['data']);
  //   //let values = selectEvent.model['_data'][row].map(o=>o['data']);
  //   let columns = this.getColumn();
  //   let values = this.tableModel.data[row].map(o=>o['data']);
  //   //this.logging.debug("=== table getSelectData #values="+values);//+ Object.keys(data));
  //   let data = {}; columns.forEach((column,i)=>data[column] = values[i]);
  //   //this.logging.debug("=== getSelectData #i="+row +"#data="+JSON.stringify(data));//{col=v1,col2=...}
  //   return data;
  // }

  // getColumn() {
  //   let columns = this.tableModel.header.map(o=>o["data"]);//{"visible":true,"sorted":false,"sortable":true,"filterCount":0,"rowSpan":1,"colSpan":1,"style":{},"_ascending":true,"data":"path","filterData":{"data":""}}
  //   //this.logging.debug("=== table getColumn #columns="+columns);//+ Object.keys(data));
  //   return columns;//['a','b'...]
  // }
  // setColumn(data) //{id:1,name:'name1'}
  // {
  //   this.logging.debug("=== table setColumn start #data="+JSON.stringify(data));//+ Object.keys(data));
  //   this.tableModel.header = [];
  //   Object.keys(data).forEach(o => {
  //     this.tableModel.header.push(new TableHeaderItem({ data: o }));
  //   });
  // }

  // addData(data)//{id:1,name:'name1'}
  // {
  //   this.logging.debug("=== table addData start #data="+ JSON.stringify(data));
  //   let tablerow = []; ObjectUtil.values(data).forEach(o2=>{ tablerow.push(new TableItem({ data: o2 })) });
  //   this.tableModel.data.push(tablerow);
  //   //this.logging.debug("=== table addData end   #data="+ JSON.stringify(tablerow));
  // }
  // changeData(row,data)
  // {
  //   this.logging.debug("=== table changeData start #row="+row +"#data="+ JSON.stringify(data));
  //   let tablerow = []; ObjectUtil.values(data).forEach(o2=>{ tablerow.push(new TableItem({ data: o2 })) });
  //   this.tableModel.data[row] = tablerow;
  // }

  // clearTable() 
  // { 
  //   this.logging.debug("=== table clearTable start # ");
  //   this.tableModel.header = [];
  //   this.tableModel.data = [];
  // }


  // /////////////////////////////// test data
  // test_data() {
  //   this.tableModel.header = [new TableHeaderItem({ data: 'id' }), new TableHeaderItem({ data: 'name' })];
  //   this.tableModel.data = [ 
  //     [new TableItem({ data: 'id-1' }), new TableItem({ data: 'Name 1' })], 
  //     [new TableItem({ data: 'id-3' }), new TableItem({ data: 'Name 2' })], 
  //     [new TableItem({ data: 'id-2' }), new TableItem({ data: 'Name 3' })] 
  //   ];
  // }
}
