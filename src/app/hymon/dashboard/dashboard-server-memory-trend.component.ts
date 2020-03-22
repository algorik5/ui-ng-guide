
import { Component, OnInit } from '@angular/core';
import { EChartOption } from 'echarts';
import { AaechartsService } from 'src/app/aservice/aaecharts.service';
import { AapubsubService } from 'src/app/aservice/aapubsub.service';
import { AaloggingService } from 'src/app/aservice/aalogging.service';
import { DateUtil } from 'src/app/autil/DateUtil';
import { MathUtil } from 'src/app/autil/MathUtil';

@Component({
  selector: 'app-dashboard-server-memory-trend',
  template: `
  <div echarts [options]="getChartOptions()" (chartInit)="setChartInstance($event)" style="height:300px;"></div>
  `,
  styles: []
  ,providers: [AaechartsService]
})
export class DashboardServerMemoryTrendComponent implements OnInit {

  constructor(private chart:AaechartsService,private pubsub:AapubsubService,private logging:AaloggingService) { }

  topicprefix = "hymon.dashboard-server-memory-trend";//this.topicprefix+".datas"

  ngOnInit() {

	////////////////////////////////////////////////////////// chart  
    this.pubsub.sub(this.topicprefix+".datas",datas => {//[{legend:-,x:-,y:-}...
      this.chart.clearChart();
      this.chart.addDatas(datas);
    });
    let no = 0;
    this.pubsub.sub(this.topicprefix+".data",data => {//{legend:-,x:-,y:-}
      no++; if(no==1) this.chart.clearChart();
      this.chart.addData(data);//this.chart.addDataRow(data["host"],data["date"],data["cpu"]);//data["memory"]
    });

    this.chartInit();
  }

  ////////////////////////////////////////////////////////// chart  
  getChartOptions() { return this.chart.getChartOption(); }
  setChartInstance(event) { this.chart.setChartInstance(event); }

  chartInit()
  {
    ////////////////////////////////////////////////////////// 필수 - ngInit에서 initChart를 호출해야함
    this.chart.initChart("line");

    ////////////////////////////////////////////////////////// testdata  
    this.test_datas();
  }

  ////////////////////////////////////////////////////////// testdata  
  test_datas() { 
    this.chart.clearChart();
    let datas = this.chart.test_data();
    let chartdatas = []; datas.forEach((data,i)=>{ chartdatas.push({legend:data["host"],x:data["date"],y:data["cpu"]}); });
    // let chartdatas = []; datas.forEach((data,i)=>{ chartdatas.push({legend:"server-cpu",x:data["host"],y:data["cpu"]}); });
    this.pubsub.pub(this.topicprefix+".datas",chartdatas);//this.chart.addDatas(chartdatas);
  }
  test_no = 0;
  test_datarow() { 
    this.test_no++; let curdate = new Date(); let date = DateUtil.addDays(curdate,this.test_no);
    let legend = "host-x"; let x = date; let y = MathUtil.random(0,10);
    // let legend = "server-cpu"; let x = "host-z"; let y = MathUtil.random(0,10);
    let chartdata = {legend:legend,x:x,y:y};
    this.pubsub.pub(this.topicprefix+".data",chartdata);//this.chart.addData(chartdata);
  }

  
  // /////////////////////////////// echarts
  // linechartoptions = {
  //   title: { text: 'cpu trend'},
  //   xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
  //   yAxis: { type: 'value' },
  //   series: [{ data: [820, 932, 901, 934, 1290, 1330, 1320], type: 'line' }]
  // };
 
}
