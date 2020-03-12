import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AamapService {

  constructor() { }

  map : Map<string,any> = new Map();

  clear() { this.map.clear(); }
  contains(key) { return this.map.has(key); }
  has(key) { return this.map.has(key); }
  get(key) { return this.map.get(key); }
  set(key,value) { this.map.set(key,value); }  
  toObject() { //value가 object여서 OK //Array.from(this.map) >>> [["a",1],["b",1]]    
    let obj = {}; this.map.forEach((value, key) => { obj[key] = value });//for (let [key,value] of this.map) { obj[key] = value; }
    return obj;//{"a":1,"b":1}
  }
  toMap(obj) { Object.keys(obj).forEach(key=>{ this.map.set(key, obj[key]); }); }//(let key of Object.keys(obj)) == for (var key in obj) { map.set(key,obj[key]) }
  toString() { return JSON.stringify(this.toObject()); }//[["a",1],["b",1]] //안됨-map.entries

  keysToArray() { return Array.from(this.map.keys()); }
  valuesToArray() { return Array.from(this.map.values()); }

  //sort
  keysToArray_sort() { return Array.from(this.map.keys()).sort(); }
  valuesToArray_sort() { return Array.from(this.map.values()).sort(); }

}
