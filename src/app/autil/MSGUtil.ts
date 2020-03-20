import { StringUtil } from './StringUtil';

export class MSGUtil
{
    static getTypeCompact(type)
    {
        return StringUtil.substringAfterLast(type,".");
    }

}