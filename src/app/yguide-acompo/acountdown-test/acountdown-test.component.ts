import { Component, OnInit, Input } from '@angular/core';
import { AapubsubService } from 'src/app/aservice/aapubsub.service';
import { AaloggingService } from 'src/app/aservice/aalogging.service';
import { timer } from 'rxjs';

@Component({
  selector: 'app-acountdown-test',
  templateUrl: './acountdown-test.component.html',
  styleUrls: ['./acountdown-test.component.less']
})
export class AcountdownTestComponent implements OnInit {

  constructor(private pubsub:AapubsubService,private logging:AaloggingService) { }

  ngOnInit() {
  }

  myinterval = 30;
  test_interval(myinterval)
  {
    this.myinterval= myinterval;
  }

  myfirecount = 0;
  myfireEvent(event)
  {
    this.myfirecount++;
    console.log("======= myfireEvent="+ event +"#myfirecount="+this.myfirecount);
  }

  mycountdown = 0;
}
