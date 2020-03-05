import { Injectable } from '@angular/core';
import { LoggingService } from './logging.service';

@Injectable({
  providedIn: 'root'
})
export class SqlService {

  constructor(private logging:LoggingService) { }

  select(sql:string)
  {
    this.logging.debug("select # "+ sql);

    return this.test_data();
  }




  no=3;
  test_data()
  {
    this.no++; if(this.no > 10) this.no = 3;
    let datas = [];
    for(let i=0;i<this.no;i++)
    {
      datas.push({key: ""+i,checked:false,name: 'name-'+i,age: i,address: 'address-'+i });
    }
    return datas;
  }

}
