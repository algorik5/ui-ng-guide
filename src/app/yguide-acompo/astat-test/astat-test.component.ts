import { Component, OnInit, Input } from '@angular/core';
import { EChartOption } from 'echarts';
import { AaechartsService } from 'src/app/aservice/aaecharts.service';
import { AapubsubService } from 'src/app/aservice/aapubsub.service';
import { AaloggingService } from 'src/app/aservice/aalogging.service';
import { DateUtil } from 'src/app/autil/DateUtil';
import { MathUtil } from 'src/app/autil/MathUtil';
import { zTestDataUtil } from 'src/app/autil/zTestDataUtil';

@Component({
  selector: 'app-astat-test',
  templateUrl: './astat-test.component.html',
  styleUrls: ['./astat-test.component.less']
})
export class AstatTestComponent implements OnInit {

  constructor(private pubsub:AapubsubService,private logging:AaloggingService) { }

  @Input() myname = "astat-test";
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

}
