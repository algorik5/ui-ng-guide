import { Component, OnInit } from '@angular/core';
import { EChartOption } from 'echarts';
import { AaechartsService } from 'src/app/aservice/aaecharts.service';
import { AapubsubService } from 'src/app/aservice/aapubsub.service';
import { AaloggingService } from 'src/app/aservice/aalogging.service';
import { DateUtil } from 'src/app/autil/DateUtil';
import { MathUtil } from 'src/app/autil/MathUtil';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.less']
})
export class ChartComponent implements OnInit {

  constructor(private chart:AaechartsService,private pubsub:AapubsubService,private logging:AaloggingService) { }

  ngOnInit() {

	////////////////////////////////////////////////////////// chart  
    this.pubsub.sub("mychart.datas",datas => {//[{legend:-,x:-,y:-}...
      this.chart.clearChart();
      this.chart.addDatas(datas);
    });
    this.pubsub.sub("mychart.data",data => {//{legend:-,x:-,y:-}
      //this.chart.clearChart();
      this.chart.addData(data);//this.chart.addDataRow(data["host"],data["date"],data["cpu"]);//data["memory"]
    });

    this.chartInit();
  }

  ////////////////////////////////////////////////////////// chart  
  getChartOptions() { return this.chart.getChartOption(); }
  setChartInstance(event) { this.chart.setChartInstance(event); }

  chartInit()
  {
    ////////////////////////////////////////////////////////// testdata  
    this.test_datas();
  }

  ////////////////////////////////////////////////////////// testdata  
  test_datas() { 
    this.chart.clearChart();
    let datas = this.chart.test_data();
    let chartdatas = []; datas.forEach((data,i)=>{ chartdatas.push({legend:data["host"],x:data["date"],y:data["cpu"]}); });
    this.pubsub.pub("mychart.datas",chartdatas);//this.chart.addDatas(chartdatas);
  }
  test_no = 0;
  test_datarow() { 
    this.test_no++; let curdate = new Date(); let date = DateUtil.addDays(curdate,this.test_no);
    let legend = "host-x"; let x = date; let y = MathUtil.random(0,10);
    let chartdata = {legend:legend,x:x,y:y};
    this.pubsub.pub("mychart.data",chartdata);//this.chart.addData(chartdata);
  }

// ////////////////////////////////////////////////////////// click
// curx;cury;curlegend;
// clickX(x) { this.curx = x["name"]; this.changeColor(this.sqlcolumnsx,x); this.sqlrsToChart(); }
// clickY(y) { this.cury = y["name"]; this.changeColor(this.sqlcolumnsy,y); this.sqlrsToChart(); }
// clickLegend(legend) { this.curlegend = legend["name"]; this.changeColor(this.sqlcolumnsy,legend); this.sqlrsToChart(); }
// changeColor(datas,data)//x y legend 
// { 
//   datas.forEach(o=>{o["color"]="blue"});
//   data["color"] = "green";
// }

// sqlrsToChart()
// {
//   if(this.curx == null || this.cury == null || this.curlegend == null) return;
//   this.chart.clearChart();
//   this.sqlrs.forEach(data=>{
//     this.chart.addDataRow(data[this.curlegend],data[this.curx],data[this.cury]);
//   });
// }







  // /////////////////////////////// echarts
  // linechartoptions = {
  //   title: { text: 'cpu trend'},
  //   xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
  //   yAxis: { type: 'value' },
  //   series: [{ data: [820, 932, 901, 934, 1290, 1330, 1320], type: 'line' }]
  // };
 
}
