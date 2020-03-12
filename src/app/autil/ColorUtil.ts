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


  // static COLOR_DEFAULT = "lime";
  // static COLOR_2 = "red";
    static changeColorClick(columns,colorDefault,column,color) 
    {
      if(columns["color"]==color) return;
      ColorUtil.changeColorAll(columns,colorDefault);
      ColorUtil.changeColorValue(column,color);

    }
    static changeColor(column) 
    { 
      if(column["color"] == null) column["color"] = "lime";
      else if(column["color"] == "red") column["color"] = "lime";
      else column["color"] = "red";
      // console.log("=== ColorUtil changeColor #"+JSON.stringify(column))
    }
    static changeColorValue(column,color) 
    { 
      if(column["color"] == null) column["color"] = color;
      column["color"] = color;
      // console.log("=== ColorUtil changeColorValue #"+JSON.stringify(column))
    }

    static changeColorAll(columns,color) 
    { 
      columns.forEach(column => { column["color"]=color; });//red lime
      // console.log("=== ColorUtil changeColorAll #"+JSON.stringify(columns))
    }

    static stringsToColorObject(strs,color) 
    { 
      if(strs == null || strs.length < 1) return strs;
      if(typeof(strs[0])!="string") return strs;//sql column은 color가 이미 부여됨(향후 변경)
    
      let columns = [];
      columns = strs.map(str=>{ return {name:str,color:color}; });
      // columns.forEach(column => { column["color"]=color; });//red lime
      // console.log("=== ColorUtil stringsToColorObject #"+JSON.stringify(columns))
      return columns;
    }
}
