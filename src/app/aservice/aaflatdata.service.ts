import { Injectable } from '@angular/core';
import { AaloggingService } from './aalogging.service';

@Injectable({
  providedIn: 'root'
})
export class AaflatdataService {

  constructor(private logging:AaloggingService) { }

  objectToFlat(obj) 
  { 
    let arraydata = [];//array 추출
    for (var key in obj ) { if(Array.isArray(obj[key])) { arraydata = obj[key]; break; } }//향후-멀티array필드가 존재하면 ...

    let arraydata_no = this.flat_objectToArray(obj);//array아닌거 추출 [{"_type_":"PROCESS_DATA"}];

    if(arraydata.length>0)//arraydata_no를 arraydata의 object필드로 넣어준다
    {
      arraydata.forEach((data,i)=>{ arraydata_no.forEach(data_no=>{ data = Object.assign(data,data_no); });  });
    }
    else//array가 존재하지 않으면 arraydata_no를 obj로 만든다
    {
        let obj = this.flat_arrayToObject(arraydata_no);
        arraydata.push(obj);
    }
    this.logging.debug("objectToFlat  last  > "+JSON.stringify(arraydata));    

    return arraydata;
  }

  private flat_arrayToObject(arr)//[{a:aa},{b:bb},{c.cl:c11},{c.c12:c22}] >>> {a:aa,b:bb,c.cl:c11,c.c12:c22}
  {
      // let obj = arr.reduce((obj, item) => { return { ...obj, [item[key]]: item, }; });
      let obj = {};
      arr.forEach(data=>{ for (var key in data) { obj[key]=data[key]} });
      return obj;
  }

  private flat_objectToArray(obj)//{a:aa,b:bb,c:{c1:c11,c2:c22}} >>> [{a:aa},{b:bb},{c.cl:c11,c.c12:c22}]
  {
    let arr = [];
    this.flat_objectToArray_real(arr,"",obj);
    return arr;
  }
  private flat_objectToArray_real(arr,parentkey,obj)
  {
    // for(var key in obj) { arr.push({[key]:obj[key]}); }
    for(var key in obj) 
    { 
      let value = obj[key];
      if(Array.isArray(value)) continue;//array는 일단 무시
      let keynnew = parentkey.length>0? parentkey+"."+key:key;
      if(typeof(value)=="object") this.flat_objectToArray_real(arr,keynnew,value);
      else arr.push({[keynnew]:value}); 
    }
    // console.log("=== data#"+ JSON.stringify(arr));
  }

  //////////////////////////////////// test
  test_data()
  {
    let data = {"_type_":"PROCESS_DATA",
      "datas":[
        {"process":"process-0","host":"host-0","time":"2020-03-15 13:22:30","cpu":0,"memory":0},
        {"process":"process-1","host":"host-1","time":"2020-03-15 13:22:30","cpu":2,"memory":3},
        {"process":"process-2","host":"host-2","time":"2020-03-15 13:22:30","cpu":4,"memory":6}]};

    let data2 = {"_type_":"GAP_DATA",
      "GAP":{"SRT":1,"END":2,"ERR":3},
      "TOTAL":{"SRT":1,"END":11,"ERR":21},
      "app":"app-1","ver":"v-1","count":731,"time":"2020-03-15 13:22:30"};
  }

}
