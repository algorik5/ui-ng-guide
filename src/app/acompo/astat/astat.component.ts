import { Component, OnInit, Input } from '@angular/core';
import { AapubsubService } from 'src/app/aservice/aapubsub.service';
import { AaloggingService } from 'src/app/aservice/aalogging.service';

@Component({
  selector: 'app-astat',
  templateUrl: './astat.component.html',
  styleUrls: ['./astat.component.less']
})
export class AstatComponent implements OnInit {

  constructor(private pubsub:AapubsubService,private logging:AaloggingService) { }

  @Input() myname = "stat";
  ngOnInit() {

    this.logging.debug("======================== AstatComponent "+"#myname="+this.myname);
    this.pubsub.sub(this.myname+".stattitle",data => {
    });
    this.pubsub.sub(this.myname+".statvalue",data => {
    });
    this.pubsub.sub(this.myname+".statsuffix",data => {
    });
    this.pubsub.sub(this.myname+".statcolor",data => {
    });
    this.pubsub.sub(this.myname+".staticon",data => {
    });

    this.statInit();
  }


  title:"t1";
  value:"v1";
  suffix:"s1";
  color:"black";
  icon:"down";

  statInit()
  {
    ////////////////////////////////////////////////////////// 

  }

}
