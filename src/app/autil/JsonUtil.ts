declare var Flatted;

export class JSONUtil
{
    static pretty(obj)
    {
        let str = JSON.stringify(obj,null,2);
        console.log('--------- JSONUtil pretty # '+ str);
        return str;
    }

    static stringify(obj):string
    {
        try{
            return JSON.stringify(obj);
        }catch(e) { console.log("====== JSONUtil stringify ERROR # "+ e);}
        return "[Flatted]"+Flatted.stringify(obj);
    }
}