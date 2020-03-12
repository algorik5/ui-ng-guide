import { Component, OnInit } from "@angular/core";
import { AapubsubService } from "src/app/aservice/aapubsub.service";
import { AasqlService } from "src/app/aservice/aasql.service";
import { AaloggingService } from "src/app/aservice/aalogging.service";
import { AaformService } from "src/app/aservice/aaform.service";
import { ObjectUtil } from 'src/app/autil/ObjectUtil';
import { JSONUtil } from 'src/app/autil/JSONUtil';
import { ColorUtil } from 'src/app/autil/ColorUtil';

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

  topicprefix = "dynamicchart.chart";//this.topicprefix+".datas"

  ngOnInit() {
    this.formInit();

    // this.pubsub.sub(this.topicprefix+".data", data => {
    // });
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
    this.sql.select(sql,rs=>{ 
      let columns = this.sql.getColumns();//name,color
      this.logging.debug("formSubmit select "+"#columns="+ JSONUtil.stringify(columns));

      //////////////////////////////////// chart관련
      this.setChartColumns(columns);
    });
  }




  
  //////////////////////////////////// chart관련
  legendColumns = []; xColumns = []; yColumns = [];
  curLegend; curX; curY;
  setChartColumns(columns)
  {
    if(columns == null || columns.length < 1) return;
    let colorColumns = ColorUtil.stringsToColorObject(columns,"lime");//color부여-//sql column은 color가 이미 부여됨(향후 변경)

    this.legendColumns = ObjectUtil.cloneObject(colorColumns);
    this.xColumns = ObjectUtil.cloneObject(colorColumns);
    this.yColumns = ObjectUtil.cloneObject(colorColumns);
  }
  getLegendColumns() { return this.legendColumns; }
  getXColumns() { return this.xColumns; }
  getYColumns() { return this.yColumns; }
  clickLegendColumn(column) { this.curLegend = column; ColorUtil.changeColorClick(this.legendColumns,"lime",column,"red"); this.changeSelect("legend",column); }
  clickXColumn(column) { this.curX = column; ColorUtil.changeColorClick(this.xColumns,"lime",column,"red"); this.changeSelect("x",column); }
  clickYColumn(column) { this.curY = column; ColorUtil.changeColorClick(this.yColumns,"lime",column,"red"); this.changeSelect("y",column); }

  changeSelect(type,column)
  {
    if(this.curLegend == null || this.curX == null || this.curY == null) return;
    if(this.curLegend == this.curX || this.curLegend == this.curY || this.curX == this.curY) return;
    
    this.logging.debug("=== changeSelect # " +"#legend="+this.curLegend["name"]+"#x="+this.curX["name"]+"#y="+this.curY["name"])

    let legend = this.curLegend["name"]; let x = this.curX["name"]; let y = this.curY["name"]; 
    let sqldatas = this.sql.getDatas();
    let chartdatas = sqldatas.map(data => { return {legend:data[legend],x:data[x],y:data[y]}; });
    this.logging.debug("=== changeSelect 2 # " +"#chartdatas="+ JSON.stringify(chartdatas))
    //this.pubsub.pub("dynamicchart.column", {type:type,value:column});//column["name"]);
    this.pubsub.pub(this.topicprefix+".datas", chartdatas);//"dynamicchart.datas"
  }
}
