import { Component, OnInit } from '@angular/core';
import { AapubsubService } from 'src/app/aservice/aapubsub.service';
import { AaloggingService } from 'src/app/aservice/aalogging.service';

@Component({
  selector: 'app-view-max',
  template: `
  <nz-statistic [nzTitle]="stat['title']" [nzValue]="stat['value']" [nzValueStyle]="{ color: stat['color'] }" [nzPrefix]="myprefix" [nzSuffix]="stat['suffix']"></nz-statistic>
  <ng-template #myprefix><i nz-icon [nzType]="stat['icon']"></i></ng-template>
  
    `,
  styles: []
})
export class ViewMaxComponent implements OnInit {

  constructor(private pubsub:AapubsubService,private logging:AaloggingService) { }

  topicprefix = "hymon.dashboard-server-cpu-max";//this.topicprefix+".datas"

  ngOnInit() {

    this.pubsub.sub(this.topicprefix+".data",data => {//{title:"t1",value:"v1",suffix:"s1",color:"lime",icon:"like"}
      this.stat = data;
    });

    // this.chartInit();
  }

  stat = {title:"t1",value:"v1",suffix:"s1",color:"black",icon:"like"};

 
}
