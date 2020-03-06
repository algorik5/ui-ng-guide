import { Injectable } from '@angular/core';
import { LoggingService } from './logging.service';
import { NumberUtil } from '../autil/NumberUtil';
import { DateUtil } from '../autil/DateUtil';
import { StringUtil } from '../autil/StringUtil';
import { MathUtil } from '../autil/MathUtil';
import { zTestDataUtil } from '../autil/zTestDataUtil';

@Injectable({
  providedIn: 'root'
})
export class SqlService {

  constructor(private logging:LoggingService) { }

  select(sql:string)
  {
    this.logging.debug("select # "+ sql);

    return zTestDataUtil.test_data();
  }
}
