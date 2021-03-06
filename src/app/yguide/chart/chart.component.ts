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
  styleUrls: ['./chart.component.less'],
  providers: [AaechartsService]
})
export class ChartComponent implements OnInit {

  constructor(private chart:AaechartsService,private pubsub:AapubsubService,private logging:AaloggingService) { }

  topicprefix = "myname.chart";//this.topicprefix+".datas"

  ngOnInit() {

  	////////////////////////////////////////////////////////// chart  
    this.pubsub.sub(this.topicprefix+".datas",datas => {//[{legend:-,x:-,y:-}...
      this.chart.clearChart();
      // this.chart.initChart("line");
      this.chart.addDatas(datas);
      this.debugjsondata_set(this.chart.getChartOption());
    });
    // let no = 0;
    this.pubsub.sub(this.topicprefix+".data",data => {//{legend:-,x:-,y:-}
    // no++; if(no==1) this.chart.clearChart();
      this.chart.addData(data);//this.chart.addDataRow(data["host"],data["date"],data["cpu"]);//data["memory"]
      this.debugjsondata_set(this.chart.getChartOption());
    });

    this.chartInit();
  }

  ////////////////////////////////////////////////////////// chart  
  getChartOptions() { return this.chart.getChartOption(); }
  setChartInstance(event) { this.chart.setChartInstance(event); }

  chartInit()
  {
    ////////////////////////////////////////////////////////// 필수 - ngInit에서 initChart를 호출해야함
    this.chart.initChart("line");

    ////////////////////////////////////////////////////////// testdata 
    this.test_datas();
  }

  ////////////////////////////////////////////////////////// testdata  
  test_datas() { 
    this.chart.clearChart();
    let datas = this.chart.test_data();
    let chartdatas = []; datas.forEach((data,i)=>{ chartdatas.push({legend:data["host"],x:data["date"],y:data["cpu"]}); });
    this.pubsub.pub(this.topicprefix+".datas",chartdatas);//this.chart.addDatas(chartdatas);
  }
  test_no = 0;
  test_datarow() { 
    this.test_no++; let curdate = new Date(); let date = DateUtil.addDays(curdate,this.test_no);
    let legend = "host-x"; let x = date; let y = MathUtil.random(0,10);
    let chartdata = {legend:legend,x:x,y:y};
    this.pubsub.pub(this.topicprefix+".data",chartdata);//this.chart.addData(chartdata);
  }

 







  ///////////////////////////////// linechart 테스트버튼
  line_chartInit()
  {
    this.chart.clearChart();
    this.chartInit();
  }
  ///////////////////////////////// barchart 테스트버튼
  bar_chartInit()
  {
    ////////////////////////////////////////////////////////// 필수 - ngInit에서 initChart를 호출해야함
    this.chart.clearChart();
    this.chart.initChart("bar");

    ////////////////////////////////////////////////////////// testdata 
    this.bar_test_datas();
  }
  ////////////////////////////////////////////////////////// testdata  
  bar_test_datas() { 
    this.chart.clearChart();
    let datas = this.chart.test_data();
    // let chartdatas = []; datas.forEach((data,i)=>{ chartdatas.push({legend:data["host"],x:data["date"],y:data["cpu"]}); });
    //kwak-bar
    let chartdatas = []; datas.forEach((data,i)=>{ chartdatas.push({legend:"server-cpu",x:data["host"],y:data["cpu"]}); });
    this.pubsub.pub(this.topicprefix+".datas",chartdatas);//this.chart.addDatas(chartdatas);
  }
  bar_test_no = 0;
  bar_test_datarow() { 
    this.test_no++; let curdate = new Date(); let date = DateUtil.addDays(curdate,this.test_no);
    // let legend = "host-x"; let x = date; let y = MathUtil.random(0,10);
    //kwak-bar
    let legend = "server-cpu"; let x = "host-z"; let y = MathUtil.random(0,10);
    let chartdata = {legend:legend,x:x,y:y};
    this.pubsub.pub(this.topicprefix+".data",chartdata);//this.chart.addData(chartdata);
  }





    //////////////////////////////////////////////// debugjsondata 
  //constructor(private clipboard:NzCopyToClipboardService,private noti:NzNotificationService)
  debugjsondata = {};//{id:"id1",name:"name1"};
  debugjsondata_set(obj) { this.debugjsondata = obj; }
  copyToClipboard() { }//this.clipboard.copy(JSON.stringify(this.debugjsondata)); this.noti.create("success","clipboard","copyed!!!"); }
  //////////////////////////////////////////////// debugjsondata 

}
