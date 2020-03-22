import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { AasqllocalService } from 'src/app/aservice/aasqllocal.service';
import { AapubsubService } from 'src/app/aservice/aapubsub.service';
import { AaloggingService } from 'src/app/aservice/aalogging.service';
import { DateUtil } from 'src/app/autil/DateUtil';
import { MathUtil } from 'src/app/autil/MathUtil';

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
      this.server_cpu_max(count);
      this.server_cpu_top(count);
      this.server_cpu_trend(count);

      // let curdate = new Date(); let date = DateUtil.addDays(curdate,count);
      // for(let i=1;i<5;i++)
      // {
      //   let legend = "host-"+i; let x = date; let y = MathUtil.random(0,10);
      //   let linedata = {legend:legend,x:x,y:y};
      //   this.pubsub.pub("hymon.dashboard-server-cpu-trend.data",linedata);

      //   y = MathUtil.random(0,10);
      //   let linedata2 = {legend:legend,x:x,y:y};
      //   this.pubsub.pub("hymon.dashboard-server-memory-trend.data",linedata2);
      // }
    });
  }
  server_cpu_max(count)
  {
    let color = "black"; if(count%3==0) color = "red";
    let stat = {title:"cpu-max",value:count,suffix:"host-x",color:color,icon:"like"}
    this.pubsub.pub("hymon.dashboard-server-cpu-max.data",stat);

    let stat2 = {title:"memory-max",value:count*2,suffix:"host-xx",color:color,icon:"like"}
    this.pubsub.pub("hymon.dashboard-server-memory-max.data",stat2);

    // let query = "SELECT * FROM server WHERE cpu = (SELECT max(cpu) FROM server) limit 1";//select max(cpu) from server
    // let rs = this.sqllocal.select(query);
    // let color = "lime"; if(rs["cpu"]>50) color = "red";
    // let stat = {title:"cpu-max",value:rs["cpu"],suffix:rs["host"],color:color,icon:"like"}
    // this.pubsub.pub("hymon.dashboard-server-cpu-max.data",stat);
  }

  server_cpu_top(count)
  {
    for(let i=1;i<10;i++)
    {
      let bardata = {legend:"cpu-top",x:"host-"+i,y:count*i}
      this.pubsub.pub("hymon.dashboard-server-cpu-top.data",bardata);
    
      let bardata2 = {legend:"memory-top",x:"host-"+i,y:count*i*2}
      this.pubsub.pub("hymon.dashboard-server-memory-top.data",bardata2);
    }

    // let query = "SELECT * FROM server order by cpu desc";
    // let rs = this.sqllocal.select(query);
    // let bardata = {legend:"cpu-top",x:rs["host"],y:rs["cpu"]}
    // this.pubsub.pub("hymon.dashboard-server-cpu-top.data",bardata);
  }
  
  server_cpu_trend(count)
  {
    let curdate = new Date(); let date = DateUtil.addDays(curdate,count);
    for(let i=1;i<5;i++)
    {
      let legend = "host-"+i; let x = date; let y = MathUtil.random(0,10);
      let linedata = {legend:legend,x:x,y:y};
      this.pubsub.pub("hymon.dashboard-server-cpu-trend.data",linedata);

      y = MathUtil.random(0,10);
      let linedata2 = {legend:legend,x:x,y:y};
      this.pubsub.pub("hymon.dashboard-server-memory-trend.data",linedata2);
    }

    // let query = "SELECT * FROM server order by host";
    // let rs = this.sqllocal.select(query);
    // let bardata = {legend:"cpu-top",x:rs["host"],y:rs["cpu"]}
    // this.pubsub.pub("hymon.dashboard-server-cpu-top.data",bardata);
    
  }
}
