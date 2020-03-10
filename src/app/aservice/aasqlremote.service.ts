import { Injectable } from '@angular/core';
import { AaloggingService } from './aalogging.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { JSONUtil } from '../autil/JSONUtil';

@Injectable({
  providedIn: 'root'
})
export class AasqlremoteService {

  constructor(private logging:AaloggingService,private http: HttpClient) { }

  url = "http://localhost:18080/dynamicsql/dynamicSelect";
  setUrl(myurl) { 
    this.url = myurl; 
    this.logging.info("sqlremote]setUrl "+"#url="+this.url);
  }
  rownum = 10;
  setRownum(myrownum) { 
    this.rownum = myrownum; 
    this.logging.info("sqlremote]setRownum "+"#rownum="+this.rownum);
  }

  //this.sqlremote.select(sql,res=>{ });
  select(sql,handler)
  {
    let params = new HttpParams().set("sql",sql).set("rownum",""+this.rownum);
    this.http.get<any>(this.url,{params:params}).subscribe(handler
      // res=>{ 
      //   this.logging.debug("sqlremote]select "+"#res="+JSONUtil.stringify(res));
      //   handler(res);
      // }
      ,err=>{ this.logging.error("sqlremote]select ERROR "+"#sql="+sql +"#error="+JSONUtil.stringify(err)); }
    );
  }
}
// this.pubsub.pipe(//asObservable().
// filter(data=> { 
//   if(data["key"]==topic) 
//   {
//     this.logging.debug("sub #topic="+topic + "#data="+data);
//     return true; 
//   }
//   return false; 
// }),
// map(data=>data["value"])
// ).subscribe(handler);
