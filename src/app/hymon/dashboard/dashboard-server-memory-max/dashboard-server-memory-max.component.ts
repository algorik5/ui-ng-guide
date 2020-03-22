import { Component, OnInit } from '@angular/core';
import { AapubsubService } from 'src/app/aservice/aapubsub.service';
import { AaloggingService } from 'src/app/aservice/aalogging.service';

@Component({
  selector: 'app-dashboard-server-memory-max',
  templateUrl: './dashboard-server-memory-max.component.html',
  styleUrls: ['./dashboard-server-memory-max.component.less']
})
export class DashboardServerMemoryMaxComponent implements OnInit {

  topicprefix = "hymon.dashboard-server-memory-max";//this.topicprefix+".datas"
  
  constructor(private pubsub:AapubsubService,private logging:AaloggingService) { }

  ngOnInit() {

    this.pubsub.sub(this.topicprefix+".data",data => {//{title:"t1",value:"v1",suffix:"s1",color:"lime",icon:"like"}
      this.stat = data;
    });

    // this.chartInit();
  }

  stat = {title:"t1",value:"v1",suffix:"s1",color:"black",icon:"like"};


}
