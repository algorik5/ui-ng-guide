export class ColorUtil
{
  static statusIconName(status) { 
    if(status=="error") return "up";
    if(status=="warn") return "down";
    return "left";
  }
  static statusIconColor(status){
    if(status=="error") return "red";
    if(status=="warn") return "lime";
    return "green";
  }
  // static changeColorValueUnique(column,colorEnable,columns,colorDisable) 
  // { 
  //   this.changeColorAll(columns,colorDisable);//전체를 disable
  //   if(column["color"] == null) column["color"] = colorEnable;
  //   column["color"] = colorEnable;
  //   console.log("=== ColorUtil changeColorValueUnique #"+JSON.stringify(column))
  // }


    static changeColor(column) 
    { 
      if(column["color"] == null) column["color"] = "lime";
      else if(column["color"] == "red") column["color"] = "lime";
      else column["color"] = "red";
      console.log("=== ColorUtil changeColor #"+JSON.stringify(column))
    }
    static changeColorValue(column,color) 
    { 
      if(column["color"] == null) column["color"] = color;
      column["color"] = color;
      console.log("=== ColorUtil changeColorValue #"+JSON.stringify(column))
    }

    static changeColorAll(columns,color) 
    { 
      columns.forEach(column => { column["color"]=color; });//red lime
      console.log("=== ColorUtil changeColorAll #"+JSON.stringify(columns))
    }
}
