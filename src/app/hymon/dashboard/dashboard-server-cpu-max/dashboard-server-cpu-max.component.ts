
import { Component, OnInit } from '@angular/core';
import { AapubsubService } from 'src/app/aservice/aapubsub.service';
import { AaloggingService } from 'src/app/aservice/aalogging.service';

@Component({
  selector: 'app-dashboard-server-cpu-max',
  templateUrl: './dashboard-server-cpu-max.component.html',
  styleUrls: ['./dashboard-server-cpu-max.component.less']
})
export class DashboardServerCpuMaxComponent implements OnInit {

  constructor(private pubsub:AapubsubService,private logging:AaloggingService) { }

  topicprefix = "hymon.dashboard-server-cpu-max";//this.topicprefix+".datas"

  ngOnInit() {

    this.pubsub.sub(this.topicprefix+".data",data => {//{title:"t1",value:"v1",suffix:"s1",color:"lime",icon:"like"}
      this.stat = data;
    });

    // this.chartInit();
  }

  stat = {title:"t1",value:"v1",suffix:"s1",color:"black",icon:"like"};

 
}
