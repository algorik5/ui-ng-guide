import { Injectable } from '@angular/core';
import { AaloggingService } from './aalogging.service';
import { zTestDataUtil } from '../autil/zTestDataUtil';
import { ArrayUtil } from '../autil/ArrayUtil';

@Injectable({
  providedIn: 'root'
})
export class AatableService {

  constructor(private logging:AaloggingService) { }

  datas = [];
  getData() { return this.datas; }
  getSelectData() { return this.datas.filter(data=>data["checked"]==true); }
  clearData() { this.datas = []; }
  setData(mydatas)
  {
    this.datas = mydatas;
    if(this.datas != null && this.datas.length > 0) this.setColumns(Object.keys(this.datas[0]));
    this.logging.debug("=== setData mydata="+JSON.stringify(mydatas))
  }

  addDatas(mydatas)
  {
    if(this.datas.length < 1) { this.setData(mydatas); return; }//실시간 차트의 경우 setData없이 addData만 호출함
    this.datas = this.datas.concat(mydatas);
    this.logging.debug("=== table addDatas mydata="+JSON.stringify(mydatas))
  }
  addData(mydata)
  {
    if(this.datas.length < 1) { this.setData([mydata]); return; }//실시간 차트의 경우 setData없이 addData만 호출함
    this.datas = this.datas.concat(mydata);//안됨-this.datas.push(mydata);
    this.logging.debug("=== table addData mydata="+JSON.stringify(mydata))
  }

  columns = [];//[{name:xxx,enable:xxx},...]
  clearColumns() { this.columns = []; }
  setColumns(mycolumns)
  {
    this.clearColumns();
    this.columns = mycolumns.map((column,i)=>{ return {name:column,show:true}; });
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

  ////////////////////////////// editable (사용안함)
  // editable = false;
  // isEditable() { return this.editable; }
  // setEditable(myeditable) { this.editable = myeditable; }

  ////////////////////////////// checkable (사용안함)
  // checkable = true;
  // isCheckable() { return this.checkable; }
  // setCheckable(mycheckable) { this.checkable = mycheckable; }

  ////////////////////////////// test data
  testmode = true;
  test_data()
  {
    if(this.testmode == false) return;
    let datas = zTestDataUtil.test_data();
    //datas.forEach(data=>data["checked"]=true);
    ArrayUtil.setColumnValue(datas,"checked",true);
    return datas;
  }
}
