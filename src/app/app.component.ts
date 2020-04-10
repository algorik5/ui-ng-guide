import { Component, OnInit } from '@angular/core';
import { AapubsubService } from './aservice/aapubsub.service';
import { AaloggingService } from './aservice/aalogging.service';
import { StringUtil } from './autil/StringUtil';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  
  constructor(private pubsub:AapubsubService,private logging:AaloggingService,private router:Router) { }

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


  ////////////////////////////////////////////// tab
  tabs = [{name:"about",url:"test1/about"}];
  tabindex = 0;
  routeTo(myurl)
  {
    let myname = StringUtil.substringAfterLast(myurl,"/");
    let index = this.tabs.findIndex(o=>o["name"]==myname);
    this.logging.debug("=======routeTo "+"#name="+myname+"#index="+index);
    if(index < 0)
    {
      this.tabs = this.tabs.concat({name:myname,url:myurl}); 
      index = this.tabs.length-1;
    } 
    this.router.navigateByUrl(this.tabs[index]["url"]);
    this.tabindex = index;
  }
  tabSelect(myname)
  {
    // let index = this.tabs.findIndex(o=>o["name"]==myname);
    // this.logging.debug("=======tabSelect "+"#name="+myname+"#index="+index);
    // this.router.navigateByUrl(this.tabs[index]["url"]);
    // this.tabindex = index;
  }
  tabClose(myname)
  {
    let index = this.tabs.findIndex(o=>o["name"]==myname);
    this.logging.debug("=======tabClose "+"#name="+myname+"#index="+index);
    this.tabs.splice(index,1);
    // if(index == this.tabindex)
    // { 
    //   this.router.navigateByUrl(this.tabs[index-1]["url"]);
    //   this.tabindex = index-1;
    // }
  }
}
