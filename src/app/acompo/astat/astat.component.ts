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
    this.pubsub.sub(this.myname+".statdata",data => {//    {title:"cpu-max",value:this.testcount,suffix:"host-x",color:color,icon:"like"}
      this.title = data["title"];
      this.value = data["value"];
      this.suffix = data["suffix"];
      this.color = data["color"];
      this.icon = data["icon"];
    });
    this.pubsub.sub(this.myname+".stattitle",data => {
      this.title = data;
    });
    this.pubsub.sub(this.myname+".statvalue",data => {
      this.value = data;
    });
    this.pubsub.sub(this.myname+".statsuffix",data => {
      this.suffix = data;
    });
    this.pubsub.sub(this.myname+".statcolor",data => {
      this.color = data;
    });
    this.pubsub.sub(this.myname+".staticon",data => {
      this.icon = data;
    });

    this.statInit();
  }


  title = "title-1";
  value = "value-1";
  suffix = "suffix-1";
  color = "blue";
  icon = "down";

  statInit()
  {
    ////////////////////////////////////////////////////////// 

  }

}
