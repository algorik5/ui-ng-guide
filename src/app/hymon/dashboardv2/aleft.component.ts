import { Component, OnInit, OnDestroy } from '@angular/core';
import { AapubsubService } from 'src/app/aservice/aapubsub.service';
import { AaloggingService } from 'src/app/aservice/aalogging.service';

@Component({
  selector: 'app-aleft',
  template: `
  <nz-drawer nzTitle="Left" [nzWidth]="400" [nzClosable]="false" [nzVisible]="visible" [nzPlacement]="place" (nzOnClose)="close()">
  <ul nz-menu [nzMode]="'inline'" style="height:100%">
      <li nz-menu-item routerLinkActive="ant-menu-item-selected"><a title routerLink="test1"><span title><i nz-icon nzType="notification"></i>Test1</span></a></li>
      <li nz-menu-item routerLinkActive="ant-menu-item-selected"><a title routerLink="test1"><span title><i nz-icon nzType="notification"></i>Test1</span></a></li>
  </ul>
</nz-drawer>
`,
  styles: []
})
export class AleftComponent implements OnInit {

  constructor(private pubsub:AapubsubService,private logging:AaloggingService) { }

  topicprefix = "hymon.dashboard";//this.topicprefix+".datas"

  ngOnInit() {
    this.pubsub.sub(this.topicprefix+".showleft",datas=>{
      this.open();
    });
  }

  visible = false;
  place = "left";

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }
}
