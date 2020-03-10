import { Injectable } from '@angular/core';
import { AaloggingService } from './aalogging.service';
import { JSONUtil } from '../autil/JSONUtil';
import { ObjectUtil } from '../autil/ObjectUtil';

@Injectable({
  providedIn: 'root'
})
export class AajsonpathService {

  constructor(private logging:AaloggingService) { }

  pathname="$PATH";

  ////////////////////////////// convert
  convertJSONPath(mydata)
  {
    this.logging.debug("=== convertJSONPath start #array="+ Array.isArray(mydata) +"#"+ typeof(mydata) +"#"+JSONUtil.stringify(mydata));
    let jsonpathdata = ObjectUtil.cloneObject(mydata);//원본에 update하면 안됨
    this.jsonpathAddRoot(jsonpathdata);
    this.logging.debug("=== convertJSONPath end   #"+ JSONUtil.stringify(jsonpathdata));
    return jsonpathdata;
  }

  private jsonpathAddRoot(obj)
  {
    let rootpath="/";
    if(typeof(obj) != 'object') return;
    this.jsonpathAdd(rootpath,obj);
  }
  private jsonpathAdd(parentpath,obj)
  {
    Object.keys(obj).forEach(key=>{
      let value = obj[key];
      if(typeof(value) == 'object')
      {
        this.jsonpathAdd(parentpath+"/"+key,value);
      }
      else
      {
        let mypath = parentpath +"/"+ key;
        obj[key+this.pathname] = mypath;//(주의)$PATH는 기존구조의 뒤부분에 추가됨=변경불가>아니면 구조를 새로 만들어야함
        //console.log("\t - "+ key +":"+ value +":"+ mypath);
      }
    });
  }
}
