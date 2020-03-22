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
  charttype = "";//line-디폴트
  chartoptions:EChartOption = {} //주의 - null이면 chartinit 호출안됨  
  initChart(mycharttype)//ngInit에서 반드시 호출 - 이슈 - chartoption은 미리 생성되어야 함
  {
    this.charttype = mycharttype;
    this.logging.info("================ initChart start #charttype="+ this.charttype);
    if(this.charttype=="bar") this.chartoptions = this.barchartoptions;
    else this.chartoptions = this.linechartoptions;
  }
  getChartOption() { return this.chartoptions; }//line(default)

  /////////////////////////// line
  linechartoptions:EChartOption = { //주의 - null이면 chartinit 호출안됨
    //title: { text: 'test chart' },
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'time' },
    yAxis: { type: 'value',},// boundaryGap: [0, '100%'], },
    legend: { data:[] },
    series: [],//[{ name: 'Mocking Data', type: 'line', data: this.data }]
  };
  // ,xAxis: { data:[]}// data: this.testbarNames }
  // ,yAxis: {}//[{ type: 'value' }]

  chartinstance: ECharts;
  setChartInstance(instance) { 
    this.logging.debug("===setChartInstance start #instance="+instance);// +":"+ arguments.callee.toString());
    this.chartinstance = instance;
  }

  clearChart()
  {
    // this.chartoptions = {};
    this.chartoptions.legend.data = [];
    this.chartoptions.series = [];
    if(this.charttype == "bar") this.chartoptions.xAxis["data"] = [];

    // this.clearChart_Line();
    // this.clearChart_Bar();

    if(this.chartinstance == null) return;//setChartInstance가 addDataRow보다 늦게 호출될수있음
    this.chartinstance.clear();
  }
  clearChart_Line()
  {
    this.linechartoptions.legend.data = [];
    this.linechartoptions.series = [];
  }
  clearChart_Bar()
  {
    this.barchartoptions.legend.data = [];
    this.barchartoptions.series = [];
    if(this.charttype == "bar") this.barchartoptions.xAxis["data"] = [];
  }

  maxrow = 10;
  setMaxrow(mymaxrow) { this.maxrow = mymaxrow; this.logging.debug("===chart setMaxrow "+"#maxrow="+this.maxrow); }
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
    // this.logging.debug("===chart addDataRow start "+"#charttype="+this.charttype+"#legend="+legend +"#x="+x +"#y="+y);
    //if(x instanceof Date)
    let series = this.chartoptions.series.find(o=>o["name"]==legend);
    if(series == null)
    {
      this.chartoptions.legend.data.push(legend);
      let nextindex = this.chartoptions.series.push({type:this.charttype,name:legend,data:[]});//type:"line" 
      series = this.chartoptions.series[nextindex-1];
    }

    if(this.charttype == "bar") this.addData_Bar(series,x,y)
    else this.addData_Line(series,x,y);

    if(this.chartinstance == null) return;//setChartInstance가 addDataRow보다 늦게 호출될수있음
    this.chartinstance.setOption(this.chartoptions);
  }
  addData_Line(series,x,y)
  {
    if(series == null || series == undefined) return;//처음에는 null
    // this.logging.debug("===chart addData_Line 1 "+"#series="+series["data"].length +"#x="+x+"#y="+y);
    if(series["data"].length > this.maxrow) this.shiftAll();//series["data"].shift();
    series["data"].push([x,y]);
    // this.logging.debug("===chart addData_Line 2 "+"#series="+series["data"].length);
  }
  shiftAll()
  { 
    this.chartoptions.series.forEach(ser=>ser["data"].shift());//1개라도 shift되면 전체 shift
  }
  ////////////////////////////// line test data
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
  







 

  /////////////////////////////// barchart
  testbarNames = ['host-1', 'host-2', 'host-3'];
  testbarValues = [1,2,3];
  // barData = [{key:"Mon",value:5},{key:"Tue",value:20}];
  barchartoptions:EChartOption = {
    tooltip: { trigger: 'axis' }
    ,xAxis: { data:[]}// data: this.testbarNames }
    ,yAxis: {}//[{ type: 'value' }]
    ,legend: { data:[] }//['server'] }
    ,series: []//[{ name: 'server', type: 'bar', data: this.testbarValues }]//this.barData
   };
   addData_Bar(series,x,y)
   {
     let index = this.barchartoptions.xAxis["data"].indexOf(x);
     if(index<0)//xAxis == null)
     {
       this.barchartoptions.xAxis["data"].push(x);
       series["data"].push(y);
     }
     else
     {
       series["data"][index] = y;//해당 위치의 값을 변경
     }
   }
 

  ////////////////////////////// test data
  bartest_data()
  {
    if(this.testmode == false) return;
    let datas = zTestDataUtil.test_data();
    return datas;
  }
  bartest_createchartdatas()
  {
    let datas = zTestDataUtil.test_data();
    let chartdatas = [];
    datas.forEach((data,i)=>{
      ///////////////////// kwak-bar
      chartdatas.push({legend:"host-cpu",x:data["host"],y:data["cpu"]});//data["memory"]
    });
    return chartdatas;
  }
  bartest_adddatas()
  {
    let datas = zTestDataUtil.test_data();
    datas.forEach((data,i)=>{
      ///////////////////// kwak-bar
      this.addDataRow("host-cpu",data["host"],data["cpu"]);//data["memory"]
    });
  }

}
