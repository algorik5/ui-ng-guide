export class ColorUtil
{
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
