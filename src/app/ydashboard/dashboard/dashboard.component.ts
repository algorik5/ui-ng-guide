import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { Bar } from '@antv/g2plot';
// import { Chart } from '@antv/g2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private _document: any) { }

  ngOnInit() {
    this.initg2plot();
    // this.initg2();
  }
  /////////////////////////////// table
  tabledata = [
    { key: '1', name: 'John Brown', age: 32, address: 'New York No. 1 Lake Park' },
    { key: '2', name: 'Jim Green', age: 42, address: 'London No. 1 Lake Park' },
    { key: '3', name: 'Joe Black', age: 32, address: 'Sidney No. 1 Lake Park' }
  ];

  /////////////////////////////// echarts
  linechartoptions = {
    title: { text: 'cpu trend'},
    xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
    yAxis: { type: 'value' },
    series: [{ data: [820, 932, 901, 934, 1290, 1330, 1320], type: 'line' }]
  };

  barchartoptions = {
    title: { text: 'memory status'},
    color: ['#3398DB'],
    tooltip: { trigger: 'axis', axisPointer: {  type: 'shadow'  } },
    grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
    xAxis: [ { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], axisTick: { alignWithLabel: true } } ],
    yAxis: [ { type: 'value' } ],
    series: [ { name: 'series', type: 'bar', barWidth: '60%', data: [10, 52, 200, 334, 390, 330, 220] } ] 
  };

  /////////////////////////////// g2plot
  initg2plot()
  {
    let data = [ { year: '1951', sales: 38 }, { year: '1952', sales: 52 }, { year: '1956', sales: 61 }, { year: '1957', sales: 145 }, { year: '1958', sales: 48 }, ];
    let div = this._document.getElementById('g2plot1');
    let bar = new Bar(div, {
      data,//반드시 data
      xField: 'sales', yField: 'year', colorField: 'year' });    
    bar.render();
  }
  /////////////////////////////// g2
  initg2()
  {
    // const data = [ { genre: 'Sports', sold: 275 }, { genre: 'Strategy', sold: 115 }, { genre: 'Action', sold: 120 }, { genre: 'Shooter', sold: 350 }, { genre: 'Other', sold: 150 }, ];
    // const chart = new Chart({
    //   container: 'g21', // Specify chart container ID
    //   width: 600, // Specify chart width
    //   height: 300, // Specify chart height
    // });
    // chart.data(data);
    // chart.interval().position('genre*sold');
    // chart.render();    
  }
}

