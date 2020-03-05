import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoggingService } from './logging.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private logging:LoggingService,private http: HttpClient) { }

  // this.http.get<any>(myurl)
    // .subscribe((res) => {
    //   this.logging.info("getApplications res >>> "+ JSON.stringify(res));//object
    // },(error: HttpErrorResponse) => { this.logging.error("ERROR-"+ JSON.stringify(error) ); })
//simple > return this.http.get<any>(this.url);
    //post   > return this.http.post(this.url, payload, {
    //text로 리턴 > return this.http.get(this.url, { responseType: 'text' }) <<< ng7에서 안됨
    //full html 리턴 > this.http.get<any>(this.url, { observe: 'response' } <<< 
    //return this.http.get<any>(this.findTablesUrl, {
      //params: new HttpParams().set('prefix', 'TABLE%DATA'),
      //headers: new HttpHeaders({'Authorization':'some-token'}) })
      //---headers: new HttpHeaders() }//.set('Authorization', 'some-token') }
      //simple > .subscribe( res => this.tables = res );
      //error  > .subscribe( (res) => { this.datas = res; }, (error: HttpErrorResponse) => { console.log(JSON.stringify(error); }
     //);


     

  getAny(myurl)
  {
    //let myurl = this.ftlurl + this.api_monitoring;
    this.logging.info("getAny myurl >>> "+ myurl);
    return this.http.get<any>(myurl);
  }





  url = "http://localhost:18081";
  prefix = "/api/v1/";


  test_url = "test";
  test_get()
  {
    let myurl = this.url + this.prefix + this.test_url;
    return this.http.get<any>(myurl);
  }

}
