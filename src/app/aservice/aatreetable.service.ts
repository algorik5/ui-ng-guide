import { Injectable } from '@angular/core';
import { AaloggingService } from './aalogging.service';
import { zTestDataUtil } from '../autil/zTestDataUtil';
import { JSONUtil } from '../autil/JSONUtil';

@Injectable({
  providedIn: 'root'
})
export class AatreetableService {

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

  columns = [];//[{name:xxx,enable:xxx},...]
  clearColumns() { this.columns = []; }
  setColumns(mydatas)
  {
    this.clearColumns();
    if(this.datas == null || this.datas.length < 1) return this.columns;
    this.columns = Object.keys(this.datas[0]["data"]);
  }
  getColumns()
  {
    return this.columns;
  }

  ////////////////////////////// selection
  selectdatas = [];//TreeNode[];
  getSelectData() { return this.selectdatas; }
  onSelect(event,selectdatas)//event는 무시 
  {
    this.selectdatas = selectdatas; 
    console.log("-------------- onSelect #size="+ (Array.isArray(this.selectdatas)) +"#data="+ JSONUtil.stringify(this.selectdatas));
  }

  ////////////////////////////// test data
  testmode = true;
  test_no = 0;
  test_data()
  {
    if(this.testmode == false) return [];
    this.test_no++;
    if(this.test_no%2==0) return this.testdata2;
    return this.testdata;
  }
  testdata = 
  [ 
    { "data":{ "name":"Documents", "value":"75kb", "type":"Folder","path":"//Documents" }
      ,"children":
      [
        { "data":{ "name":"Work", "value":"55kb", "type":"Folder","path":"//Documents/Work" }
        ,"children":[{ "data":{ "name":"Expenses.doc", "value":"30kb", "type":"Document","path":"//Documents/Work/Expenses.doc",} }, { "data":{ "name":"Resume.doc", "value":"25kb", "type":"Resume","path":"//Documents/Work/Resume.doc" } }]}, 
        { "data":{ "name":"Home", "value":"20kb", "type":"Folder","path":"//Documents/Home" }
        ,"children":[ { "data":{ "name":"Invoices", "value":"20kb", "type":"Text","path":"//Home/Work/Invoices" } } ] } 
      ] },
    { "data":{ "name":"Pictures", "value":"150kb", "type":"Folder","path":"//Pictures" }
    ,"children":[ { "data":{ "name":"barcelona", "value":"90kb", "type":"Picture","path":"//Pictures/barcelona" } }, { "data":{ "name":"primeui", "value":"30kb", "type":"Picture","path":"//Pictures/primeui" } }, { "data":{ "name":"primeui", "value":"30kb", "type":"Picture","path":"//Pictures/primeui" } } ] } 
  ];
  testdata2 = 
  [ 
    { "data":{ "name":"Documents1", "value":"75kb1", "type":"Folder1","path":"//Documents1" } }
  ];
  ////////////////////////////// convert
  convertTreeData(mydata)
  {
    this.logging.debug("=== treetable service convertTreeData start #array="+ Array.isArray(mydata) +"#"+ JSONUtil.stringify(mydata));
    if(Array.isArray(mydata))
    {

    }
    else
    {
      let treedatas = this.objectToTreeTableData(mydata);
      // Object.keys(mydata).forEach(key=>{
      //   let value = mydata[key];
      //   let data = this.valueToTreeTableData(key,value);
      //   treedatas.push(data);
      // });
      this.logging.debug("=== treetable service convertTreeData end   #"+ JSONUtil.stringify(treedatas));
      return treedatas;
    }
  }
  objectToTreeTableData(obj)
  {
    let treedatas = [];
    Object.keys(obj).forEach(key=>{
      let value = obj[key];
      if(typeof(value) == 'object')
      {
        let datas = this.objectToTreeTableData(value);
        treedatas.concat(datas);
      }
      else
      {
        let data = this.valueToTreeTableData(key,value);
        treedatas.push(data);
      }
    });
    return treedatas;
  }
  valueToTreeTableData(key,value)
  {
    let data = {data:{ "name":key, "value":value, "type":"mytype","path":"//mypath" },children:[]};
    return data;
  }

}
