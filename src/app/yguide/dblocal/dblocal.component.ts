import { Component, OnInit } from '@angular/core';
import { AaloggingService } from 'src/app/aservice/aalogging.service';
import { AaformService } from 'src/app/aservice/aaform.service';
import { AapubsubService } from 'src/app/aservice/aapubsub.service';
import { AamapService } from 'src/app/aservice/aamap.service';
import { ColorUtil } from 'src/app/autil/ColorUtil';
import { AasqllocalService } from 'src/app/aservice/aasqllocal.service';

@Component({
  selector: 'app-dblocal',
  templateUrl: './dblocal.component.html',
  styleUrls: ['./dblocal.component.less']
})
export class DblocalComponent implements OnInit {

  constructor(private logging:AaloggingService,private form:AaformService,private pubsub: AapubsubService,private sqllocal:AasqllocalService) { }

  topicprefix = "myname.dblocal";//this.topicprefix+".datas"

  ngOnInit() {

    this.pubsub.sub(this.topicprefix+".datas",data => {
    });
    this.pubsub.sub(this.topicprefix+".data",data => {
    });

    ////////////////////////////////////////// form
    this.formInit();

    ////////////////////////////////// test
    this.test_init();
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





  ////////////////////////////////////////// test
  // test_types = ["dbinfoall"];
  test_init()
  {
    this.form.addControlValue("test_type","-");//dbinfo
    this.form.addControlValue("test_data","-");
  }
  //test_stat2
  test_type_click()
  {
    try
    {
      this.test_type_click_real();
    }catch(err) { console.log("ERROR="+err); this.test_stat2 = ""+err; }
  }
  test_type_click_real()
  {
    this.test_result = [];
    this.test_stat = "";

    let test_type = this.form.getControlValue("test_type");

    let test_data = this.test_data_init(test_type);
    this.form.setControlValue("test_data",test_data);

    this.test_stat_title = test_type;
    if(test_type == "dbinfoall") { 
      this.test_result = this.sqllocal.dbinfoall(); 
      this.test_stat = "size="+this.sqllocal.dbinfoallsize(); 
    }
    else if(test_type == "dbinfo") { 
      this.test_result = this.sqllocal.dbinfo(); 
      this.test_stat = "id="+this.sqllocal.dbid(); 
    }
    else if(test_type == "dbtables") { 
      this.test_result = this.sqllocal.dbtables(); 
      this.test_stat = "size="+this.sqllocal.dbtablecount(); 
    }
    else if(test_type == "createtable") {
      this.test_result = this.sqllocal.createtable(test_data); 
      this.test_stat = "size="+this.sqllocal.dbtablecount(); 
    }
    else if(test_type == "column") {
      this.test_result = this.sqllocal.getColumns("test_table"); 
      this.test_stat = "size="+this.sqllocal.dbtablecount(); 
    }    
    else if(test_type == "insert") {
      this.test_result = this.sqllocal.insert(test_data); 
      this.test_stat = "size="+this.sqllocal.dbtablecount();
    }
    else if(test_type == "select") { 
      this.test_result = this.sqllocal.select(test_data); 
      this.test_stat = "size="+this.sqllocal.dbtablecount(); 
    }
    else if(test_type == "pstmt") { 
      let datas = [{host:"host-z1",time:"2001-01-01",cpu:11,memory:22,disk:33},{host:"host-z2",time:"2001-01-02",cpu:11,memory:22,disk:33}];
      this.test_result = this.sqllocal.insert_pstmt(test_data,datas); 
      this.test_stat = "size="+this.test_result; 
    }
    else if(test_type == "createtable-pk") {
      this.test_result = this.sqllocal.createtable(test_data); 
      this.test_stat = "size="+this.sqllocal.dbtablecount(); 
    }
    else if(test_type == "column-pk") {
      this.test_result = this.sqllocal.getColumns("test_table_pk"); 
      this.test_stat = "size="+this.sqllocal.dbtablecount(); 
    }    
    else if(test_type == "insert-pk") {
      this.test_result = this.sqllocal.insert(test_data); 
      this.test_stat = "size="+this.sqllocal.dbtablecount();
    }
    else if(test_type == "upsert-pk") {
      this.test_result = this.sqllocal.insert(test_data); 
      this.test_stat = "size="+this.sqllocal.dbtablecount();
    }
    else if(test_type == "update-pk") {
      this.test_result = this.sqllocal.insert(test_data); 
      this.test_stat = "size="+this.sqllocal.dbtablecount();
    }
    else if(test_type == "select-pk") { 
      this.test_result = this.sqllocal.select(test_data); 
      this.test_stat = "size="+this.sqllocal.dbtablecount(); 
    }
    else if(test_type == "pstmt-pk") { 
      let datas = [{host:"host-z1",time:"2001-01-01",cpu:11,memory:22,disk:33},{host:"host-z2",time:"2001-01-02",cpu:11,memory:22,disk:33}];
      this.test_result = this.sqllocal.insert_pstmt(test_data,datas); 
      this.test_stat = "size="+this.test_result; 
    }

  }
  ////////////////////// test_data
  test_data_init(test_type)
  {
    let test_data = "";
    if(test_type == "dbinfo") test_data = "-";
    else if(test_type == "dbtables") test_data = "-";
    else if(test_type == "createtable") test_data = "create table test_table ( host string,time date,cpu double,memory double,disk double )";
    else if(test_type == "insert") test_data = "insert into test_table (host,time,cpu,memory,disk) values ( 'host-x','2111-11-11',1,2,3 )";
    else if(test_type == "select") test_data = "select * from test_table";
    else if(test_type == "pstmt") test_data = "insert into test_table (host,time,cpu,memory,disk) values ( :host,:time,:cpu,:memory,:disk )";
    else if(test_type == "createtable-pk") test_data = "create table test_table_pk ( host string,time date,cpu double,memory double,disk double,primary key (host) )";
    else if(test_type == "insert-pk") test_data = "insert into test_table_pk (host,time,cpu,memory,disk) values ( 'host-x','2111-11-11',1,2,3 )";
    // else if(test_type == "upsert-pk") test_data = "replace into test_table_pk (host,time,cpu,memory,disk) values ( 'host-x','2111-11-11',11,22,33 )";
    else if(test_type == "upsert-pk") test_data = "--- not support ";
    else if(test_type == "update-pk") test_data = "update test_table_pk set cpu=999 where host='host-x' ";
    else if(test_type == "select-pk") test_data = "select * from test_table_pk";
    else if(test_type == "pstmt-pk") test_data = "insert into test_table_pk (host,time,cpu,memory,disk) values ( :host,:time,:cpu,:memory,:disk )";
    return test_data;
  }
  ////////////////////// test_stat
  test_stat_title = "-";
  test_stat = "-";
  test_stat_color() { return "lime"; }
  test_stat_icon() { return "up"; }
  ////////////////////// test_stat2
  test_stat2_title = "error";
  test_stat2 = "-";
  test_stat2_color() { return "lime"; }
  test_stat2_icon() { return "up"; }
  ////////////////////// test_result
  test_result = [];
  test_result_clear() {}

  ////////////////////// test_data
  test_data_1 = {};
  test_data_2 = {};
  // test_datas()
  // {
  //   let datas = this.table.test_data();
  //   this.pubsub.pub(this.topicprefix+".datas",datas);//this.table.setData(datas);
  // }
  // test_no = 0;
  // test_data() { 
  //   this.test_no++; let curdate = new Date(); let date = DateUtil.addDays(curdate,this.test_no);
  //   let value = MathUtil.random(0,10);
  //   let data = {host:"host-x",ip:"ip-x",date:date,cpu:value,memory:value*2,checked:false};
  //   this.pubsub.pub(this.topicprefix+".data",data);//this.table.addDatas(data);
  // }

}
