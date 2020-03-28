import { Component, OnInit, OnDestroy } from '@angular/core';
import { timer } from 'rxjs';
import { AapubsubService } from 'src/app/aservice/aapubsub.service';
import { AaloggingService } from 'src/app/aservice/aalogging.service';

@Component({
  selector: 'app-dashboard-atop',
  templateUrl: './dashboard-atop.component.html',
  styleUrls: ['./dashboard-atop.component.less']
})
export class DashboardAtopComponent implements OnInit,OnDestroy {

  constructor(private pubsub:AapubsubService,private logging:AaloggingService) { }

  topicprefix = "hymon.dashboard";//this.topicprefix+".datas"

  ngOnInit() {
    this.pubsub.pub("app.showmenu","fire");
    this.timerInit();
  }
  ngOnDestroy() { 
    if(this.mytimer != null) { 
      this.logging.debug("======== mytimer STOP - ngOnDestroy # ");
      this.mytimer.unsubscribe(); 
      this.mytimer = null; 
    }
  }

  interval = 10;
  countdown = this.interval;
  stoped = false;
  mytimer;
  timerInit()
  {
    this.mytimer = timer(1000,1000).subscribe(timercount=>{
      // this.logging.debug("======== mytimer # "+ timercount +"#stoped="+this.stoped +"#countdown="+this.countdown +"#interval="+this.interval);
      if(this.stoped == true) return;
      this.countdown = this.countdown - 1;

      if(this.countdown < 0) 
      {
        this.logging.debug("======== mytimer # "+ timercount +"#stoped="+this.stoped +"#countdown="+this.countdown +"#interval="+this.interval);
        this.refreshClick();
      }
    });
  }


  changeClick(myinterval) { this.stoped = false; this.interval = myinterval; this.countdown = this.interval; }
  stopClick() { this.stoped = true; this.countdown = this.interval; }
  refreshClick() {
    this.countdown = this.interval; 
    this.pubsub.pub(this.topicprefix+".refresh","fire");
  }

  leftClick()
  {
    this.pubsub.pub(this.topicprefix+".showleft","fire");
  }
  rightClick()
  {
    this.pubsub.pub(this.topicprefix+".showright","fire");
  }

}
