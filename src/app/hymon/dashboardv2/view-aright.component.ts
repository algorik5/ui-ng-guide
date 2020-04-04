import { Component, OnInit, Input } from '@angular/core';
import { AapubsubService } from 'src/app/aservice/aapubsub.service';
import { AaloggingService } from 'src/app/aservice/aalogging.service';

@Component({
  selector: 'app-view-aright',
  template: `
  <nz-drawer nzTitle="Right" [nzWidth]="400" [nzClosable]="false" [nzVisible]="visible" [nzPlacement]="place" (nzOnClose)="close()">
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </nz-drawer>
`,
  styles: []
})
export class ViewArightComponent implements OnInit {

  constructor(private pubsub:AapubsubService,private logging:AaloggingService) { }

  @Input() myname = "right";

  ngOnInit() {
    this.logging.debug("======================== "+this.constructor.name+"#myname="+this.myname);
    this.pubsub.sub(this.myname+".showright",datas=>{
      this.open();
    });
  }

  visible = false;
  place = "right";
  open(): void { this.visible = true; }
  close(): void { this.visible = false; }
  
}
