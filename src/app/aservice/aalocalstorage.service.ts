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
    this.logging.debug("===== keyvalues#"+ str);
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
  msgtablemapping_add(msg,table)//{type1:[table1,table2],type2:[table]...}
  {
    if(this.has(this.msgtablemapping_name)==false) { this.set(this.msgtablemapping_name,{}); }

    let str = this.get(this.msgtablemapping_name);//{type1:[table1,table2],type2:[table]...}
    let obj = JSON.parse(str);
    if(obj[msg] == null) obj[msg] = table;
    else
    {
      let tables = obj[msg];
      if(tables.includes(table)) return;
      obj[msg] = obj[msg].concat([table]);
    }
    this.set(msg,obj);
    this.logging.debug("---------- msgtablemapping_add # "+ msg +":"+ table +":"+ JSON.stringify(obj));
  }
  msgtablemapping_get(msg)//array 리턴
  {
    if(this.has(this.msgtablemapping_name)==false) { this.set(this.msgtablemapping_name,{}); }

    let str = this.get(this.msgtablemapping_name);//{type1:[table1,table2],type2:[table]...}
    let obj = JSON.parse(str);
    this.logging.debug("---------- msgtablemapping_get # "+ msg +":"+ obj[msg]);
    return obj[msg];
  }
}
