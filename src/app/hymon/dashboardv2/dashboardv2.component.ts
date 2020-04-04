import { Component, OnInit, Input } from '@angular/core';
import { timer } from 'rxjs';
import { AasqllocalService } from 'src/app/aservice/aasqllocal.service';
import { AapubsubService } from 'src/app/aservice/aapubsub.service';
import { AaloggingService } from 'src/app/aservice/aalogging.service';
import { DateUtil } from 'src/app/autil/DateUtil';
import { MathUtil } from 'src/app/autil/MathUtil';

@Component({
  selector: 'app-dashboardv2',
  templateUrl: './dashboardv2.component.html',
  styleUrls: ['./dashboardv2.component.less']
})
export class Dashboardv2Component implements OnInit {

  constructor(private sqllocal:AasqllocalService,private pubsub:AapubsubService,private logging:AaloggingService) { }

  @Input() myname = "hymon.dashboardv2";

  ngOnInit() {
    this.logging.debug("======================== "+this.constructor.name+"#myname="+this.myname);
    this.pubsub.sub(this.myname+".countdownfire",datas=>{
      this.refreshAll();
    });
  }

  testcount = 3;
  refreshAll()
  {
    this.testcount++; if(this.testcount>10) this.testcount = 3;
    this.logging.debug("======== refreshAll # "+ this.testcount);
    this.server_max();
    this.server_top();
    this.server_trend();
    this.server_table();
  }

  myname_server_max_cpu = this.myname+".server_max_cpu";
  myname_server_max_memory = this.myname+".server_max_memory";
  server_max()
  {
    let color = "black"; if(this.testcount%3==0) color = "red";
    let statdata = {title:"cpu-max",value:this.testcount,suffix:"host-x",color:color,icon:"like"};
    this.pubsub.pub(this.myname_server_max_cpu+".statdata",statdata);

    let statdata2 = {title:"memory-max",value:this.testcount*2,suffix:"host-xx",color:color,icon:"like"}
    this.pubsub.pub(this.myname_server_max_memory+".statdata",statdata2);

    // let query = "SELECT * FROM server WHERE cpu = (SELECT max(cpu) FROM server) limit 1";//select max(cpu) from server
    // let rs = this.sqllocal.select(query);
    // let color = "lime"; if(rs["cpu"]>50) color = "red";
    // let stat = {title:"cpu-max",value:rs["cpu"],suffix:rs["host"],color:color,icon:"like"}
    // this.pubsub.pub("hymon.dashboard-server-cpu-max.data",stat);
  }

  myname_server_top_cpu = this.myname+".server_top_cpu";
  myname_server_top_memory = this.myname+".server_top_memory";
  server_top()
  {
    for(let i=1;i<10;i++)
    {
      let bardata = {legend:"cpu-top",x:"host-"+i,y:this.testcount*i}
      this.pubsub.pub(this.myname_server_top_cpu+".chartdata",bardata);
    
      let bardata2 = {legend:"memory-top",x:"host-"+i,y:this.testcount*i*2}
      this.pubsub.pub(this.myname_server_top_memory+".chartdata",bardata2);
    }

    // let query = "SELECT * FROM server order by cpu desc";
    // let rs = this.sqllocal.select(query);
    // let bardata = {legend:"cpu-top",x:rs["host"],y:rs["cpu"]}
    // this.pubsub.pub("hymon.dashboard-server-cpu-top.data",bardata);
  }
  
  myname_server_trend_cpu = this.myname+".server_trend_cpu";
  myname_server_trend_memory = this.myname+".server_trend_memory";
  server_trend()
  {
    let curdate = new Date(); let date = DateUtil.addDays(curdate,this.testcount);
    for(let i=1;i<5;i++)
    {
      let legend = "host-"+i; let x = date; let y = MathUtil.random(0,10);
      let linedata = {legend:legend,x:x,y:y};
      this.pubsub.pub(this.myname_server_trend_cpu+".chartdata",linedata);

      y = MathUtil.random(0,10);
      let linedata2 = {legend:legend,x:x,y:y};
      this.pubsub.pub(this.myname_server_trend_memory+".chartdata",linedata2);
    }

    // let query = "SELECT * FROM server order by host";
    // let rs = this.sqllocal.select(query);
    // let bardata = {legend:"cpu-top",x:rs["host"],y:rs["cpu"]}
    // this.pubsub.pub("hymon.dashboard-server-cpu-top.data",bardata);
    
  }

  myname_server_table_cpu = this.myname+".server_table_cpu";
  myname_server_table_memory = this.myname+".server_table_memory";
  server_table()
  {
    let datas = []; let datas2 = [];
    let curdate = new Date(); let date = DateUtil.addDays(curdate,this.testcount);
    for(let i=1;i<5;i++)
    {
      let value = MathUtil.random(0,10);
      let data = {host:"host-x",date:date,cpu:value};
      datas = datas.concat(data);

      value = MathUtil.random(0,10);
      let data2 = {host1:"host-x",date:date,memory:value*2};
      datas2 = datas2.concat(data2);
    }
    this.pubsub.pub(this.myname_server_table_cpu+".tabledata",datas);//this.table.addDatas(data); 
    this.pubsub.pub(this.myname_server_table_memory+".tabledata",datas2);//this.table.addDatas(data);
  }

}
