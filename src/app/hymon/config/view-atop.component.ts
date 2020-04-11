import { Component, OnInit, Input } from '@angular/core';
import { AapubsubService } from 'src/app/aservice/aapubsub.service';
import { AaloggingService } from 'src/app/aservice/aalogging.service';
import { AanatsService } from 'src/app/aservice/aanats.service';

@Component({
  selector: 'app-view-atop',
  template: `
  <nz-input-group [nzSize]="'medium'">
   <div nz-col nzSpan="1"> <i nz-icon [nzType]="'arrow-left'" (click)="leftClick()"></i> </div>
   <div nz-col nzSpan="1"> <nz-divider nzType="vertical"></nz-divider> </div>

    
    <div nz-col nzSpan="4"> <input type="text" nz-input [(ngModel)]="url" /> </div>
    <div nz-col nzSpan="7">
      <nz-select [(ngModel)]="topic" nzAllowClear nzShowSearch nzPlaceHolder="Choose" style="width:100%">
        <nz-option *ngFor="let value of topiclist" [nzLabel]="value" [nzValue]="value"></nz-option>
      </nz-select>
    </div>
    <div nz-col nzSpan="3"> <button nz-button nzType="dashed" (click)="substart()">sub</button> </div>
    <div nz-col nzSpan="3"> <button nz-button nzType="dashed" (click)="substop()">connect</button> </div>
    <div nz-col nzSpan="3"> <input type="text" nz-input [(ngModel)]="recv" [disabled]="true"/></div>

    <div nz-col nzSpan="1"> <nz-divider nzType="vertical"></nz-divider> </div>
    <div nz-col nzSpan="1"> <i nz-icon [nzType]="'arrow-right'" (click)="rightClick()"></i> </div>
  </nz-input-group> 
  `,
  styles: []
})
export class ViewAtopComponent implements OnInit {//nzspan.7 nzselect ngmodel.subject nzsize.medium style.width.100%
  // <nz-divider nzType="vertical"></nz-divider>

  constructor(private pubsub:AapubsubService,private logging:AaloggingService,private nats:AanatsService) { }
  
  @Input() myname = "right";

  ngOnInit() {
    this.logging.debug("======================== "+this.constructor.name+"#myname="+this.myname);

    this.url = this.nats.getUrl();
  }

  connect()
  {
    this.nats.connect();
  }
  recv = -1;
  substart()
  {
    this.nats.connect();
    this.nats.sub(this.topic,data=>{
      this.recv++;
      this.pubsub.pub("hymon.config_msgstatus.data",data);
    });
  }
  substop()
  {
    this.nats.substop(this.topic);
  }

  buttonStatus = "-";
  url = "--";
  topic = "test.server.all";
  topiclist = [
    "test.server.all"
    ,"_LOCAL.LAKE.REAL.LAKE.ADAPTER.AGENT.SERVER"
    ,"_LOCAL.LAKE.REAL.LAKE.ADAPTER.AGENT.PROCESS"
    ,"_LOCAL.LAKE.REAL.LAKE.MON.MON.STATUS"
  ];

  leftClick() {
    this.pubsub.pub(this.myname+".showleft","fire");

  }
  rightClick() {
    this.pubsub.pub(this.myname+".localstorage","fire");

  }

}
