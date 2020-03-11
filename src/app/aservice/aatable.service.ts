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
    this.datas = this.datas.concat(mydata);//안됨-this.datas.push(mydata);
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
    this.logging.debug("=== changeColumnShow find="+JSON.stringify(find) +"#columns="+JSON.stringify(this.columns));
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
}
