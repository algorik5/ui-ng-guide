declare var Flatted;

export class JsonUtil
{
    static pretty(obj)
    {
        let str = JSON.stringify(obj,null,2);
        console.log('--------- str # '+ str);
    }

    static stringify(obj):string
    {
        try{
            return JSON.stringify(obj);
        }catch(e) { console.log("====== JsonUtil.stringify ERROR # "+ e);}
        return "[Flatted]"+Flatted.stringify(obj);
    }
}