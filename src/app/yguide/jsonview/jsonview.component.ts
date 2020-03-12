import { Component, OnInit } from '@angular/core';
import { AapubsubService } from 'src/app/aservice/aapubsub.service';
import { AaloggingService } from 'src/app/aservice/aalogging.service';

@Component({
  selector: 'app-jsonview',
  templateUrl: './jsonview.component.html',
  styleUrls: ['./jsonview.component.less']
})
export class JsonviewComponent implements OnInit {

  constructor(private pubsub: AapubsubService,private logging:AaloggingService) {}

  topicprefix = "stompchart.stomp";//this.topicprefix+".datas"

  jsonviewdata = {};//{id:"id1",name:"name1"};
  
  ngOnInit() {

    this.pubsub.sub(this.topicprefix+".jsonview", data => {
      this.jsonviewdata = data;
    });

    ///////////////////////////////////////// test
    this.test_datas();
  }


  ///////////////////////////////////////// test
  test_data(){ this.jsonviewdata = {id:"id1",name:"name1"}; }
  test_datas(){ 
    //this.jsonviewdata = [{id:"id1",name:"name1"},{id:"id2",name:"name2"}]; 
    this.jsonviewdata = [
      {id:"id1",name:"name1"},{id:"id2",name:"name2"},{id:"id2",name:"name2"},{id:"id2",name:"name2"},{id:"id2",name:"name2"},{id:"id2",name:"name2"}
      ,{id:"id2",name:"name2"},{id:"id2",name:"name2"},{id:"id2",name:"name2"},{id:"id2",name:"name2"},{id:"id2",name:"name2"},{id:"id2",name:"name2"}
    ]; 
  }
}
