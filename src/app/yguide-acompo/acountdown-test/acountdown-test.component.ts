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

  @Input() parentname = "---"; myname = "countdown-test";
  ngOnInit() {
    this.logging.debug("======== ngOnInit # "+"#parentname="+this.parentname +"#myname="+ this.myname );
    this.pubsub.sub(this.myname+".countdown.fire",data=>{
      this.logging.debug("======== fire change # "+ "#myname="+ this.myname +"#myfirecount="+this.myfirecount);
      this.myfirecount++;
    });

    // this.pubsub.pub(this.myname+".countdown.interval",this.myinterval);//안됨 - parent init후 child init됨
  }

  myinterval = 30;
  test_interval(myinterval)
  {
    this.myinterval= myinterval;
    this.pubsub.pub(this.myname+".countdown.interval",this.myinterval);
  }
  myfirecount = 0;

}
