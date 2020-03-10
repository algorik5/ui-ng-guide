import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AaloggingService } from './aalogging.service';

@Injectable({
  providedIn: 'root'
})
export class AahttpService {

  constructor(private logging:AaloggingService,private http: HttpClient) { }

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



  public async testSync() {
    this.logging.info("---------testSync BEFORE");//
    const json = await new Promise<string>(resolve => 
    {
      this.http.get<any>("assets/test_assets.json")
      .subscribe((res) => {
        this.logging.info("\t --- testSync 1 subscribe #res="+ JSON.stringify(json));//
        //반드시 resolve하는 시점에 promise가 끝나서 뒤로 진행함 >>> resolve안하면 await뒤를 진행 안함
        resolve(res);//promise가 리턴값이 있는 경우...
        this.logging.info("\t --- testSync 2 subscribe #res="+ JSON.stringify(json));//
      });
    });
    this.logging.info("---------testSync AFTER #json="+ JSON.stringify(json));//메인쓰레드는 계속 실행됨
  }

}
