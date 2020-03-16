import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stomp-msgtodb-stats',
  templateUrl: './stomp-msgtodb-stats.component.html',
  styleUrls: ['./stomp-msgtodb-stats.component.less']
})
export class StompMsgtodbStatsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  ////////////////////////////////// msg count
  countbymsgs = [{key:"k1",value:"v1"},{key:"k2",value:"v2"},{key:"k3",value:"v3"}];

  ////////////////////////////////// table count
  countbytables = [{key:"k1",value:"v1"},{key:"k2",value:"v2"},{key:"k3",value:"v3"},{key:"k1",value:"v1"},{key:"k2",value:"v2"},{key:"k3",value:"v3"}];

}
