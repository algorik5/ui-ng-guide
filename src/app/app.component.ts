import { Component, OnInit } from '@angular/core';
import { AapubsubService } from './aservice/aapubsub.service';
import { AaloggingService } from './aservice/aalogging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  
  constructor(private pubsub:AapubsubService,private logging:AaloggingService) { }

  topicprefix = "app";//this.topicprefix+".datas"
  isCollapsed = false;
  ngOnInit() {
    this.pubsub.sub(this.topicprefix+".showmenu",datas=>{
      this.isCollapsed = true;
    });
  }

  menuType = "main";
  setMenuType(type) {
    console.log("=== setMenuType type="+type);
    this.menuType = type;
    this.isCollapsed = false;
  }
}
