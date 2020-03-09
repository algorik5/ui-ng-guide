import { Component, OnInit } from '@angular/core';
import { AapubsubService } from 'src/app/aservice/aapubsub.service';
import { AaloggingService } from 'src/app/aservice/aalogging.service';
import { DateUtil } from 'src/app/autil/DateUtil';
import { MathUtil } from 'src/app/autil/MathUtil';
import { AatreetableService } from 'src/app/aservice/aatreetable.service';
import { JSONUtil } from 'src/app/autil/JSONUtil';


@Component({
  selector: 'app-treetable',
  templateUrl: './treetable.component.html',
  styleUrls: ['./treetable.component.less']
})
export class TreetableComponent implements OnInit {

  constructor(private treetable: AatreetableService, private pubsub: AapubsubService,private logging:AaloggingService) {}

  ngOnInit() {

    this.pubsub.sub("myname.treetable", datas => {
      this.treetable.setData(datas);//this.table.clearData(); this.table.addDatas(datas);
    });

    this.tableInit();
  }

  getTreeTableData() { return this.treetable.getData(); }
  getTreeTableColumns() { return this.treetable.getColumns(); }
  treetable_selectdata = [];//[(selection)] 부분에 함수 사용불가함
  //getTreeTableSelectData() { return this.treetable.getSelectData(); }//[(selection)] 부분에 함수 사용불가함
  //treeTableOnSelect(event) { this.treetable.onSelect(event); }
  treeTableOnSelect(event) { 
  //   console.log("====== selectTreeTableRow data=" + JSON.stringify(data));
  //   //this.pubsub.pub("mytreetable.dataselect", data);
  this.treetable.onSelect(event,this.treetable_selectdata); 
  }
  tableInit()
  {
    ////////////////////////////////////////////////////////// testdata  
    this.test_datas();
  }
  test_datas()
  {
    let datas = this.treetable.test_data();
    this.pubsub.pub("myname.treetable",datas);//this.treetable.setData(datas);
  }













  
  /////////////////////////// treetable/primeng
  // treetable_selectevent(){
  //   let set = new Set(); 
  //   datas = datas.filter((o)=>{
  //     if(o["children"]!=null && o["children"].length >0) return false;
  //     let path = o.data.path;
  //     let column = path;
  //     column = column.replace("//","").replace("/","_");
  //     if(path.includes("["))
  //     {
  //       path = path.split("[")[0] +"[*]"+ path.split("]")[1];
  //       column = column.split("[")[0] +""+ column.split("]")[1];
  //     } 
  //     if(set.has(path)) return false; set.add(path);
  //     o.data.path = path;
  //     o.data.column = column;
  //     return true;
  //   });//dup 제거

  //   if(datas == null || datas.length < 1) return;
  //   //this.table.clearTable();

  //   datas.forEach((o,i)=>{
  //     let path = o.data.path;
  //     let column = o.data.column;
  //     let mydata = {path:o.data.path,columnname:column,columntype:'string',pk:'N'};
  //     //if(i==0) this.table.setColumn(mydata);
  //     //this.table.addData(mydata);
  //   });

  //   //console.log("--------------updateTable end   ---"+ this.table.getDataLength());
  // }

}
