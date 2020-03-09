import { timer } from 'rxjs';
import { DateUtil } from './DateUtil';
import { MathUtil } from './MathUtil';

export class zTestDataUtil
{
    static size = 1;
    static test_data()
    {
        zTestDataUtil.size++; if(zTestDataUtil.size > 10) zTestDataUtil.size = 3;
        console.log("======= zTestDataUtil test_data #size="+ zTestDataUtil.size);
        let datas = [];
        let curdate = new Date();
        for(let i=0;i<zTestDataUtil.size;i++)
        {
            ["host-1","host-2"].forEach((host,ii)=>{
                let ip = "ip-"+ ii;
                let date = DateUtil.addDays(curdate,i);
                let cpu = MathUtil.random(0,10);
                let memory = cpu * 2;
                datas.push({host:host,ip:ip,date:date,cpu:cpu,memory:memory });
            });
        }
        return datas;
    }



    // static test_adddata()
    // {
    //   this.no++;
    //   let date = new Date();
    //   let newdate = DateUtil.addDays(date,this.no);
  
    //   ["host-1","host-2"].forEach(host=>{
    //     let temp = NumberUtil.stringToNumber(StringUtil.substringAfter(host,"-"));
    //     let value = temp * MathUtil.random(0,10);
    //     //this.addData({legend:host,x:newdate,y:value*2});
    //     this.addDataRow(host,newdate,value*2);
    //   })
    // }




    // static no = 3;
    // static test_data()
    // {
    //     this.no++; if(this.no > 10) this.no = 3;
        
    //     let datas = [];
    //     for(let i=0;i<this.no;i++)
    //     {
    //         let host = "host-"+ (i%2);
    //         let ip = "ip-"+ (i%2);
    //         let date = DateUtil.addDays(new Date(),this.no);
    //         let cpu = i;
    //         let memory = i*2;
    //         // datas.push({key: ""+i,checked:false,host:host,ip:ip,date:date,cpu:cpu,memory:memory });
    //         datas.push({host:host,ip:ip,date:date,cpu:cpu,memory:memory });
    //     }
    //     return datas;
    // }
}