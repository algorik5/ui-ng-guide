import { Injectable } from '@angular/core';
import { EChartOption, ECharts } from 'echarts';
import { DateUtil } from '../autil/DateUtil';
import { NumberUtil } from '../autil/NumberUtil';
import { StringUtil } from '../autil/StringUtil';
import { MathUtil } from '../autil/MathUtil';
import { LoggingService } from './logging.service';
import { zTestDataUtil } from '../autil/zTestDataUtil';

@Injectable({
  providedIn: 'root'
})
export class EchartsService {

  constructor(private logging:LoggingService) { }
    /////////////////////////// 사용법
    /*  
      ///////1 html
      <div echarts [options]="chartoptions" (chartInit)="chartinit($event)"></div>
      ///////2 ts
      chartoptions:EChartOption = {};//주의 - null로 선언되면 chartinit 호출안됨
      chartinit(event) { 
        this.chart.initChart(event); 
        this.chartoptions = this.chart.getChartOption(); 
        this.chart.test_adddata();
      }
  */


  /////////////////////////// ngx-charts
  initChart(event) { 
    this.logging.debug("===initChart start #event="+event);
    this.setChartInstance(event); 
  }

  chartoptions:EChartOption = {
    //title: { text: 'test chart' },
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'time' },
    yAxis: { type: 'value',},// boundaryGap: [0, '100%'], },
    legend: { data:[] },
    series: [],//[{ name: 'Mocking Data', type: 'line', data: this.data }]
  };
  getChartOption() { return this.chartoptions; }

  chartinstance: ECharts;
  setChartInstance(instance) { 
    this.logging.debug("===setChartInstance start #instance="+instance);// +":"+ arguments.callee.toString());
    this.chartinstance = instance;
  }

  clearChart()
  {
    this.chartoptions.legend.data = [];
    this.chartoptions.series = [];
    this.chartinstance.clear();
  }

  maxrow = 10;
  addData(data)//{legend:host,x:date,y:value}
  {
    let legend = data["legend"];
    let x = data["x"];
    let y = data["y"];
  }
  addDataRow(legend,x,y)
  {
    this.logging.debug("===addDataRow start #legend="+legend +"#x="+x +"#y="+y);
    let series = this.chartoptions.series.find(o=>o["name"]==legend);
    if(series == null)
    {
      this.chartoptions.legend.data.push(legend);
      let nextindex = this.chartoptions.series.push({type:"line",name:legend,data:[]});
      series = this.chartoptions.series[nextindex-1];
    }
    if(series["data"].length > this.maxrow) series["data"].shift();
    series["data"].push([x,y]);
    this.chartinstance.setOption(this.chartoptions);
  }

  ////////////////////////////// test data
  test_data()
  {
    let datas = zTestDataUtil.test_data();
    datas.forEach((data,i)=>{
      this.addDataRow(data["host"],data["date"],data["cpu"]);//data["memory"]
    });
  }
}
