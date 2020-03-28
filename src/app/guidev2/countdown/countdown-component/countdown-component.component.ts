import { Component, OnInit, Input } from '@angular/core';
import { AapubsubService } from 'src/app/aservice/aapubsub.service';
import { AaloggingService } from 'src/app/aservice/aalogging.service';
import { timer } from 'rxjs';

@Component({
  selector: 'app-countdown-component',
  templateUrl: './countdown-component.component.html',
  styleUrls: ['./countdown-component.component.less']
})
export class CountdownComponentComponent implements OnInit {

  constructor(private pubsub:AapubsubService,private logging:AaloggingService) { }

  @Input() countdown = 10;

  topicprefix = "guidev2.countdown";//this.topicprefix+".datas"

  ngOnInit() {
    this.timerStart();
  }
  ngOnDestroy() { 
    this.timerStop();
  }

  interval = 10;
  stoped = false;
  mytimer;
  timerStart()
  {
    this.mytimer = timer(1000,1000).subscribe(timercount=>{
      // this.logging.debug("======== mytimer # "+ timercount +"#stoped="+this.stoped +"#countdown="+this.countdown +"#interval="+this.interval);
      if(this.stoped == true) return;
      this.countdown = this.countdown - 1;

      if(this.countdown < 0) 
      {
        this.logging.debug("======== mytimer # "+ timercount +"#stoped="+this.stoped +"#countdown="+this.countdown +"#interval="+this.interval);
        this.countdown = this.interval;
        // this.refreshClick();
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

}
