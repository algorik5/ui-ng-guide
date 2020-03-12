import { Component, OnInit } from '@angular/core';
import { AapubsubService } from 'src/app/aservice/aapubsub.service';
import { AaloggingService } from 'src/app/aservice/aalogging.service';

@Component({
  selector: 'app-stompchart-jsonview',
  templateUrl: './stompchart-jsonview.component.html',
  styleUrls: ['./stompchart-jsonview.component.less']
})
export class StompchartJsonviewComponent implements OnInit {

  constructor(private pubsub: AapubsubService,private logging:AaloggingService) {}

  topicprefix = "stompchart.stomp";//this.topicprefix+".datas"

  ngOnInit() {

    this.pubsub.sub(this.topicprefix+".jsonview", data => {
      this.jsonviewdata = data;
    });
  }

  jsonviewdata = [];
}
