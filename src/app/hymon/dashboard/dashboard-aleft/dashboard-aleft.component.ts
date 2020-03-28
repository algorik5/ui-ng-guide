import { Component, OnInit, OnDestroy } from '@angular/core';
import { AapubsubService } from 'src/app/aservice/aapubsub.service';
import { AaloggingService } from 'src/app/aservice/aalogging.service';

@Component({
  selector: 'app-dashboard-aleft',
  templateUrl: './dashboard-aleft.component.html',
  styleUrls: ['./dashboard-aleft.component.less']
})
export class DashboardAleftComponent implements OnInit {

  constructor(private pubsub:AapubsubService,private logging:AaloggingService) { }

  topicprefix = "hymon.dashboard";//this.topicprefix+".datas"

  ngOnInit() {
    this.pubsub.sub(this.topicprefix+".showleft",datas=>{
      this.open();
    });
  }

  visible = false;
  place = "left";

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }
}
