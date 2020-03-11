import { Component, OnInit } from '@angular/core';
import { AatreetableService } from 'src/app/aservice/aatreetable.service';
import { AapubsubService } from 'src/app/aservice/aapubsub.service';
import { AaloggingService } from 'src/app/aservice/aalogging.service';

@Component({
  selector: 'app-my-treetable',
  templateUrl: './my-treetable.component.html',
  styleUrls: ['./my-treetable.component.less']
})
export class MyTreetableComponent implements OnInit {

  constructor(private treetable: AatreetableService, private pubsub: AapubsubService,private logging:AaloggingService) {}

  jsonviewdata = [];
  
  ngOnInit() {

    this.pubsub.sub("treetable-fromjson.treetable", datas => {
      this.jsonviewdata = datas;
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
    this.pubsub.pub("treetable-fromjson.treetable",datas);//this.treetable.setData(datas);
  }
}
