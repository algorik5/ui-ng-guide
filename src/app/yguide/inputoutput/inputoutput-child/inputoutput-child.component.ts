import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, OnChanges } from '@angular/core';
import { AapubsubService } from 'src/app/aservice/aapubsub.service';
import { AaloggingService } from 'src/app/aservice/aalogging.service';
import { timer } from 'rxjs';

@Component({
  selector: 'app-inputoutput-child',
  templateUrl: './inputoutput-child.component.html',
  styleUrls: ['./inputoutput-child.component.less']
})
export class InputoutputChildComponent implements OnInit,OnDestroy,OnChanges {

  constructor(private pubsub:AapubsubService,private logging:AaloggingService) { }

  //////////////////// 외부
  @Input() interval = 10;
  @Output() fireEvent : EventEmitter<number> = new EventEmitter();

  //////////////////// (잘안됨-무시) 외부 - 양방향 (getter,setter) --- [(countdown)]=mycountdown
  private countdown = -1;
  // @Input() get countdown () { return this.countdowntemp; }
  // @Output() countdownEvent : EventEmitter<number> = new EventEmitter();
  // @Input() set countdown (val) { this._countdown = val; }//this.countdownEvent.emit(this.countdowntemp); }

  //////////////////// 내부
  topicprefix = "guidev2.countdown";//this.topicprefix+".datas"

  ngOnInit() {
    // this.timerStart();
  }
  ngOnDestroy() { 
    this.timerStop();
  }
  ngOnChanges() {//주의 - 부모에서 값설정시 호출됨([interval]=...)
    console.log("---ngOnChanges --- " +"#interval="+this.interval+"#countdown="+this.countdown);
    this.countdown = this.interval;
    this.timerStart();
  }

  stoped = false;
  mytimer;
  timerStart()
  {
    console.log(">>>>>>>>>>>>>>>>>. timerStart --- " +"#interval="+this.interval+"#countdown="+this.countdown);
    if(this.mytimer != null) return;
    this.countdown = this.interval;
    this.mytimer = timer(1000,1000).subscribe(timercount=>{
      // this.logging.debug("======== mytimer # "+ timercount +"#stoped="+this.stoped +"#countdown="+this.countdown +"#interval="+this.interval);
      if(this.stoped == true) return;
      // if(this.countdown > this.interval) this.countdown = this.interval;//interval이 변경되었으면
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
    this.fireEvent.emit(this.countdown);
    this.countdown = this.interval;
  }

}
