import { Injectable } from '@angular/core';
import { LoggingService } from './logging.service';
import { NumberUtil } from '../autil/NumberUtil';
import { DateUtil } from '../autil/DateUtil';
import { StringUtil } from '../autil/StringUtil';
import { MathUtil } from '../autil/MathUtil';
import { zTestDataUtil } from '../autil/zTestDataUtil';

////////////////////////////// usage (샘플 - sqlchart-list 또는 dynamictable-result)
//ts 1 - constructor(private sql: SqlService (또는 new SqlService)
//ts 2 - let datas = this.sql.select(sql);
//참고.컬럼 color 변경 - this.sql.changeColumnColor(column);
//참고.테스트 데이터 사용 - this.sql.test_data();

@Injectable({
  providedIn: 'root'
})
export class SqlService {

  constructor(private logging:LoggingService) { }

  sqlrownum = "10";

  rs;
  select(sql:string)
  {
    this.logging.debug("select # "+ sql);

    this.rs = zTestDataUtil.test_data();
    this.setColumns(this.rs);

    return this.rs;
  }
  update(sql:string)
  {
    return 1;
  }
  
  getDatas() 
  { 
    if(this.rs == null) return [];
    return this.rs; 
  }

  
  columns = [];//[{name:xxx,color:xxx},...]
  clearColumns() { this.columns = []; }
  setColumns(rs)
  {
    this.clearColumns();
    if(this.rs == null || this.rs.length < 1) return this.columns;
    //this.columns = Object.keys(this.rs[0]);
    this.columns = Object.keys(this.rs[0]).map((column,i)=>{ return {name:column,color:'lime'}; });
  }
  getColumns()
  {
    return this.columns;
  }
  changeColumnColor(column) 
  { 
    if(column["color"] == "red") column["color"] = "lime";
    else column["color"] = "red";
    this.logging.debug("=== changeColumnColor find="+JSON.stringify(column))
  }
}
