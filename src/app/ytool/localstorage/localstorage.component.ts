import { Component, OnInit } from '@angular/core';
import { AaloggingService } from 'src/app/aservice/aalogging.service';
import { AaformService } from 'src/app/aservice/aaform.service';
import { AapubsubService } from 'src/app/aservice/aapubsub.service';
import { AalocalstorageService } from 'src/app/aservice/aalocalstorage.service';
import { DateUtil } from 'src/app/autil/DateUtil';
import { AatableService } from 'src/app/aservice/aatable.service';

/* 

*/


@Component({
  selector: 'app-localstorage',
  templateUrl: './localstorage.component.html',
  styleUrls: ['./localstorage.component.less']
  ,providers: [AatableService]
})
export class LocalstorageComponent implements OnInit {

  constructor(private logging:AaloggingService,private form:AaformService,private pubsub: AapubsubService,private localstore:AalocalstorageService,
    private table: AatableService) {}

  topicprefix = "myname.localstorage";//this.topicprefix+".datas"

  ngOnInit() {

    this.pubsub.sub(this.topicprefix+".datas",data => {
    });
    this.pubsub.sub(this.topicprefix+".data",data => {
    });

    ////////////////////////////////////////// form
    this.formInit();
    ////////////////////////////////////////// table
    this.tableInit();
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
  msgtablemapping_refresh()
  {
    this.table.clearData();
    
    let str = this.localstore.msgtablemapping_value();
    if(str.length<1) return;
    let datas = JSON.parse(str);
    
    this.table.setData(datas);
  }
  msgtablemapping_add1() { this.localstore.msgtablemapping_add("msg1","table1"); }
  msgtablemapping_add11() { this.localstore.msgtablemapping_add("msg1","table2"); }
  msgtablemapping_add2() { this.localstore.msgtablemapping_add("msg2","table1"); }

  ///////////////////////////////////// manage
  testadd() { this.localstore.set(DateUtil.currentDateString(),DateUtil.currentDateString()); }
  clear() { this.localstore.clear(); }
  
  ////////////////////// test_result
  test_result = [];
  test_result_clear() {}


  /////////////////////////////// debug localStorage
  getLocalStorage() { return this.localstore.keyvalues(); } //return localStorage; }
  getMsgtablemapping() { return {}};//this.localstore.msgtablemapping_value(); }//.keyvalues(); } //return localStorage; }

  




  //////////////////////////////////////////////////////////////// table
  deleterow() {}
  //////////////////////////////////////////////////////////////// table
  getTableData() { return this.table.getData(); }
  getTableColumns() { return this.table.getColumns(); }
  editable = false;
  checkable = false;

  selectRow(data) {
    // console.log("====== selectRow data=" + JSON.stringify(data));
    this.pubsub.pub(this.topicprefix+".selectdata", data);
  }
  tableInit()
  {
    ////////////////////////////////////////////////////////// edit  
    // this.table.setEditable(false);
  }

}
