import { Component, OnInit } from '@angular/core';
import { AaloggingService } from 'src/app/aservice/aalogging.service';
import { AaformService } from 'src/app/aservice/aaform.service';
import { AapubsubService } from 'src/app/aservice/aapubsub.service';
import { AalocalstorageService } from 'src/app/aservice/aalocalstorage.service';
import { DateUtil } from 'src/app/autil/DateUtil';

/* 

*/


@Component({
  selector: 'app-localstorage',
  templateUrl: './localstorage.component.html',
  styleUrls: ['./localstorage.component.less']
})
export class LocalstorageComponent implements OnInit {

  constructor(private logging:AaloggingService,private form:AaformService,private pubsub: AapubsubService,private localstore:AalocalstorageService) {}

  topicprefix = "myname.localstorage";//this.topicprefix+".datas"

  ngOnInit() {

    this.pubsub.sub(this.topicprefix+".datas",data => {
    });
    this.pubsub.sub(this.topicprefix+".data",data => {
    });

    ////////////////////////////////////////// form
    this.formInit();

    this.manage_init();
  }

  ////////////////////////////////////////// form
  getFormgroup() { return this.form.getFormgroup(); }//html에서 호출
  getFormColumns() { return this.form.getControlNames(); }//html에서 호출
  getFormValue(name) { return this.form.getControlValue(name); }//html에서 호출
  formSubmit()//html에서 호출
  {
    let values = this.form.getControlValues();//[{name:x,value:x}...]
  }
  formInit()
  {
  }



  ///////////////////////////////////// msgtablemapping
  msgtablemapping_init()
  {
    this.form.addControlValue("msgtablemapping","-");
  }
  msgtablemapping_click()
  {
    let msgtablemapping = this.form.getControlValue("msgtablemapping");

    if(msgtablemapping == "msgtablemapping") { 

    }
    else if(msgtablemapping == "...") {  }
  }

  ///////////////////////////////////// manage
  manage_init()
  {
    this.form.addControlValue("manage","-");
  }
  manage_click()
  {
    let manage = this.form.getControlValue("manage");

    if(manage == "testadd") { this.localstore.set(DateUtil.currentDateString2(),DateUtil.currentDateString()); }
    else if(manage == "clear") { this.localstore.clear(); }
  }
  
  ////////////////////// test_stat
  test_stat_title = "-";
  test_stat = "-";
  test_stat_color() { return "lime"; }
  test_stat_icon() { return "up"; }
  ////////////////////// test_result
  test_result = [];
  test_result_clear() {}


  /////////////////////////////// debug localStorage
  getLocalStorage() { return this.localstore.keyvalues(); } //return localStorage; }
}
