import { Component, OnInit } from '@angular/core';
import { AaloggingService } from 'src/app/aservice/aalogging.service';
import { AajsonpathService, JSONPathArrayType } from 'src/app/aservice/aajsonpath.service';
import { JSONUtil } from 'src/app/autil/JSONUtil';
import { ObjectUtil } from 'src/app/autil/ObjectUtil';
import { AajsonsearchService } from 'src/app/aservice/aajsonsearch.service';

@Component({
  selector: 'app-jsonpath',
  templateUrl: './jsonpath.component.html',
  styleUrls: ['./jsonpath.component.less']
})
export class JsonpathComponent implements OnInit {

  constructor(private jsonpath: AajsonpathService,private jsonsearch:AajsonsearchService,private logging:AaloggingService) {}

  ngOnInit() {
  }

  arrayType = JSONPathArrayType.DEFAULT;
  getArrayTypes() { return this.jsonpath.getArrayTypes(); }

  sourcedata;
  jsonpathdata;
  test_data(type) {    
    let data = {};
    if(type=="data") data = this.ztest_data;
    else if(type=="datachild") data = this.ztest_datachild;
    else if(type=="array") data = this.ztest_array;
    else if(type=="others") data = this.ztest_others;

    this.logging.debug("=== #type="+type+"#data="+JSONUtil.stringify(data));
    this.sourcedata = data;

    this.jsonpathdata = this.jsonpath.convertJSONPathByType(data,this.arrayType);//convertJSONPath
  }

  ztest_data = {a:"a1",b:"b1"};
  //test_datachild = {a:"a1",b:"b1",c:{ca:"ca1",cb:"cb1"}};
  //test_datachild = {a:"a1",b:"b1",c:{ca:"ca1",cb:"cb1"},d:{da:"da1",db:"db1"}};
  ztest_datachild = {a:"a1",b:"b1",
    c:{ca:"ca1",cb:"cb1",
      cc:{cca:"cca1",ccb:"ccb1"}},
    d:{da:"da1",db:"db1"}};
  //test_array = [{a:"a1",b:"b1"},{a:"a1",b:"b1"}];
  //test_array = [{a:"a1",b:"b1",c:{ca:"ca1",cb:"cb1"}},{d:"d2",e:"e1"}];
  ztest_array = [{a:"a1",b:"b1",
    c:{ca:"ca1",cb:"cb1"},
      cc:[{cca:"cca1",ccb:"ccb1"},{cca:"cca2",ccb:"ccb2"}]},
    {d:"d2",e:"e1"}];
  ztest_others = [{a:"a1",b:"b1",child:[{c:"c1"}]},{a:"a1",b:"b1"}];


  //////////////////////////////////////// test defiant
  jsonsearchdata;
  input = "//*";
  error = "";
  test_search()
  {
    try
    {
      this.error = "";
      this.jsonsearchdata = [];
      this.logging.debug("test_search === "+ this.input);
      this.jsonsearchdata = this.jsonsearch.search(this.sourcedata,this.input);
    }catch(err)
    {
      this.error = ""+ err;
    }
  }
}
