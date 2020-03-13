import { Injectable } from '@angular/core';
import { AaloggingService } from './aalogging.service';

/*
npm install alasql
angular.json - node_modules/alasql/dist/alasql.min.js
ts - declare var alasql;
(주의) 사용불가 - alasql-angular
(다른사용법) db = new alasql.Database();...db.exec(sql)... <<< pstmt사용할수없어 사용안함
*/

declare var alasql;

@Injectable({
  providedIn: 'root'
})
export class AasqllocalService {

  constructor(private logging:AaloggingService) { }

  dbinfoall()
  {
    let size = this.dbinfoallsize(); let dbnames = this.dbinfoallnames();
    this.logging.debug("=== dbinfo === "+ alasql.databases +"#size="+size+"#dbnames="+dbnames);
    return alasql.databases;//alasql.databases alasql.databases.alasql alasql.tables 
  }
  dbinfoallsize() { return Object.keys(alasql.databases).length }//alasql.databases.length > undefined
  dbinfoallnames() { return Object.keys(alasql.databases); }
  dbinfo()//db == alasql.databases.alasql
  {
    let dbid = this.dbid(); let dbcount = this.dbcount(); let dbcachesize = this.dbcachesize();
    this.logging.debug("=== dbinfo === "+ alasql.databases +"#dbid="+dbid+"#dbcount="+dbcount+"#dbid="+dbcachesize);
    return alasql.databases.alasql;//alasql.databases alasql.databases.alasql alasql.tables 
  }
  dbid() { return alasql.databases.alasql["databaseid"]; }
  dbcount() { return alasql.databases.alasql["counter"]; }
  dbcachesize() { return alasql.databases.alasql["sqlCacheSize"]; }
  dbtables()//create table test1 (id int primary key,name string )
  {
    this.logging.debug("=== dbtables === "+ Object.keys(alasql.tables));
    //if(alasql.tables == null) return [];//null없음 - []
    return Object.keys(alasql.tables);
  }
  dbtablecount() { return Object.keys(alasql.tables).length; }//alasql.tables.length > undefined
  
  getColumns(table) 
  {
    let tableschema = alasql.databases.alasql.tables[table];
    // this.logging.debug("=== getColumns === "+"#table="+table +"#tableschema="+ tableschema);
    if(tableschema == null) return [];
    let columns = tableschema["columns"];
    if(columns == null) return [];
    let newcolumns = columns.map(column=>{ return {column:column["columnid"],type:column["dbtypeid"]}});
    this.logging.debug("=== getColumns === "+"#table="+table +"#newcolumns="+ newcolumns);
    return newcolumns;
  }
  getColumnNames(table) 
  {
    let tableschema = alasql.databases.alasql.tables[table];
    // this.logging.debug("=== getColumns === "+"#table="+table +"#tableschema="+ tableschema);
    if(tableschema == null) return [];
    let columns = tableschema["columns"];
    if(columns == null) return [];
    let newcolumns = columns.map(column=>{ return column["columnid"]});
    this.logging.debug("=== getColumnNames === "+"#table="+table +"#newcolumns="+ newcolumns);
    return newcolumns;
  }
  createtable(sql:string)
  {
    try{
      this.logging.debug("=== createtable === "+ sql);
      let rs = alasql.exec(sql);
      return rs;
    }catch(err) 
    { 
      this.logging.error("=== createtable ERROR === "+ sql +":"+ err);
      throw err;//return "ERROR-"+ err; //throw err; //throw new Error("createtable ERROR - "+ err);
    }
  }
  select_count(table:string)
  {
    let rs = alasql.exec("select count(*) from "+ table);//let rs = Object.keys(alasql.databases.alasql.tables[table]).length
    this.logging.debug("=== selectcount === #rs="+ JSON.stringify(rs));
    return rs;
  }
  select(sql:string)
  {
    // this.logging.debug("=== select === "+ sql);
    let rs = alasql.exec(sql);
    this.logging.debug("=== select === #rs="+ JSON.stringify(rs));
    return rs;
  }

  insert(sql:string)
  {
    // this.logging.debug("=== insert === "+ sql);
    let rs = alasql.exec(sql);
    this.logging.debug("=== insert === #rs="+ JSON.stringify(rs));
    return rs;
  }

  //pstmt..pst.t=alasql.compile(sql(:id)...pstmt(sql)<{id:x,... 
  //주의 - pstmt를 사용하려면 alasql.compile 사용해야 함 <<< alaslq.Database() 사용불가
  insert_pstmt(sql:string,datas):any//insert into test1 (id,name) values (:id,:name) ----- [{id:x,name:x}...]
  {
    // this.logging.debug("=== insert_pstmt === "+"#sql="+ sql +"#data="+JSON.stringify(data));
    let pstmt = alasql.compile(sql);
    //let rs = pstmt(datas);
    let count = 0;
    datas.forEach(data=> {
      let rs = pstmt(data); 
      count = count + rs;
    });
    this.logging.debug("=== insert_pstmt === #count="+ count +"#sql="+ sql);
    return count;
  }
}
