import { Component, OnInit } from '@angular/core';
import { AapubsubService } from 'src/app/aservice/aapubsub.service';
import { AaloggingService } from 'src/app/aservice/aalogging.service';

@Component({
  selector: 'app-dashboard-process-cpu-max',
  templateUrl: './dashboard-process-cpu-max.component.html',
  styleUrls: ['./dashboard-process-cpu-max.component.less']
})
export class DashboardProcessCpuMaxComponent implements OnInit {

  topicprefix = "hymon.dashboard-process-cpu-top";//this.topicprefix+".datas"
  
  constructor(private pubsub:AapubsubService,private logging:AaloggingService) { }

  ngOnInit() {

    this.pubsub.sub(this.topicprefix+".data",data => {//{title:"t1",value:"v1",suffix:"s1",color:"lime",icon:"like"}
      this.stat = data;
    });

    // this.chartInit();
  }

  stat = {title:"t1",value:"v1",suffix:"s1",color:"lime",icon:"like"};

 
}
