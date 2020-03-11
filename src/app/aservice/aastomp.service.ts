import { Injectable } from '@angular/core';
import { AaloggingService } from './aalogging.service';
import { Observable, Subscription } from 'rxjs';
import {RxStomp} from '@stomp/rx-stomp';

/*
================ stomp 사용법
npm i @stomp/rx-stomp
import {RxStomp} from '@stomp/rx-stomp';

*/
@Injectable({
  providedIn: 'root'
})
export class AastompService {

  constructor(private logging:AaloggingService) { }

  url = "ws://localhost:18080/websocket";
  debug = false;
  setDebug(mydebug) { 
    this.debug = mydebug; 
    this.logging.info("============= stomp changed debug="+this.debug);
  }
  stompConfig = {
    connectHeaders: {
      login: "guest",
      passcode: "guest"
    },
    brokerURL: this.url,//"ws://localhost:18080/websocket",
    debug: function (str) {
      if(this.debug == true) console.log('### STOMP debug : ' + str);
    },
    reconnectDelay: 1000,// auto reconnect
  };

  rxStomp:RxStomp;
  connect() { this.connectUrl(this.url); }
  connectUrl(wsUrl) {
    if(this.isConnected()) 
    {
      this.logging.info("***** connect connected # "+ this.stompConfig.brokerURL);
      return;
    }
    this.stompConfig.brokerURL = wsUrl;
    this.logging.info("connect start # "+ this.stompConfig.brokerURL);
    this.rxStomp = new RxStomp();
    this.rxStomp.configure(this.stompConfig);
    this.rxStomp.activate();//connect
    this.logging.info("connect activate #connected="+ this.rxStomp.connected);

    //일단 보류 - 연결되면 sboot의 에러를 listen함
    //this.subError();
    //this.subReply();
  }
  disconnect()
  {
    this.logging.info("disconnect start # "+ this.stompConfig.brokerURL);
    this.rxStomp.deactivate();
    this.logging.info("disconnect deactivate #connected="+ this.rxStomp.connected);
    this.rxStomp = null;
  }
  isConnected() { 
    if(this.rxStomp == null) return false;
    if(this.rxStomp.connected()) return true;
    return false;
  }

  //////////////////////// pub
  //sboot에 설정된 디폴트 topic 
  //    - WebSocketConfig/config.setApplicationDestinationPrefixes("/toserver");
  //    - WebSocketController/@MessageMapping("/hello")
  pubtopic = "/toserver/hello";
  getPubTopic(){ return this.pubtopic; }
  pub(topic:string,data) {
    if(this.isConnected() == false) this.connect();
    this.logging.info("*** pub # "+ topic +":"+ JSON.stringify(data));
    //let data = {"id":"id-"+ this.no,"name" : "kwak-"+this.no };
    this.rxStomp.publish({destination: topic, body: JSON.stringify(data)});
  }

  //////////////////////// sub
  //sboot에 설정된 디폴트 topic 
  //    - WebSocketConfig/config.enableSimpleBroker("/toclient");
  //    - WebSocketController/stomp.convertAndSend("/toclient/hello", gson.toJson(map));
  subtopic = "/toclient/hello";//appdata
  getSubTopic(){ return this.subtopic; }
  subtopicApp = "/toclient/appdata";//appdata
  getSubTopicApp(){ return this.subtopicApp; }
  subscription:Subscription;
  sub(topic,handler)//:Observable<any>
  {
    if(this.isConnected() == false) this.connect();
    if(this.isSubed())
    {
      this.logging.warn("========== stomp sub already sub # "+ topic);
      return;
    }
    
    // this.substartObs = this.sub_real(topic).subscribe(handler);//unsub하기 위함
    this.subscription = this.sub_real(topic).subscribe(res=>{ //unsub하기 위함
      //if(this.debug == true) console.log('### STOMP sub : ' + JSON.stringify(res));//connect debug에서 모든 내용 출력됨
      if(res.body != null) handler(res.body);
      else this.logging.error("==== sub error - body notfound # "+ JSON.stringify(res));
    });
    return this.subscription;
  }
  isSubed() { 
    if(this.isConnected() && this.subscription !=null) return true;//&& this.subscription.closed(안됨)
    return false;
  }
  substop() {
    if(this.isSubed() == false) return;
    this.subscription.unsubscribe();
    this.subscription = null;
  }
  private sub_real(topic):Observable<any>
  {
    this.logging.info("*** sub_real start # "+ topic);
    // this.subscribeO = this.rxStomp.watch(mytopic)
    // .subscribe((payload) => {
    //   //alert("/topic/reply # "+ payload.body);
    //   this.loggingging.info("*** RECV # "+ mytopic +"]"+ payload.body);
    // });
    return this.rxStomp.watch(topic);
  }











  ///////////////////////////////// 보류
  topicSubPrefix = "/topic";//? sboot 설정관련 - sboot가 보내는 에러인가 ?
  subError()
  {
    let mytopic = this.topicSubPrefix +'/errors';
    this.rxStomp.watch(mytopic)
    .subscribe((payload) => {
      this.logging.info("*** recv # "+ mytopic +"]"+ JSON.stringify(payload.body));
    });
    mytopic = '/errors';//수신안됨 << 일단 냅둬
    this.rxStomp.watch(mytopic)
    .subscribe((payload) => {
      alert("subError 2 # "+ mytopic);//+ payload);
      //this.noti.blank( 'stomp-errors', "#payload="+JSON.stringify(payload.body),{ nzDuration: 5000 });
      this.logging.info("*** recv # "+ mytopic +"]"+ payload);
    });

    //연결실패시 발생
    this.rxStomp.webSocketErrors$.subscribe ((err)=>{ alert("---webSocketErrors#"+err); this.logging.info("*** webSocketErrors # "+ JSON.stringify(err)); });
    //아래는 모르겠음
    this.rxStomp.stompErrors$.subscribe ((err)=>{ alert("---stompErrors"); this.logging.info("*** stompErrors # "+ err) });
    this.rxStomp.unhandledFrame$.subscribe ((err)=>{ alert("---unhandledFrame"); this.logging.info("*** unhandledFrame # "+ err) });
    this.rxStomp.unhandledMessage$.subscribe ((err)=>{ alert("---unhandledMessage"); this.logging.info("*** unhandledMessage # "+ err) });
    this.rxStomp.unhandledReceipts$.subscribe ((err)=>{ alert("---unhandledReceipts"); this.logging.info("*** unhandledReceipts # "+ err) });
  }

  // subReply()//springboot에서 자동으로 동일한 topic으로 응답함(prefix는 틀림)
  // {
  //   this.sub(this.topicReply)
  //   .subscribe((payload) => {
  //     //alert("subReply # "+ this.topicReply);//+ payload);
  //     this.noti.blank( 'stomp-subReply', "#payload="+JSON.stringify(payload.body),{ nzDuration: 5000 });
  //     this.logging.info("*** recv # "+ this.topicReply +"]"+ JSON.stringify(payload.body));
  //   });
  // }

}
