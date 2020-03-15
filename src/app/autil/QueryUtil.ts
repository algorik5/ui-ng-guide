import { StringUtil } from './StringUtil';

export class QueryUtil
{
    static createtable_sql(table,columntypes)
    {
        let columnQuery = null;
        columntypes.forEach((columntype,i)=>{
          let column = columntype["column"];
          if(column.includes(".")) column = StringUtil.replaceAll(column,".","_");
          else if(column=="count") column = column+"_";
          let type = columntype["type"];

          if(columnQuery == null) columnQuery = ""+column +" "+ type ;
          else columnQuery = columnQuery +","+ column +" "+ type ;
        });
        let query = "create table "+ table + "( "+ columnQuery +" )";
        console.log("===== createtable_sql # "+ query);
        return query;
    }

    static insert_sql(table,columns)
    {
      /////////////////// pstmt
      let sqlcolumn = null;
      let sqlvalue = null;
      columns.forEach((column,i)=>{
        if(sqlcolumn == null) sqlcolumn = column;
        else sqlcolumn = sqlcolumn +","+ column;
        if(sqlvalue == null) sqlvalue = ":"+column;
        else sqlvalue = sqlvalue +",:"+ column;
      });
      let query = "insert into "+ table +" ("+sqlcolumn +") values ("+ sqlvalue +")";
      console.log("==== insert_sql "+ query);
      return query;
    }

}
