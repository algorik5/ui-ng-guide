import { Component, OnInit } from '@angular/core';
import { AaloggingService } from 'src/app/aservice/aalogging.service';
import { AapubsubService } from 'src/app/aservice/aapubsub.service';
import { AacountmapService } from 'src/app/aservice/aacountmap.service';
import { AamapService } from 'src/app/aservice/aamap.service';
import { ColorUtil } from 'src/app/autil/ColorUtil';

@Component({
  selector: 'app-stomp-msgtodb-stats',
  templateUrl: './stomp-msgtodb-stats.component.html',
  styleUrls: ['./stomp-msgtodb-stats.component.less']
})
export class StompMsgtodbStatsComponent implements OnInit {

  constructor(private logging:AaloggingService,private pubsub: AapubsubService,private countmap:AacountmapService) { }

  topicprefix = "stomp-msgtodb.stats";//this.topicprefix+".datas"

  ngOnInit() {
    this.pubsub.sub(this.topicprefix+".msg", msg => {
      let find = this.countbymsgs.find(k=>k["key"]==msg);
      if(find == null) this.countbymsgs = this.countbymsgs.concat({key:msg,value:1}); 
      else find["value"] = find["value"] + 1;
    });
    this.pubsub.sub(this.topicprefix+".table", table => {
      let find = this.countbytables.find(k=>k["key"]==table);
      if(find == null) this.countbytables = this.countbytables.concat({key:table,value:1}); 
      else find["value"] = find["value"] + 1;
    });
  }

  ////////////////////////////////// msg count
  countbymsgs = [];//[{key:"k1",value:"v1"},{key:"k2",value:"v2"},{key:"k3",value:"v3"}];

  ////////////////////////////////// table count
  countbytables = [];//[{key:"k1",value:"v1"},{key:"k2",value:"v2"},{key:"k3",value:"v3"},{key:"k1",value:"v1"},{key:"k2",value:"v2"},{key:"k3",value:"v3"}];



  // ////////////////////////////////////////////////////////// count
  // countInit() { this.countadd("recv",0); this.countadd("insert",0); }
  // countkeys() { return this.countmap.keysToArray(); }
  // countvalue(key) { return this.countmap.getCount(key); }
  // countadd(key,count) { this.countmap.addCount(key,count); }

  // ////////////////////////////////////////////////////////// stat
  // statmap = new AamapService();//cpu:{name:"cpu",value:"1.0",status:"warn"}
  // statmapkeys() { return this.statmap.keysToArray(); }
  // statmapvalue(key) { return this.statmap.get(key)["value"]; }
  // statmapadd(key,value)
  // {
  //   let status = "normal"; if(value >= 3) status = "warn"; if(value >= 4) status = "error";
  //   this.statmap.set(key,{key:key,value:value,status:status});
  // }  
  // statusIconName(key) { let status = this.statmap.get(key)["status"]; return ColorUtil.statusIconName(status); }
  // statusIconColor(key){ let status = this.statmap.get(key)["status"]; return ColorUtil.statusIconColor(status); }


}
