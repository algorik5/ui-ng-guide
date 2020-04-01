import { Component, OnInit, Input } from '@angular/core';
import { EChartOption } from 'echarts';
import { AaechartsService } from 'src/app/aservice/aaecharts.service';
import { AapubsubService } from 'src/app/aservice/aapubsub.service';
import { AaloggingService } from 'src/app/aservice/aalogging.service';
import { DateUtil } from 'src/app/autil/DateUtil';
import { MathUtil } from 'src/app/autil/MathUtil';
import { zTestDataUtil } from 'src/app/autil/zTestDataUtil';

@Component({
  selector: 'app-achart-test',
  templateUrl: './achart-test.component.html',
  styleUrls: ['./achart-test.component.less']
})
export class AchartTestComponent implements OnInit {

  constructor(private pubsub:AapubsubService,private logging:AaloggingService) { }

  @Input() myname = "achart-test";
  ngOnInit() {

  	////////////////////////////////////////////////////////// chart  
    this.pubsub.sub(this.myname+".xxx",datas => {//[{legend:-,x:-,y:-}...
    });
  }

  ///////////////////////////////// linechart 테스트버튼
  line_chartInit()
  {
    this.pubsub.pub(this.myname+".charttype","line");
    // this.pubsub.pub(this.myname+".clear","clear");
  }
  line_test_datas() { 
    let datas = zTestDataUtil.test_data();
    let chartdatas = []; datas.forEach((data,i)=>{ chartdatas.push({legend:data["host"],x:data["date"],y:data["cpu"]}); });
    this.pubsub.pub(this.myname+".chartdatas",chartdatas);//this.chart.addDatas(chartdatas);
  }
  line_test_no = 0;
  line_test_datarow() { 
    this.line_test_no++; let curdate = new Date(); let date = DateUtil.addDays(curdate,this.line_test_no);
    let legend = "host-x"; let x = date; let y = MathUtil.random(0,10);
    let chartdata = {legend:legend,x:x,y:y};
    this.pubsub.pub(this.myname+".chartdata",chartdata);//this.chart.addData(chartdata);
  }

 

  ///////////////////////////////// barchart 테스트버튼
  bar_chartInit()
  {
    this.pubsub.pub(this.myname+".charttype","bar");
    // this.pubsub.pub(this.myname+".clear","clear");
  }
  ////////////////////////////////////////////////////////// testdata  
  bar_test_datas() { 
    let datas = zTestDataUtil.test_data();
    let chartdatas = []; datas.forEach((data,i)=>{ chartdatas.push({legend:"server-cpu",x:data["host"],y:data["cpu"]}); });
    this.pubsub.pub(this.myname+".chartdatas",chartdatas);//this.chart.addDatas(chartdatas);
  }
  bar_test_no = 0;
  bar_test_datarow() { 
    this.bar_test_no++; let curdate = new Date(); let date = DateUtil.addDays(curdate,this.bar_test_no);
    let legend = "server-cpu"; let x = "host-z"; let y = MathUtil.random(0,10);
    let chartdata = {legend:legend,x:x,y:y};
    this.pubsub.pub(this.myname+".chartdata",chartdata);//this.chart.addData(chartdata);
  }





    //////////////////////////////////////////////// debugjsondata 
  //constructor(private clipboard:NzCopyToClipboardService,private noti:NzNotificationService)
  debugjsondata = {};//{id:"id1",name:"name1"};
  debugjsondata_set(obj) { this.debugjsondata = obj; }
  copyToClipboard() { }//this.clipboard.copy(JSON.stringify(this.debugjsondata)); this.noti.create("success","clipboard","copyed!!!"); }
  //////////////////////////////////////////////// debugjsondata 

}
