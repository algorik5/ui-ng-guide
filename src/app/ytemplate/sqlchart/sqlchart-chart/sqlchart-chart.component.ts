import { Component, OnInit } from '@angular/core';
import { EChartOption } from 'echarts';
import { EchartsService } from 'src/app/aservice/echarts.service';
import { SqlService } from 'src/app/aservice/sql.service';
import { PubsubService } from 'src/app/aservice/pubsub.service';

@Component({
  selector: 'app-sqlchart-chart',
  templateUrl: './sqlchart-chart.component.html',
  styleUrls: ['./sqlchart-chart.component.less']
})
export class SqlchartChartComponent implements OnInit {

  constructor(private chart:EchartsService,private pubsub:PubsubService) { }

  ngOnInit() {
    this.pubsub.sub("sqlchart.datas",datas => {
      this.chart.clearChart();
      datas.forEach((data,i)=>{
        this.chart.addDataRow(data["host"],data["date"],data["cpu"]);//data["memory"]
      });
    });
  }

  ////////////////////////////////////////////////////////// chart  
  chartoptions:EChartOption = {};//주의 - null이면 chartinit 호출안됨
  chartinit(event) { 
    this.chart.initChart(event);
    this.chartoptions = this.chart.getChartOption();
    this.chart.test_data();
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
