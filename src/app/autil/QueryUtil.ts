export class QueryUtil
{
    static createtable_sql(table,columntypes)
    {
        let columnQuery = null;
        columntypes.forEach((columntype,i)=>{
          if(columnQuery == null) columnQuery = ""+columntype["column"] +" "+ columntype["type"] ;
          else columnQuery = columnQuery +","+ columntype["column"] +" "+ columntype["type"] ;
        });
        let query = "create table "+ table + "( "+ columnQuery +" )";
        console.log("===== createtable_sql # "+ query);
        return query;
    }

    static insert_sql(table,columns)
    {
      /////////////////// pstmt
      let sqlcolumn = "";
      let sqlvalue = "";
      columns.forEach((column,i)=>{
        if(i==0) sqlcolumn = column;
        else sqlcolumn = sqlcolumn +","+ column;
        if(i==0) sqlvalue = ":"+column;
        else sqlvalue = sqlvalue +",:"+ column;
      });
      let query = "insert into "+ table +" ("+sqlcolumn +") values ("+ sqlvalue +")";
      console.log("==== insert_sql "+ query);
      return query;
    }

}
