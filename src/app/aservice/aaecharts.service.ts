import { Injectable } from '@angular/core';
import { EChartOption, ECharts } from 'echarts';
import { DateUtil } from '../autil/DateUtil';
import { NumberUtil } from '../autil/NumberUtil';
import { StringUtil } from '../autil/StringUtil';
import { MathUtil } from '../autil/MathUtil';
import { AaloggingService } from './aalogging.service';
import { zTestDataUtil } from '../autil/zTestDataUtil';

@Injectable({
  providedIn: 'root'
})
export class AaechartsService {

  constructor(private logging:AaloggingService) { }

  /////////////////////////// ngx-charts
  chartoptions:EChartOption = { //주의 - null이면 chartinit 호출안됨
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
    if(this.chartinstance == null) return;//setChartInstance가 addDataRow보다 늦게 호출될수있음
    this.chartinstance.clear();
  }

  maxrow = 10;
  addDatas(datas) { datas.forEach(data=>this.addData(data)) }
  addData(data)//{legend:host,x:date,y:value}
  {
    let legend = data["legend"];
    let x = data["x"];
    let y = data["y"];
    this.addDataRow(legend,x,y);
  }
  addDataRows(datas) { datas.forEach(data=>this.addDataRow(data["legend"],data["x"],data["y"])) }
  addDataRow(legend,x,y)
  {
    this.logging.debug("===chart addDataRow start #legend="+legend +"#x="+x +"#y="+y);
    //if(x instanceof Date)
    let series = this.chartoptions.series.find(o=>o["name"]==legend);
    if(series == null)
    {
      this.chartoptions.legend.data.push(legend);
      let nextindex = this.chartoptions.series.push({type:"line",name:legend,data:[]});
      series = this.chartoptions.series[nextindex-1];
    }
    if(series["data"].length > this.maxrow) series["data"].shift();
    series["data"].push([x,y]);
    if(this.chartinstance == null) return;//setChartInstance가 addDataRow보다 늦게 호출될수있음
    this.chartinstance.setOption(this.chartoptions);
  }

  ////////////////////////////// test data
  testmode = true;
  test_data()
  {
    if(this.testmode == false) return;
    let datas = zTestDataUtil.test_data();
    return datas;
  }
  test_createchartdatas()
  {
    let datas = zTestDataUtil.test_data();
    let chartdatas = [];
    datas.forEach((data,i)=>{
      chartdatas.push({legend:data["host"],x:data["date"],y:data["cpu"]});//data["memory"]
    });
    return chartdatas;
  }
  test_adddatas()
  {
    let datas = zTestDataUtil.test_data();
    datas.forEach((data,i)=>{
      this.addDataRow(data["host"],data["date"],data["cpu"]);//data["memory"]
    });
  }





  // /////////////////////////////// echarts
  // linechartoptions = {
  //   title: { text: 'cpu trend'},
  //   xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
  //   yAxis: { type: 'value' },
  //   series: [{ data: [820, 932, 901, 934, 1290, 1330, 1320], type: 'line' }]
  // };
  
}
