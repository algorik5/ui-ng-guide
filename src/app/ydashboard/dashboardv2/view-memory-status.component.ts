import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-memory-status',
  template: `
  <div echarts [options]="barchartoptions" style="height:200px;"></div>
  `,
  styles: []
})
export class ViewMemoryStatusComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  
  barchartoptions = {
    title: { text: 'memory status'},
    color: ['#3398DB'],
    tooltip: { trigger: 'axis', axisPointer: {  type: 'shadow'  } },
    grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
    xAxis: [ { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], axisTick: { alignWithLabel: true } } ],
    yAxis: [ { type: 'value' } ],
    series: [ { name: 'series', type: 'bar', barWidth: '60%', data: [10, 52, 200, 334, 390, 330, 220] } ] 
  };

}
