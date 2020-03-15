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

        let pkQuery = null;
        columntypes.forEach((columntype,i)=>{
          if(columntype["pk"]!="Y") return;

          let column = columntype["column"];
          if(pkQuery == null) pkQuery = ""+column ;
          else columnQuery = columnQuery +","+ column;
        });
        if(pkQuery != null) pkQuery = ",PRIMARY KEY ("+ pkQuery +")";
        else pkQuery = "";

        let query = "create table "+ table + "( "+ columnQuery + pkQuery +" )";
        console.log("===== createtable_sql # "+ query);
        return query;
    }

    static insert_sql(table,columntypes)
    {
      /////////////////// pstmt
      let columns = columntypes.map(column=>column["column"]);
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

    static update_sql(table,columntypes)
    {
      let nopks = columntypes.filter(column=>column["pk"]=="N").map(column=>column["column"]);
      let pks = columntypes.filter(column=>column["pk"]=="Y").map(column=>column["column"]);

      let sqlset = null;
      nopks.forEach((columntype,i)=>{
        let column = columntype["column"];
        let pk = columntype["pk"];
        if(sqlset == null) sqlset = column+"=:"+column;
        else sqlset = sqlset +","+ column+"=:"+column;

      let sqlwhere = null;
      columntypes.forEach((columntype,i)=>{
        let column = columntype["column"];
        let pk = columntype["pk"];
        if(sqlset == null) sqlset = column+"=:"+column;
        else sqlset = sqlset +","+ column+"=:"+column;

        if(sqlwhere == null) sqlwhere = ":"+column;
        else sqlwhere = sqlwhere +",:"+ column;
      });
      // let query = "insert into "+ table +" ("+sqlcolumn +") values ("+ sqlvalue +")";
      // console.log("==== insert_sql "+ query);
      // return query;
    }

}
