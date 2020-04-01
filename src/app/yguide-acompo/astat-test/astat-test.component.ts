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

    this.pubsub.sub(this.myname+".statxxx",datas => {
    });
  }

  test_no = 0;
  test_type(type)
  {
    this.test_no++;
    if(type=="title") this.pubsub.pub(this.myname+".stattitle","title-"+this.test_no);
    if(type=="value") this.pubsub.pub(this.myname+".statvalue","value-"+this.test_no);
    if(type=="suffix") this.pubsub.pub(this.myname+".statsuffix","suffix-"+this.test_no);
    if(type=="color") this.pubsub.pub(this.myname+".statcolor",this.test_no%2==1?"red":"lime");
    if(type=="icon") this.pubsub.pub(this.myname+".staticon",this.test_no%2==1?"up":"down");
  }
}
