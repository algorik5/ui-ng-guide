//import { isNumeric } from 'rxjs/util/isNumeric';
// import * as rxjsNumeric from "rxjs/util/isNumeric"

export class NumberUtil
{
    static stringToNumber(str:string):number { return Number(str); }

    static isNumber(str:string):boolean { 
        return Number.isInteger(Number(str));//ts
        //Number.isNaN(Number(str)); ?
        //rxjs isNumeric 없어짐 ?
    }
}