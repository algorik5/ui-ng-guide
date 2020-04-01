import { Component, OnInit, Input } from '@angular/core';
import { EChartOption } from 'echarts';
import { AaechartsService } from 'src/app/aservice/aaecharts.service';
import { AapubsubService } from 'src/app/aservice/aapubsub.service';
import { AaloggingService } from 'src/app/aservice/aalogging.service';
import { DateUtil } from 'src/app/autil/DateUtil';
import { MathUtil } from 'src/app/autil/MathUtil';

@Component({
  selector: 'app-achart',
  templateUrl: './achart.component.html',
  styleUrls: ['./achart.component.less'],
  providers: [AaechartsService]
})
export class AchartComponent implements OnInit {

  constructor(private chart:AaechartsService,private pubsub:AapubsubService,private logging:AaloggingService) { }

  @Input() myname = "chart";
  @Input() charttype = "line";
  ngOnInit() {

    this.logging.debug("======================== AchartComponent "+"#myname="+this.myname+"#charttype="+this.charttype);
  	////////////////////////////////////////////////////////// chart  
    this.pubsub.sub(this.myname+".chartdatas",datas => {//[{legend:-,x:-,y:-}...
      this.chart.clearChart();
      // this.chart.initChart("line");
      this.chart.addDatas(datas);
    });
    // let no = 0;
    this.pubsub.sub(this.myname+".chartdata",data => {//{legend:-,x:-,y:-}
    // no++; if(no==1) this.chart.clearChart();
      this.chart.addData(data);//this.chart.addDataRow(data["host"],data["date"],data["cpu"]);//data["memory"]
    });
    this.pubsub.sub(this.myname+".chartclear",data => {
      this.chart.clearChart();
    });

    this.pubsub.sub(this.myname+".charttype",data => {
      this.chart.initChart(data);
      this.chart.clearChart();
    });

    this.chartInit();
  }

  ////////////////////////////////////////////////////////// chart  
  getChartOptions() { return this.chart.getChartOption(); }
  setChartInstance(event) { this.chart.setChartInstance(event); }

  chartInit()
  {
    ////////////////////////////////////////////////////////// 필수 - ngInit에서 initChart를 호출해야함
    this.chart.initChart(this.charttype);

  }

}
