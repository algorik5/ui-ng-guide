import { Injectable } from '@angular/core';
import { AamapService } from './aamap.service';

@Injectable({
  providedIn: 'root'
})
export class AacountmapService extends AamapService {

  constructor() { super(); }

  addCount(key,count)
  {
    if(this.contains(key)==false) this.set(key,0);
    this.set(key,this.get(key)+count);
    return this.get(key);
  }
  getCount(key) { return super.get(key); }
  clearCount(key) { super.set(key,0); }
  clearAll() { super.clear(); }
  toString() { return super.toString(); }

}
