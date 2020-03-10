import { Injectable } from '@angular/core';
import { AaloggingService } from './aalogging.service';
import { NumberUtil } from '../autil/NumberUtil';
import { DateUtil } from '../autil/DateUtil';
import { StringUtil } from '../autil/StringUtil';
import { MathUtil } from '../autil/MathUtil';
import { zTestDataUtil } from '../autil/zTestDataUtil';
import { AasqlremoteService } from './aasqlremote.service';
import { of } from 'rxjs';

////////////////////////////// usage (샘플 - sqlchart-list 또는 dynamictable-result)
//ts 1 - constructor(private sql: SqlService (또는 new SqlService)
//ts 2 - let datas = this.sql.select(sql);
//참고.테스트 데이터 사용 - this.sql.test_data();

@Injectable({
  providedIn: 'root'
})
export class AasqlService {

  constructor(private logging:AaloggingService,private sqlremote:AasqlremoteService) { }

  sqlrownum = "10";

  testmode = false;

  rs;
  setDatas(myrs){ this.rs = myrs; this.setColumns(); }
  //this.sql.select(sql,rs=>{ this.pubsub.pub("sqlquery.datas",rs); });
  select(sql:string,handler)
  {
    this.logging.debug("select #testmode="+this.testmode +"#sql="+ sql);

    if(this.testmode)
    {
      this.rs = zTestDataUtil.test_data();
      // this.logging.debug("select #testmode="+this.testmode +"#rs="+ this.rs);
      // this.setColumns(this.rs);
      // return this.rs;
      const observable = of(this.rs);//sqlremote가 aysnc여서 동일한 구조로 변경함
      observable.subscribe(handler);
    }
    else 
    {
      this.sqlremote.select(sql,handler);
      // this.sqlremote.select(sql,res=>{
      //   this.rs = res; 
      //   this.logging.debug("select #testmode="+this.testmode +"#rs="+ this.rs);
      //   this.setColumns(this.rs);
      // });
    }
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
  setColumns()//myrs)
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
  getColumnsv2(myrs)
  {
    return Object.keys(myrs[0]).map((column,i)=>{ return {name:column,color:'lime'}; });
  }


  se()
  {
  }
}
