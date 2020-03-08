import { Component, OnInit } from '@angular/core';
import { EchartsService } from 'src/app/aservice/echarts.service';
import { PubsubService } from 'src/app/aservice/pubsub.service';
import { LoggingService } from 'src/app/aservice/logging.service';
import { DateUtil } from 'src/app/autil/DateUtil';
import { MathUtil } from 'src/app/autil/MathUtil';

@Component({
  selector: 'app-dynamicchart-chart',
  templateUrl: './dynamicchart-chart.component.html',
  styleUrls: ['./dynamicchart-chart.component.less']
})
export class DynamicchartChartComponent implements OnInit {

  constructor(private chart:EchartsService,private pubsub:PubsubService,private logging:LoggingService) { }

  ngOnInit() {

    this.pubsub.sub("dynamicchart.datas",datas => {//[{legend:-,x:-,y:-}...
      this.chart.clearChart();
      this.chart.addDatas(datas);
    });
    this.pubsub.sub("dynamicchart.data",data => {//{legend:-,x:-,y:-}
      //this.chart.clearChart();
      this.chart.addData(data);//this.chart.addDataRow(data["host"],data["date"],data["cpu"]);//data["memory"]
    });

    this.testdata();
  }

  ////////////////////////////////////////////////////////// chart  
  getChartOptions() { return this.chart.getChartOption(); }
  setChartInstance(event) { this.chart.setChartInstance(event); }

  ////////////////////////////////////////////////////////// testdata  
  testdata() { 
    this.chart.clearChart();
    let datas = this.chart.test_data();
    let chartdatas = []; datas.forEach((data,i)=>{ chartdatas.push({legend:data["host"],x:data["date"],y:data["cpu"]}); });
    this.pubsub.pub("dynamicchart.datas",chartdatas);//this.chart.addDatas(chartdatas);
  }
  test_no = 0;
  testdata_row() { 
    this.test_no++; let curdate = new Date(); let date = DateUtil.addDays(curdate,this.test_no);
    let legend = "host-x"; let x = date; let y = MathUtil.random(0,10);
    let chartdata = {legend:legend,x:x,y:y};
    this.pubsub.pub("dynamicchart.data",chartdata);//this.chart.addData(chartdata);
  }
}
