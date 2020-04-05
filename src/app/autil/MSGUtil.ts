import { StringUtil } from './StringUtil';

export class MSGUtil
{
    static getTypeCompact(type)
    {
        return StringUtil.substringAfterLast(type,".");
    }

    static msgToTableColumn(msgstring:string)
    {
        let tablecolumns = [];
        let json = JSON.parse(msgstring);
        Object.keys(json).forEach(key=>{
          let data = {column:key,type:"string",pk:"N",sample:json[key]};
          tablecolumns = tablecolumns.concat(data);
        });
        return tablecolumns;
    }

}
