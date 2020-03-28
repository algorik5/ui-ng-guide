import { Component, OnInit } from '@angular/core';
import { AapubsubService } from 'src/app/aservice/aapubsub.service';
import { AaloggingService } from 'src/app/aservice/aalogging.service';

@Component({
  selector: 'app-dashboard-aright',
  templateUrl: './dashboard-aright.component.html',
  styleUrls: ['./dashboard-aright.component.less']
})
export class DashboardArightComponent implements OnInit {

  constructor(private pubsub:AapubsubService,private logging:AaloggingService) { }

  topicprefix = "hymon.dashboard";//this.topicprefix+".datas"

  ngOnInit() {
    this.pubsub.sub(this.topicprefix+".showright",datas=>{
      this.open();
    });
  }

  visible = false;
  place = "right";

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }
}
