import { Component, OnInit, Input } from "@angular/core";
import { AapubsubService } from "src/app/aservice/aapubsub.service";
import { AatableService } from "src/app/aservice/aatable.service";
import { AaloggingService } from 'src/app/aservice/aalogging.service';
import { DateUtil } from 'src/app/autil/DateUtil';
import { MathUtil } from 'src/app/autil/MathUtil';
import { zTestDataUtil } from 'src/app/autil/zTestDataUtil';
import { ArrayUtil } from 'src/app/autil/ArrayUtil';

@Component({
  selector: 'app-atable-test',
  templateUrl: './atable-test.component.html',
  styleUrls: ['./atable-test.component.less']
})
export class AtableTestComponent implements OnInit {

  constructor(private pubsub: AapubsubService,private logging:AaloggingService) {}

  @Input() myname = "table-test";//this.myname+".table.
  ngOnInit() {
    this.pubsub.sub(this.myname+".tableselectdata", datas => {
    });
  }



  ////////////////////////////////////////////////////////// testdata  
  test_datas()
  {
    //let datas = this.table.test_data();
    let datas = zTestDataUtil.test_data();
    ArrayUtil.setColumnValue(datas,"checked",false);//datas.forEach(data=>data["checked"]=true);
    this.pubsub.pub(this.myname+".tabledatas",datas);//this.table.setData(datas);
  }
  test_no = 0;
  test_data() { 
    this.test_no++; let curdate = new Date(); let date = DateUtil.addDays(curdate,this.test_no);
    let value = MathUtil.random(0,10);
    let data = {host:"host-x",ip:"ip-x",date:date,cpu:value,memory:value*2,checked:false};
    this.pubsub.pub(this.myname+".tabledata",data);//this.table.addDatas(data);
  }
  test_columnshow()
  {
    this.pubsub.pub(this.myname+".tablecolumnshow","host");//this.table.changeColumnShow("host");
  }
  test_editable = false; 
  test_edit() { 
    this.test_editable = this.test_editable?false:true; 
    this.pubsub.pub(this.myname+".tableeditable",this.test_editable);//this.table.changeColumnShow("host");
  }
  test_checkable = false; 
  test_check() { 
    this.test_checkable = this.test_checkable?false:true; 
    this.pubsub.pub(this.myname+".tablecheckable",this.test_checkable);//this.table.changeColumnShow("host");
  }
  test_checkedall = false; 
  test_checkall() { 
    this.test_checkedall = this.test_checkedall?false:true; 
    this.pubsub.pub(this.myname+".tablecheckall",this.test_checkedall);//this.table.changeColumnShow("host");
  }

}
