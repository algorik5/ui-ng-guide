import { Injectable, EventEmitter, Output, Directive } from '@angular/core';
import { Subject } from 'rxjs';
import { filter,map } from 'rxjs/operators';
import { AaloggingService } from './aalogging.service';

//ng9 @Directive()
@Injectable({
  providedIn: 'root'
})
export class AapubsubService {

  constructor(private logging:AaloggingService) { }

  /////////////////////////// 참고자료
  //https://github.com/MRebati/angular7-pubsub/blob/master/src/angular7-pubsub.service.ts
  
  /////////////////////////// EventEmitter (extends Subject + sync/async + auto-unsubscribe)
  @Output() private pubsub: EventEmitter<any> = new EventEmitter();

  /////////////// 사용법 pub : private pubsub:PubsubService , pubsub.pub("test.1",data)
  pub(topic:string,data:any)
  {
    this.logging.debug("pub #topic="+topic + "#data="+data);
    this.pubsub.emit({key:topic,value:data});
  }

  /////////////// 사용법 sub : private pubsub:PubsubService , pubsub.sub("test.1",data=>{ console.log("sub data="+JSON.stringyfy(data)); })
  sub(topic:string,handler:any)
  {
    //this.row.subscribe(handler);
    this.pubsub.pipe(//asObservable().
      filter(data=> { 
        if(data["key"]==topic) 
        {
          this.logging.debug("sub #topic="+topic + "#data="+data);
          return true; 
        }
        return false; 
      }),
      map(data=>data["value"])
    ).subscribe(handler);
  }


  /////////////////////////// Subject
  //@Output() private test: EventEmitter<any> = new EventEmitter();
  //this.sql.test.emit(datas);
  //this.sql.test.subscribe(datas => { console.log("====== subscribe "); this.tableData = datas;  });


  /////////////////////////// Subject
  //subject = new Subject();
}
