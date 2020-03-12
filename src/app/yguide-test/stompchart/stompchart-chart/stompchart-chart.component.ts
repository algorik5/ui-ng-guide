import { Component, OnInit } from '@angular/core';
import { AaechartsService } from 'src/app/aservice/aaecharts.service';
import { AapubsubService } from 'src/app/aservice/aapubsub.service';
import { AaloggingService } from 'src/app/aservice/aalogging.service';
import { DateUtil } from 'src/app/autil/DateUtil';
import { MathUtil } from 'src/app/autil/MathUtil';

@Component({
  selector: 'app-stompchart-chart',
  templateUrl: './stompchart-chart.component.html',
  styleUrls: ['./stompchart-chart.component.less']
})
export class StompchartChartComponent implements OnInit {

  constructor(private chart:AaechartsService,private pubsub:AapubsubService,private logging:AaloggingService) { }

  topicprefix = "stompchart.stomp";//this.topicprefix+".datas"

  ngOnInit() {

  	////////////////////////////////////////////////////////// chart  
    this.pubsub.sub(this.topicprefix+".datas",datas => {//[{legend:-,x:-,y:-}...
      this.chart.clearChart();
      this.chart.addDatas(datas);
    });
    this.pubsub.sub(this.topicprefix+".data",data => {//{legend:-,x:-,y:-}
      //this.chart.clearChart();
      this.chart.addData(data);//this.chart.addDataRow(data["host"],data["date"],data["cpu"]);//data["memory"]
    });    
    this.pubsub.sub(this.topicprefix+".clear",data => {//{legend:-,x:-,y:-}
      this.chart.clearChart();
    });

    this.chartInit();
  }

  ////////////////////////////////////////////////////////// chart  
  getChartOptions() { return this.chart.getChartOption(); }
  setChartInstance(event) { this.chart.setChartInstance(event); }

  chartInit()
  {
    ////////////////////////////////////////////////////////// testdata  
    // this.test_datas();
  }

  ////////////////////////////////////////////////////////// testdata  
  test_datas() { 
    this.chart.clearChart();
    let datas = this.chart.test_data();
    let chartdatas = []; datas.forEach((data,i)=>{ chartdatas.push({legend:data["host"],x:data["date"],y:data["cpu"]}); });
    this.pubsub.pub(this.topicprefix+".datas",chartdatas);//this.chart.addDatas(chartdatas);
  }
  test_no = 0;
  test_datarow() { 
    this.test_no++; let curdate = new Date(); let date = DateUtil.addDays(curdate,this.test_no);
    let legend = "host-x"; let x = date; let y = MathUtil.random(0,10);
    let chartdata = {legend:legend,x:x,y:y};
    this.pubsub.pub(this.topicprefix+".data",chartdata);//this.chart.addData(chartdata);
  }

}
