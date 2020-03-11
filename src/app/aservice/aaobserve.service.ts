import { Injectable } from '@angular/core';
import { of, Subject, from, Subscription } from 'rxjs';
import { map, filter, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { AaloggingService } from './aalogging.service';
import { JSONUtil } from '../autil/JSONUtil';

@Injectable({
  providedIn: 'root'
})
export class AaobserveService {

  constructor(private http: HttpClient,private logging:AaloggingService) { }

  //array를 aysnc로 변환함 > 
  //사용법 : arrayToObserve(datas,res=>{});
  arrayToObserve(mydatas,handler)
  {
    let observe = of(mydatas);//of는 1번만 subscribe호출(res==mydatas)
    //observe.subscribe(handler);//OK
    observe.subscribe(
      res=>{ this.logging.debug("observe]arrayToObserve res #res="+JSONUtil.stringify(res)); handler(res); }
      ,err=>{ this.logging.error("observe]arrayToObserve ERROR #error="+JSONUtil.stringify(err)); }
    );

    //test
    // let observe = of([1,2,3]);
    // observe.subscribe(res=>{ console.log("###res="+res)});//[1,2,3]
  }
  arrayToObserveByRow(mydatas,handler)
  {
    let observe = from(mydatas);//from은 array갯수만큼 subscribe호출(res==mydata)
    // observe.subscribe(handler);
    observe.subscribe(
      res=>{ this.logging.debug("observe]arrayToObserveByRow res #res="+JSONUtil.stringify(res)); handler(res); }
      ,err=>{ this.logging.error("observe]arrayToObserveByRow ERROR #error="+JSONUtil.stringify(err)); }
    );

    //test
    // let observe = from([1,2,3]);
    // observe.subscribe(res=>{ console.log("###res="+res)});//1>2>3
  }



  /////////////////////////////// test
  test_observe_of() {
    const myObservable = of(1, 2, 3);//1>2>3 <<< of는 args순서대로 리턴
    //const myObservable = of([1, 2, 3]);//[1,2,3] <<< 1개로 리턴

    let subscription: Subscription = myObservable.subscribe(
      res => console.log("=== #res="+res),//next:res
      err => console.log("=== #error="+err),//error:err
      () => console.log("=== completed # "),//complete:()
    );
    subscription.unsubscribe();
  }
  test_observe_from() {
    const myObservable = from([1, 2, 3]);//1>2>3

    myObservable.subscribe(
      res => console.log("=== #res="+res),//next:res
      err => console.log("=== #error="+err),//error:err
      () => console.log("=== completed # "),//complete:()
    );

    myObservable
    .pipe(
      map(res => res * 2), // 2, 4, 6, 8, 10
      filter(res => res > 5), // 6, 8, 10
      tap(res => console.log(res)) // 6, 8, 10
    )
    .subscribe(
      res => console.log("=== #res="+res),//next:res
      err => console.log("=== #error="+err),//error:err
      () => console.log("=== completed # "),//complete:()
    );

  }
  test_subject()
  {
    let subject = new Subject();
    subject.subscribe(
      res => console.log("===res="+res),
      err => console.error("===error="+err),
      () => console.log('===complete'),
    );
    subject.subscribe(
      res => console.log("===2 res="+res),
      err => console.error("===2 error="+err),
      () => console.log('===2 complete'),
    );
    subject.next('item');
    subject.complete();
  }
  test_form()//OK
  {
    //import { FormControl } from '@angular/forms';
    // let input: FormControl = new FormControl('');
    // input.valueChanges.subscribe(//valueChanges==observable
    //   res => console.log("===res="+res),
    //   err => console.error("===error="+err),
    //   () => console.log('===complete'),
    // );
  }
  test_http()
  {
    this.http.get<any>("http://localhost:18080/xxx").subscribe(
      res => console.log("===res="+res),
      err => console.error("===error="+err),
      () => console.log('===complete'),
    );
  }
  test_others()
  {
    //https://gracefullight.dev/2019/04/30/RxJS%EC%9D%98-%EB%AA%A8%EB%93%A0-%EA%B2%83/
    //range
    //interval
    //timer
    //EMPTY
    //NEVER
    //first last take takelast takeuntil ...
    //skip
    //distinct
    //sample
    //mergeMap concatMap switchMap 
    //scan
    //groupby partition
    //buffer
    //windwow

  }
}
