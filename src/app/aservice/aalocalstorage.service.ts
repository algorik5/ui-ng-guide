import { Injectable } from '@angular/core';
import { ObjectUtil } from '../autil/ObjectUtil';
import { AaloggingService } from './aalogging.service';

@Injectable({
  providedIn: 'root'
})
export class AalocalstorageService {

  constructor(private logging:AaloggingService) { }

  //////////////////////////////////////////// localStorage는 무조건 string
  get(key) { return localStorage.getItem(key); }//없으면 null
  set(key,value) { localStorage.setItem(key,value); }//object는 자동으로 string변환되어 들어감
  has(key) { return localStorage.getItem(key)!=null?true:false; }
  contains(key) { return this.has(key); }
  remove(key) { localStorage.removeItem(key); }
  clear() { localStorage.clear(); this.logging.debug("===== clear#"+ localStorage); }
  size() { return localStorage.length; }

  keys() { return Object.keys(localStorage); }
  values() { return ObjectUtil.values(localStorage); }
  // keyvalues() { return ObjectUtil.keyvalues(localStorage); }//Object.keys(localStorage).map(key=>{ return {key:key,value:localStorage[key]}; }); }
  keyvalues() { //===그냥 localStorage와 동일함
    // if(localStorage == null) return [];
    let str = JSON.stringify(localStorage);
    // this.logging.debug("===== keyvalues#"+ str);
    return JSON.parse(str);
  }
  tomap() { 
    let map = new Map();
    Object.keys(localStorage).forEach(key=>{ map.set(key,localStorage[key]); });
    this.logging.debug("===== tomap#"+ map);
    return map;
  }

  ////////////////////////////////////////// object 처리
  // getObject(key) {};
  // setObject(key,obj) {}

  ////////////////////////////////////////// msgtablemapping
  private msgtablemapping_name = "msgtablemapping";
  msgtablemapping_init() {
    if(this.has(this.msgtablemapping_name)==false) { this.set(this.msgtablemapping_name,""); }//{} > [object Object]
  }

  msgtablemapping_add(msg,table)//[{msg:type1,tables:[table1,table2]}
  {
    this.msgtablemapping_init();
    let str = this.get(this.msgtablemapping_name);//[{msg:type1,tables:[table1,table2]}
    this.logging.debug("--- msgtablemapping_add 1 # "+ msg +":"+ table +":"+ typeof(str) +":"+ str);// 

    if(str.length<1)
    {
      let arr = [{msg:msg,tables:[table]}];
      this.logging.debug("--- msgtablemapping_add 2 # "+ msg +":"+ table +":"+ JSON.stringify(arr));
      this.set(this.msgtablemapping_name,JSON.stringify(arr));
    }
    else
    {
      let arr = JSON.parse(str);
      let obj = arr.find(k=>k["msg"]==msg);
      if(obj == null) { obj = {msg:msg,tables:[table]}; arr = arr.concat(obj); }
      else 
      {
        if(obj["tables"].includes(table)==false) obj["tables"] = obj["tables"].concat(table); 
      }
      this.set(this.msgtablemapping_name,JSON.stringify(arr));
    }
    this.logging.debug("---------- msgtablemapping_add # "+ msg +":"+ table +":"+ this.get(this.msgtablemapping_name));
  }
  msgtablemapping_get(msg)//array 리턴
  {
    this.msgtablemapping_init();
    let str = this.get(this.msgtablemapping_name);
    this.logging.debug("--- msgtablemapping_get 1 # "+ msg +":"+ typeof(str) +":"+ str);// 

    if(str.length<1) return "";
    let arr = JSON.parse(str);
    let obj = arr.find(k=>k["msg"]==msg);
    this.logging.debug("---------- msgtablemapping_get # "+ msg +":"+ JSON.stringify(obj));
    return JSON.stringify(obj);
  }
  msgtablemapping_value()//array 리턴
  {
    // if(1==1) return {};
    this.msgtablemapping_init();
    let str = this.get(this.msgtablemapping_name);//{type1:[table1,table2],type2:[table]...}
    this.logging.debug("--- msgtablemapping_value 1 # "+ typeof(str) +":"+ str);//
    return str;
  }
}
