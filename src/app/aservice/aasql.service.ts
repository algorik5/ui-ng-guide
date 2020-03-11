import { Injectable } from '@angular/core';
import { AaloggingService } from './aalogging.service';
import { NumberUtil } from '../autil/NumberUtil';
import { DateUtil } from '../autil/DateUtil';
import { StringUtil } from '../autil/StringUtil';
import { MathUtil } from '../autil/MathUtil';
import { zTestDataUtil } from '../autil/zTestDataUtil';
import { AasqlremoteService } from './aasqlremote.service';
import { of } from 'rxjs';
import { AaobserveService } from './aaobserve.service';

////////////////////////////// usage (샘플 - sqlchart-list 또는 dynamictable-result)
//ts 1 - constructor(private sql: SqlService (또는 new SqlService)
//ts 2 - let datas = this.sql.select(sql);
//참고.테스트 데이터 사용 - this.sql.test_data();

@Injectable({
  providedIn: 'root'
})
export class AasqlService {

  constructor(private logging:AaloggingService,private sqlremote:AasqlremoteService,private observe:AaobserveService) { }

  sqlrownum = "10";

  testmode = false;

  /////////////////////////////////////////////// rs
  rs;
  getDatas() { if(this.rs == null) return []; return this.rs; }
  setDatas(myrs)
  { 
    this.rs = myrs; 
    this.setColumns(); 
  }
  //////////////////////////////////////////////// column
  columns = [];//[{name:xxx,color:xxx},...]
  clearColumns() { this.columns = []; }
  getColumns() { return this.columns; }
  setColumns()//myrs)
  {
    this.clearColumns();
    if(this.rs == null || this.rs.length < 1) return this.columns;
    //this.columns = Object.keys(this.rs[0]);
    this.columns = Object.keys(this.rs[0]).map((column,i)=>{ return {name:column,color:'lime'}; });
  }




  //////////////////////////////////////////////// select
  //this.sql.select(sql,rs=>{ this.pubsub.pub("sqlquery.datas",rs); });
  select(sql:string,handler)
  {
    //this.logging.debug("select #testmode="+this.testmode +"#sql="+ sql);

    if(this.testmode)
    {
      this.rs = zTestDataUtil.test_data();
      //this.observe.arrayToObserve(this.rs,handler);
      this.observe.arrayToObserve(this.rs,res=>{ this.setDatas(res); handler(res); });
    }
    else 
    {
      // this.sqlremote.select(sql,handler);
      this.sqlremote.select(sql,res=>{ this.setDatas(res); handler(res); });
    }
  }

  //////////////////////////////////////////////// update
  update(sql:string,handler)
  {
    if(this.testmode)
    {
      this.observe.arrayToObserve(-1,res=>{ handler(res); });//update result = 1
    }
    else
    {
      this.sqlremote.update(sql,res=>{ handler(res); });
    }
  }

}
