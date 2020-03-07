import { Component, OnInit } from '@angular/core';
import { EChartOption } from 'echarts';
import { EchartsService } from 'src/app/aservice/echarts.service';
import { PubsubService } from 'src/app/aservice/pubsub.service';
import { LoggingService } from 'src/app/aservice/logging.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.less']
})
export class ChartComponent implements OnInit {

  constructor(private chart:EchartsService,private pubsub:PubsubService,private logging:LoggingService) { }

  ngOnInit() {

    this.testdata();

    this.pubsub.sub("xxx.datas",datas => {
      this.chart.clearChart();
      datas.forEach((data,i)=>{
        this.chart.addDataRow(data["host"],data["date"],data["cpu"]);//data["memory"]
      });
    });
  }

  ////////////////////////////////////////////////////////// chart  
  getChartOptions() { return this.chart.getChartOption(); }
  setChartInstance(event) { this.chart.setChartInstance(event); }

  testdata_use = true;
  testdata() { 
    if(this.testdata_use == false) return;
    this.chart.clearChart();
    let chartdatas = this.chart.test_data();
    this.chart.addDatas(chartdatas);
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
