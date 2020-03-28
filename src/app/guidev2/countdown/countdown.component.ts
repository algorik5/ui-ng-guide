import { Component, OnInit, Input } from '@angular/core';
import { AapubsubService } from 'src/app/aservice/aapubsub.service';
import { AaloggingService } from 'src/app/aservice/aalogging.service';
import { timer } from 'rxjs';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.less']
})
export class CountdownComponent implements OnInit {

  constructor(private pubsub:AapubsubService,private logging:AaloggingService) { }

  ngOnInit() {
  }
  ngOnDestroy() { 
  }

  countdown2 = 30;
  test_countdown(mycountdown)
  {
    this.countdown2 = mycountdown;
  }

}
