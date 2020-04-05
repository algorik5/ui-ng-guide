import { Injectable } from '@angular/core';
import { AaloggingService } from './aalogging.service';

import ResClient from 'resclient';
import { StringUtil } from '../autil/StringUtil';

@Injectable({
  providedIn: 'root'
})
export class AanatsService {

  constructor(private logging:AaloggingService) { }

  url = "ws://localhost:14223";
  client:ResClient;

  getUrl() { return this.url; }
  setUrl(myurl) { this.url = myurl; }
  connect()
  {
    if(this.client == null)
    {
      this.logging.debug("#################### ResClient start # "+ this.url);
      this.client = new ResClient(this.url);
      this.logging.debug("#################### ResClient client # "+ this.client.getHostUrl());
      // this.client.on((event,handler)=>{//connect,disconnect,error
      //   this.logging.debug("\t === on # ");//+event +":"+ handler);
      // });
    }
  }
  disconnect()//not test
  {
    this.logging.info("disconnect start # "+ this.client.getHostUrl());
    this.client.disconnect(); 
    this.logging.info("disconnect deactivate #connected="+ this.client.isConnected);
    this.client = null;
  }
  isConnected() { 
    // if(this.rxStomp == null) return false;
    // if(this.rxStomp.connected()) return true;
    // return false;
  }

  sub(topic,handler)
  {
    let topicprefix = StringUtil.substringBeforeLast(topic,".");
    let topiclast = StringUtil.substringAfterLast(topic,".");
    this.logging.info("sub -------- "+"#topicprefix="+ topicprefix +"#topiclast="+ topiclast);
    let no = 0;
    this.client.get(topicprefix).then(status => {
      this.logging.debug("=== (get) MSG # "+JSON.stringify(status));//JSON.stringify(model));
      status.on(topiclast,(data)=>{
        this.logging.debug("\t === (mytype) MSG # "+JSON.stringify(data));//;
        handler(data);
      });
    }).catch(err => {
      this.logging.debug("### error # "+JSON.stringify(err));
    });
  }




  //////////////////////////////////////////////////////////////// test
  test_pub()
  {
    // this.createClient();
    // this.client.get("test.1").then(model => {
    //   this.logging.debug("=== (get) MSG # "+JSON.stringify(model));
    //   model.on("change",()=>{
    //     this.logging.debug("\t === (change) MSG # "+JSON.stringify(model));
    //   });
    // }).catch(err => {
    //   this.logging.debug("### error # "+JSON.stringify(err));
    // });
  }
  test_sub() 
  {
    this.connect();
    let no = 0;
    this.client.get("test.1").then(status => {
      this.logging.debug("=== (get) MSG # "+JSON.stringify(status));//JSON.stringify(model));
      // this.form.setControlValue("test_recv",JSON.stringify(status));
      status.on("mytype",(data)=>{
        this.logging.debug("\t === (mytype) MSG # "+JSON.stringify(data));//;
        // this.form.setControlValue("test_recv",JSON.stringify(data));
        // this.test_stat_title = "recv";
        // no++; this.test_stat = ""+ no;
      });
    }).catch(err => {
      this.logging.debug("### error # "+JSON.stringify(err));
    });
  }

}
