import { Injectable } from '@angular/core';
import { AaloggingService } from './aalogging.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { JSONUtil } from '../autil/JSONUtil';

@Injectable({
  providedIn: 'root'
})
export class AasqlremoteService {

  constructor(private logging:AaloggingService,private http: HttpClient) { }

  // setUrl(myurl) { 
  //   this.url = myurl; 
  //   this.logging.info("sqlremote]setUrl "+"#url="+this.url);
  // }
  rownum = 10;
  setRownum(myrownum) { 
    this.rownum = myrownum; 
    this.logging.info("sqlremote]setRownum "+"#rownum="+this.rownum);
  }

  url_select = "http://localhost:18080/dynamicsql/dynamicSelect";
  //this.sqlremote.select(sql,res=>{ });
  select(sql,handler)
  {
    //this.logging.debug("sqlremote]select start "+"#sql="+sql);
    let params = new HttpParams().set("sql",sql).set("rownum",""+this.rownum);
    //this.http.get<any>(this.url,{params:params}).subscribe(handler//OK
    this.http.get<any>(this.url_select,{params:params}).subscribe(
      res=>{ this.logging.debug("sqlremote]select res "+"#sql="+sql +"#res="+JSONUtil.stringify(res)); handler(res); }
      ,err=>{ this.logging.error("sqlremote]select ERROR "+"#sql="+sql +"#error="+JSONUtil.stringify(err)); }
    );
  }

  url_update = "http://localhost:18080/dynamicsql/dynamicUpdate";
  update(sql,handler)
  {
    //this.logging.debug("sqlremote]select start "+"#sql="+sql);
    let params = new HttpParams().set("sql",sql).set("rownum",""+this.rownum);
    //this.http.get<any>(this.url,{params:params}).subscribe(handler//OK
    this.http.get<any>(this.url_update,{params:params}).subscribe(
      res=>{ this.logging.debug("sqlremote]update res "+"#sql="+sql +"#res="+JSONUtil.stringify(res)); handler(res); }
      ,err=>{ this.logging.error("sqlremote]update ERROR "+"#sql="+sql +"#error="+JSONUtil.stringify(err)); }
    );
  }
}
