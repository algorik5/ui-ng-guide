import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, OnChanges } from '@angular/core';
import { AapubsubService } from 'src/app/aservice/aapubsub.service';
import { AaloggingService } from 'src/app/aservice/aalogging.service';
import { timer } from 'rxjs';

@Component({
  selector: 'app-acountdown',
  templateUrl: './acountdown.component.html',
  styleUrls: ['./acountdown.component.less']
})
export class AcountdownComponent implements OnInit,OnDestroy {//,OnChanges {

  constructor(private pubsub:AapubsubService,private logging:AaloggingService) { }

  @Input() myname = "countdown";
  @Input() interval = 10;
  @Input() startup = false;
  ngOnInit() {
    this.logging.debug("======================== "+this.constructor.name+"#myname="+this.myname+"#interval="+this.interval);
    this.countdown = this.interval;
    this.pubsub.sub(this.myname+".countdowninterval",data=>{
      this.logging.debug("======== interval change # "+"#myname="+ this.myname +"#interval="+this.interval+"#countdown="+this.countdown);
      this.interval = data;
      this.countdown = data;
      this.timerStart();
    });

    if(this.startup) this.timerStart();
  }
  ngOnDestroy() { 
    this.timerStop();
  }

  countdown = -1;
  stoped = false;
  mytimer;
  timerStart()
  {
    if(this.mytimer != null) return;
    this.countdown = this.interval;
    this.mytimer = timer(1000,1000).subscribe(timercount=>{
      if(this.stoped == true) return;
      this.countdown = this.countdown - 1;

      if(this.countdown <= 0) 
      {
        this.logging.debug("======== mytimer # "+ timercount +"#myname="+this.myname+"#stoped="+this.stoped +"#countdown="+this.countdown +"#interval="+this.interval);
        this.refreshClick();
      }
    });
  }
  timerStop()
  {
    if(this.mytimer != null) { 
      this.logging.debug("======== mytimer STOP # "+"#myname="+this.myname);
      this.mytimer.unsubscribe(); 
      this.mytimer = null; 
    }
  }
  refreshClick()
  {
    this.pubsub.pub(this.myname+".countdownfire","fire");
    this.countdown = this.interval;
  }

}
