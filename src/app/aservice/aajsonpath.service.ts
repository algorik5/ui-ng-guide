import { Injectable } from '@angular/core';
import { AaloggingService } from './aalogging.service';
import { JSONUtil } from '../autil/JSONUtil';
import { ObjectUtil } from '../autil/ObjectUtil';
import { NumberUtil } from '../autil/NumberUtil';

export enum JSONPathArrayType {//값을 부여하지 않으면 0,1..
  ASTA="ASTA",//[*]
  INDEX="INDEX",//[1]
  DEFAULT="DEFAULT"//제거
}

@Injectable({
  providedIn: 'root'
})
export class AajsonpathService {

  constructor(private logging:AaloggingService) { }
  
  pathname="$PATH";

  ////////////////////////////// ArrayType
  getArrayTypes() { return Object.keys(JSONPathArrayType); }

  ////////////////////////////// uniqueu path >>> $PATH만 추출 + 중복제거
  uniquepathmap = new Map();//jsonpath unique 저장
  getUniqueJsonPath(mydata) 
  { 
    let pathdata = this.convertJSONPath(mydata);//내부적으로 addUniquePathMap호출함
    return Array.from(this.uniquepathmap.keys()); 
  }
  private addUniquePathMap(path,isobject) 
  {
    if(isobject == true) return;//object는 path에 제외 - primitive값만 가져오는 경우 (차트그릴때)
    this.uniquepathmap.set(path,"-"); 
  }

  ////////////////////////////// convert : {a:'a',b:'b'} >>> {a:'a',b:'b' ,a$PATH='//a',b$PATH='//b'}
  convertJSONPath(mydata) { return this.convertJSONPathByType(mydata,JSONPathArrayType.DEFAULT); }
  convertJSONPathByType(mydata,arrayType:JSONPathArrayType)
  {
    this.logging.debug("=== convertJSONPath start #type="+ arrayType +"#array="+ Array.isArray(mydata) +"#"+ typeof(mydata) +"#"+JSONUtil.stringify(mydata));
    let jsonpathdata = ObjectUtil.cloneObject(mydata);//원본에 update하면 안됨
    this.jsonpathAddRoot(jsonpathdata,arrayType);
    this.logging.debug("=== convertJSONPath end   #"+ JSONUtil.stringify(jsonpathdata));
    return jsonpathdata;
  }

  private jsonpathAddRoot(obj,arrayType:JSONPathArrayType)
  {
    let rootpath="/";
    if(typeof(obj) != 'object') return;
    this.jsonpathAdd(rootpath,obj,arrayType);
  }
  private jsonpathAdd(parentpath,obj,arrayType:JSONPathArrayType)
  {
    Object.keys(obj).forEach(key=>{
      let value = obj[key];
      if(typeof(value) == 'object')
      {
        let mypath = parentpath +"/"+ key;
        if(NumberUtil.isNumber(key)) mypath = parentpath +this.applyArrayType(parentpath,key,arrayType);//key가 number이면 array >>> array는 parent[0] 형태
        obj[key+this.pathname] = mypath;//(추가)object자신도 path가 필요함
        this.addUniquePathMap(mypath,true);//(추가2)unique path
        this.jsonpathAdd(mypath,value,arrayType);
      }
      else
      {
        let mypath = parentpath +"/"+ key;
        //let mypath = NumberUtil.isNumber(key) ? parentpath +"["+key+"]":parentpath +"/"+ key;
        obj[key+this.pathname] = mypath;//(주의)$PATH는 기존구조의 뒤부분에 추가됨=변경불가>아니면 구조를 새로 만들어야함
        this.addUniquePathMap(mypath,false);//(추가2)unique path
        //console.log("\t - "+ key +":"+ value +":"+ mypath);
      }
    });
  }
  private applyArrayType(parentpath,key,arrayType:JSONPathArrayType)
  {
    if(parentpath == "/") return "";//array로 시작하면 /[*]/ 이렇게 됨
    if(arrayType == JSONPathArrayType.ASTA) return "[*]";
    else if(arrayType == JSONPathArrayType.INDEX) return "["+(Number(key)+1)+"]";//index는 1부터 시작
    return "";
  }
}
