import { Component, OnInit } from '@angular/core';
import { AapubsubService } from 'src/app/aservice/aapubsub.service';
import { AaloggingService } from 'src/app/aservice/aalogging.service';
import { NzNotificationService } from 'ng-zorro-antd';
import { Clipboard } from "@angular/cdk/clipboard";
import { AaflatdataService } from 'src/app/aservice/aaflatdata.service';

@Component({
  selector: 'app-stompdbinsert-debugjsonview',
  templateUrl: './stompdbinsert-debugjsonview.component.html',
  styleUrls: ['./stompdbinsert-debugjsonview.component.less']
})
export class StompdbinsertDebugjsonviewComponent implements OnInit {

  constructor(private pubsub: AapubsubService,private logging:AaloggingService,private clipboard:Clipboard,private noti:NzNotificationService
    ,private flatdata:AaflatdataService) {}

  topicprefix = "stompdbinsert.debugjsonview";//this.topicprefix+".datas"

  //////////////////////////////////////////////// debugjsondata 
  //constructor(private clipboard:NzCopyToClipboardService,private noti:NzNotificationService)
  debugjsondata = {};//{id:"id1",name:"name1"};
  debugjsondata_set(obj) { this.debugjsondata = obj; }
  copyToClipboard() { this.clipboard.copy(JSON.stringify(this.debugjsondata)); this.noti.create("success","clipboard","copyed!!!"); }
  //////////////////////////////////////////////// debugjsondata 

  ngOnInit() {

    this.pubsub.sub(this.topicprefix+".datas", data => {
      this.debugjsondata_set(data);//this.debugjsondata = data;

      this.debugjsondata_flat = this.flatdata.objectToFlat(data);
      this.debugjsondata_localStorage = JSON.stringify(localStorage);
    });

    this.pubsub.sub(this.topicprefix+".localStorage", data => {
      this.debugjsondata_localStorage = JSON.stringify(localStorage);
    });
    // this.pubsub.sub(this.topicprefix+".datasflat", data => {
    //   this.debugjsondata_flat;//this.debugjsondata = data;
    // });

  }

  //////////////////////////////// test flat data
  debugjsondata_flat = {};
  debugjsondata_localStorage = {};
}
