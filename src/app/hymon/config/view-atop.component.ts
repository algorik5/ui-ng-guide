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
    <div nz-col nzSpan="3"> <button nz-button nzType="dashed" (click)="connect()">connect</button> </div>
    <div nz-col nzSpan="4"> <input type="text" nz-input [(ngModel)]="subject" /> </div>
    <div nz-col nzSpan="3"> <button nz-button nzType="dashed" (click)="sub()">sub</button> </div>
    <div nz-col nzSpan="6"> </div>

    <div nz-col nzSpan="1"> <nz-divider nzType="vertical"></nz-divider> </div>
    <div nz-col nzSpan="1"> <i nz-icon [nzType]="'arrow-right'" (click)="rightClick()"></i> </div>
  </nz-input-group>
  `,
  styles: []
})
export class ViewAtopComponent implements OnInit {
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
  sub()
  {
    this.nats.connect();
    this.nats.sub(this.subject,data=>{
      
    });
  }
  
  buttonStatus = "-";
  url = "--";
  subject = "test.server.change";

  leftClick() {
    this.pubsub.pub(this.myname+".showleft","fire");

  }
  rightClick() {
    this.pubsub.pub(this.myname+".localstorage","fire");

  }

}
