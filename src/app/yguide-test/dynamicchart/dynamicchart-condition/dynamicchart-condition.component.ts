import { Component, OnInit } from "@angular/core";
import { AapubsubService } from "src/app/aservice/aapubsub.service";
import { AasqlService } from "src/app/aservice/aasql.service";
import { AaloggingService } from "src/app/aservice/aalogging.service";
import { AaformService } from "src/app/aservice/aaform.service";
import { ObjectUtil } from 'src/app/autil/ObjectUtil';

@Component({
  selector: 'app-dynamicchart-condition',
  templateUrl: './dynamicchart-condition.component.html',
  styleUrls: ['./dynamicchart-condition.component.less']
})
export class DynamicchartConditionComponent implements OnInit {
  constructor(
    private form:AaformService,
    private pubsub: AapubsubService,
    private sql: AasqlService,
    private logging: AaloggingService
  ) {}

  ngOnInit() {
    this.formInit();
  }

  formInit()
  {
    this.form.addControl("sql");
    this.form.setControlValue("sql","select * from server \nwhere 1=1 \norder by host,time");
  }
  getFormgroup() { return this.form.getFormgroup(); }
  getFormColumns() { return this.form.getControlNames(); }
  getFormValue(name) { return this.form.getControlValue(name); }

  
  formSubmit() {
    this.logging.debug("============ formSubmit # ");
    let sql = this.form.getControlValue("sql");
    let datas = this.sql.select(sql);

    let columns = this.sql.getColumns();//name,color
    this.legendColumns = ObjectUtil.cloneObject(columns);
    this.xColumns = ObjectUtil.cloneObject(columns);
    this.yColumns = ObjectUtil.cloneObject(columns);
  }

  // getColumns() { return this.sql.getColumns(); }
  // clickColumn(column)
  // {
  //    ColorUtil.changeColor(column);
  //   this.pubsub.pub("dynamicchart.column", column["name"]);
  // }

  legendColumns = []; xColumns = []; yColumns = [];
  curLegend; curX; curY;
  getLegendColumns() { return this.legendColumns; }
  getXColumns() { return this.xColumns; }
  getYColumns() { return this.yColumns; }
  clickLegendColumn(column)
  {
    this.curLegend = column;
    this.changeColor(column,this.legendColumns);
    //this.changeColorDisable(column,this.xColumns);
    //this.changeColorDisable(column,this.yColumns);
    this.changeSelect("legend",column);
    // this.pubsub.pub("dynamicchart.column", column["name"]);
  }
  clickXColumn(column)
  {
    this.curX = column;
    this.changeColor(column,this.xColumns);
    //this.changeColorDisable(column,this.legendColumns);
    //this.changeColorDisable(column,this.yColumns);
    this.changeSelect("x",column);
    // this.pubsub.pub("dynamicchart.column", column["name"]);
  }
  clickYColumn(column)
  {
    this.curY = column;
    this.changeColor(column,this.yColumns);
    //this.changeColorDisable(column,this.legendColumns);
    //this.changeColorDisable(column,this.xColumns);
    this.changeSelect("y",column);
  }

  changeSelect(type,column)
  {
    if(this.curLegend == null) return;
    if(this.curX == null) return;
    if(this.curY == null) return;

    if(this.curLegend == this.curX) return;
    if(this.curLegend == this.curY) return;
    if(this.curX == this.curY) return;
    
    this.logging.debug("=== changeSelect # " +"#legend="+this.curLegend["name"]+"#x="+this.curX["name"]+"#y="+this.curY["name"])

    let legend = this.curLegend["name"]; let x = this.curX["name"]; let y = this.curY["name"]; 
    let sqldatas = this.sql.getDatas();
    let chartdatas = sqldatas.map(data => { return {legend:data[legend],x:data[x],y:data[y]}; });
    this.logging.debug("=== changeSelect 2 # " +"#chartdatas="+ JSON.stringify(chartdatas))
    //this.pubsub.pub("dynamicchart.column", {type:type,value:column});//column["name"]);
    this.pubsub.pub("dynamicchart.datas", chartdatas);
  }
  changeColor(column,columns) 
  { 
    columns.map(c=>{
      c["name"]==column["name"] ? c["color"]="red":c["color"]="lime"; 
    });
  }
  changeColorDisable(column,columns) 
  { 
    columns.filter(c=>c["name"]==column["name"]).map(c=>{ c["color"]="lightgray" });
  }

}
