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

    <app-acountdown [myname]="myname" [interval]="10" [startup]="true"></app-acountdown>

    <i nz-icon [nzType]="'arrow-right'" (click)="rightClick()"></i>
  </nz-page-header-extra>
</nz-page-header>
  `,
  styles: []
})
export class ViewAtopComponent implements OnInit {

  constructor(private pubsub:AapubsubService,private logging:AaloggingService) { }

  @Input() myname = "top";

  ngOnInit() {
    this.logging.debug("======================== "+this.constructor.name+"#myname="+this.myname);
    this.pubsub.pub("app.showmenu","fire");
  }
  ngOnDestroy() { 
  }

  leftClick()
  {
    this.pubsub.pub(this.myname+".showleft","fire");
  }
  rightClick()
  {
    this.pubsub.pub(this.myname+".showright","fire");
  }

}
