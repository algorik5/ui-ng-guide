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
export class AaechartsBarService {

  constructor(private logging:AaloggingService) { }




  ///////////////////// kwak-bar
  testbarNames = ['host-1', 'host-2', 'host-3'];
  testbarValues = [1,2,3];
  // barData = [{key:"Mon",value:5},{key:"Tue",value:20}];
  chartoptions:EChartOption = {
    legend: { data:[] }//['server'] }
    ,series: []//[{ name: 'server', type: 'bar', data: this.testbarValues }]//this.barData
    ,xAxis: { data:[]}// data: this.testbarNames }
    ,yAxis: {}//[{ type: 'value' }]
   };



  /////////////////////////// ngx-charts
  // chartoptions:EChartOption = { //주의 - null이면 chartinit 호출안됨
  //   //title: { text: 'test chart' },
  //   tooltip: { trigger: 'axis' },
  //   xAxis: { type: 'category' },//line(time),bar(category)
  //   yAxis: { type: 'value',},// == line
  //   legend: { data:[] },
  //   series: [],//[{ name: 'Mocking Data', type: 'line', data: this.data }]
  // };
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
      let nextindex = this.chartoptions.series.push({type:"bar",name:legend,data:[]});
      series = this.chartoptions.series[nextindex-1];
    }

    ///////////////////// kwak-bar - line 주석
    // if(series["data"].length > this.maxrow) series["data"].shift();
    // series["data"].push([x,y]);

    ///////////////////// kwak-bar
    // let xAxis = this.chartoptions.xAxis["data"].find(o=>o==x);
    let index = this.chartoptions.xAxis["data"].indexOf(x);
    if(index<0)//xAxis == null)
    {
      this.chartoptions.xAxis["data"].push(x);
      series["data"].push(y);
    }
    else
    {
      series["data"][index] = y;//해당 위치의 값을 변경
    }

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



  
}
