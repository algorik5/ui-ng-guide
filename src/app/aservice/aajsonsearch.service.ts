import { Injectable } from '@angular/core';
import { AaloggingService } from 'src/app/aservice/aalogging.service';
import { JSONUtil } from '../autil/JSONUtil';

declare var defiant;

@Injectable({
  providedIn: 'root'
})
export class AajsonsearchService {

  constructor(private logging:AaloggingService) { }

  /////////////////////////////// 사용법
  //  recursive(//),절대경로(/)
  //  주의 : index는 1부터
  //  예) //* - 전체
  //  예: array검색 - //cc[1]/cca >>> //cc[*]/cca == //cc/cca


  search(mydata,path)
  {
    this.logging.debug("jsonsearch search start # "+path+":"+JSONUtil.stringify(mydata));
    let searches = defiant.search(mydata,path);//없으면 [] 리턴(무조건 array리턴)
    this.logging.debug("jsonsearch search end   # "+JSONUtil.stringify(searches));
    return searches;
  }
}
