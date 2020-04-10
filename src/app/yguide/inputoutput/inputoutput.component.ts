import { Component, OnInit, Input, OnDestroy, OnChanges } from '@angular/core';
import { AapubsubService } from 'src/app/aservice/aapubsub.service';
import { AaloggingService } from 'src/app/aservice/aalogging.service';
import { timer } from 'rxjs';

@Component({
  selector: 'app-inputoutput',
  templateUrl: './inputoutput.component.html',
  styleUrls: ['./inputoutput.component.less']
})
export class InputoutputComponent implements OnInit,OnDestroy,OnChanges {

  constructor(private pubsub:AapubsubService,private logging:AaloggingService) { }

  ngOnInit() {
    console.log("=============== ngOnInit    - "+ this.constructor.name );
  }
  ngOnDestroy() {
    console.log("=============== ngOnDestroy - "+ this.constructor.name );
  }
  ngOnChanges() {
    console.log("=============== ngOnChanges - "+ this.constructor.name );
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
}
