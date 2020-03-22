import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { AasqllocalService } from 'src/app/aservice/aasqllocal.service';
import { AapubsubService } from 'src/app/aservice/aapubsub.service';
import { AaloggingService } from 'src/app/aservice/aalogging.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {

  constructor(private sqllocal:AasqllocalService,private pubsub:AapubsubService,private logging:AaloggingService) { }

  ngOnInit() {
    this.timerInit();
  }

  timerInit()
  {
    let mytimer = timer(1000,10000);
    mytimer.subscribe(count=>{
        this.logging.debug("======== mytimer # "+ count);
        // this.server_cpu_max();
        let color = "black"; if(count%3==0) color = "red";
        let stat = {title:"cpu-max",value:count,suffix:"host-x",color:color,icon:"like"}
        this.pubsub.pub("hymon.dashboard-server-cpu-max.data",stat);
    
        let stat2 = {title:"memory-max",value:count*2,suffix:"host-xx",color:color,icon:"like"}
        this.pubsub.pub("hymon.dashboard-server-memory-max.data",stat2);
    
    });
  }
  server_cpu_max()
  {
    // let query = "SELECT * FROM server WHERE cpu = (SELECT max(cpu) FROM server) limit 1";//select max(cpu) from server
    // let rs = this.sqllocal.select(query);
    // let color = "lime"; if(rs["cpu"]>50) color = "red";
    // let stat = {title:"cpu-max",value:rs["cpu"],suffix:rs["host"],color:color,icon:"like"}
    // this.pubsub.pub("hymon.dashboard-server-cpu-max.data",stat);
  }
}
