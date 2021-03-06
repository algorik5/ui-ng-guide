import { Component, OnInit } from '@angular/core';
import { AapubsubService } from 'src/app/aservice/aapubsub.service';
import { AaloggingService } from 'src/app/aservice/aalogging.service';
import { NzNotificationService } from 'ng-zorro-antd';
import { Clipboard } from "@angular/cdk/clipboard";

@Component({
  selector: 'app-jsonview',
  templateUrl: './jsonview.component.html',
  styleUrls: ['./jsonview.component.less']
})
export class JsonviewComponent implements OnInit {

  constructor(private pubsub: AapubsubService,private logging:AaloggingService,private clipboard:Clipboard,private noti:NzNotificationService) {}

  topicprefix = "myname.debugjsonview";//this.topicprefix+".datas"

  //////////////////////////////////////////////// debugjsondata 
  //constructor(private clipboard:NzCopyToClipboardService,private noti:NzNotificationService)
  debugjsondata = {};//{id:"id1",name:"name1"};
  debugjsondata_set(obj) { this.debugjsondata = obj; }
  copyToClipboard() { this.clipboard.copy(JSON.stringify(this.debugjsondata)); this.noti.create("success","clipboard","copyed!!!"); }
  //////////////////////////////////////////////// debugjsondata 

  ngOnInit() {

    this.pubsub.sub(this.topicprefix+".datas", data => {
      this.debugjsondata_set(data);//this.debugjsondata = data;
    });

    ///////////////////////////////////////// test
    this.test_datas();
  }


  ///////////////////////////////////////// test
  test_data(){ 
    let testdata = {id:"id1",name:"name1"}; 
    this.pubsub.pub(this.topicprefix+".jsonview",testdata);
  }
  test_datas(){ 
    //this.jsonviewdata = [{id:"id1",name:"name1"},{id:"id2",name:"name2"}]; 
    let testdata = [
      {id:"id1",name:"name1"},{id:"id2",name:"name2"},{id:"id2",name:"name2"},{id:"id2",name:"name2"},{id:"id2",name:"name2"},{id:"id2",name:"name2"}
      ,{id:"id2",name:"name2"},{id:"id2",name:"name2"},{id:"id2",name:"name2"},{id:"id2",name:"name2"},{id:"id2",name:"name2"},{id:"id2",name:"name2"}
    ]; 
    this.pubsub.pub(this.topicprefix+".jsonview",testdata);
  }
}
