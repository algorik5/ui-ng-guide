import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-viewcputrend',
  template: `
  <div echarts [options]="linechartoptions" style="height:300px;"></div>
  `,
  styles: []
})
export class ViewcputrendComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  
  /////////////////////////////// echarts
  linechartoptions = {
    title: { text: 'cpu trend'},
    xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
    yAxis: { type: 'value' },
    series: [{ data: [820, 932, 901, 934, 1290, 1330, 1320], type: 'line' }]
  };

}
