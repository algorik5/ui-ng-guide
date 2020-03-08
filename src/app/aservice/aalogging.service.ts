import { Injectable, Output, EventEmitter } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { DateUtil } from '../autil/DateUtil';
import { AapubsubService } from './aapubsub.service';


@Injectable({
  providedIn: 'root'
})
export class AaloggingService {

  constructor() { }
  //constructor(private pubsub:PubsubService) { }//사용불가 - WARNING in Circular dependency detected > 필요하다면 pubsub = new PubsubService

  isDebug = true;
  debug(msg:string)
  {
    if(this.isDebug == false) return;
    console.log(DateUtil.currentDateString() +"]debug-"+ msg)
  }
  info(msg:string)
  {
    console.log(DateUtil.currentDateString() +"]info -"+ msg)
  }
  warn(msg:string)
  {
    console.log(DateUtil.currentDateString() +"]warn -"+ msg)
  }
  error(msg:string)
  {
    console.log(DateUtil.currentDateString() +"]error-"+ msg)
  }










  // private subject = new Subject<any>();
  // getObservable(): Observable<any> {
  //   return this.subject.asObservable();
  // }
  // show(visible:boolean)
  // {
  //   this.subject.next({ visible:true,type:"show",msg: "" });
  // }
  // info(msg:string)
  // {
  //   msg = DateUtil.currentDateString() +"-"+ msg;
  //   this.subject.next({ visible:false,type:"info",msg: msg });
  // }
  // error(msg:string)
  // {
  //   //this.modal.error({ nzTitle: 'error', nzContent: '[logging] msg='+ msg });

  //   msg = DateUtil.currentDateString() +"-"+ msg;
  //   this.subject.next({ visible:false,type:"error",msg: msg });
  // }





  // //이상함 > {visible:boolean,msg:string}
  // @Output() change: EventEmitter<[boolean,string,string]> = new EventEmitter();
  // zshow(visible:boolean)
  // {
  //   //this.noti.blank( 'show-start', "#visible="+visible,{ nzDuration: 50000 });
  //   this.change.emit([visible,"show",""]);
  //   //this.noti.blank( 'show-end', "#visible="+visible,{ nzDuration: 50000 });
  // }
  // Zinfo(msg:string)
  // {
  //   msg = DateUtil.currentDateString() +"-"+ msg;
  //   this.change.emit([false,"info",msg]);
  // }
  // Zerror(msg:string)
  // {
  //   msg = DateUtil.currentDateString() +"-"+ msg;
  //   this.change.emit([false,"error",msg]);
  // }

}
