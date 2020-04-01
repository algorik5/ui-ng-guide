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

  @Input() parentname = "acompo"; myname = "countdown";
  ngOnInit() {
    this.logging.debug("======================== acountdown "+"#myname="+this.myname)
    this.pubsub.sub(this.parentname+"."+this.myname+".interval",data=>{
      this.logging.debug("======== interval change # "+ "#parent="+this.parentname +"#myname="+ this.myname +"#interval="+this.interval+"#countdown="+this.countdown);
      this.interval = data;
      this.countdown = data;
      this.timerStart();
    });
  }
  ngOnDestroy() { 
    this.timerStop();
  }

  interval = 10;
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
        this.logging.debug("======== mytimer # "+ timercount +"#stoped="+this.stoped +"#countdown="+this.countdown +"#interval="+this.interval);
        this.refreshClick();
      }
    });
  }
  timerStop()
  {
    if(this.mytimer != null) { 
      this.logging.debug("======== mytimer STOP # ");
      this.mytimer.unsubscribe(); 
      this.mytimer = null; 
    }
  }
  refreshClick()
  {
    this.pubsub.pub(this.parentname+"."+this.myname+".fire","fire");
    this.countdown = this.interval;
  }

}
