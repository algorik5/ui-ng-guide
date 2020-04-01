import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { timer } from 'rxjs';
import { AapubsubService } from 'src/app/aservice/aapubsub.service';
import { AaloggingService } from 'src/app/aservice/aalogging.service';

@Component({
  selector: 'app-view-atop',
  template: `
  <nz-page-header nzBackIcon (nzBack)="leftClick()" [nzGhost]="false">
  <nz-page-header-title>Title</nz-page-header-title>
  <nz-page-header-extra>
    <button nz-button>Operation</button>

    <nz-badge [nzCount]="countdown" nzShowZero [nzStyle]="{ backgroundColor: 'red' }">
      <button nz-button nz-dropdown [nzDropdownMenu]="mymenu" [nzSize]="'small'">refresh<i nz-icon nzType="down"></i></button>
      <nz-dropdown-menu #mymenu="nzDropdownMenu">
      <ul nz-menu>
          <li nz-menu-item (click)="refreshClick()">refresh</li>
          <li nz-menu-item (click)="stopClick()">disable</li>
          <li nz-menu-item (click)="changeClick(10)">10 secs</li>
          <li nz-menu-item (click)="changeClick(30)">30 secs</li>
          <li nz-menu-item (click)="changeClick(60)">60 secs</li>
      </ul>
      </nz-dropdown-menu>
    </nz-badge>

    <i nz-icon [nzType]="'arrow-right'" (click)="rightClick()"></i>
  </nz-page-header-extra>
</nz-page-header>
  `,
  styles: []
})
export class ViewAtopComponent implements OnInit {

  constructor(private pubsub:AapubsubService,private logging:AaloggingService) { }

  @Input() parentname = "hymon"; myname = "dashboardv2";//this.parentname+"."+this.myname

  ngOnInit() {
    this.pubsub.pub("app.showmenu","fire");
    this.timerStart();
  }
  ngOnDestroy() { 
    this.timerStop();
  }

  interval = 10;
  countdown = this.interval;
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

  changeClick(myinterval) { this.stoped = false; this.interval = myinterval; this.countdown = this.interval; }
  stopClick() { this.stoped = true; this.countdown = this.interval; }
  refreshClick() {
    this.countdown = this.interval; 
    this.pubsub.pub(this.parentname+"."+this.myname+".refresh","fire");
  }

  leftClick()
  {
    this.pubsub.pub(this.parentname+"."+this.myname+".showleft","fire");
  }
  rightClick()
  {
    this.pubsub.pub(this.parentname+"."+this.myname+".showright","fire");
  }

}
