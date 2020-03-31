import { timer } from 'rxjs';

export class TimerUtil
{
    static createTimer()
    {
        //rxjs timer - mytimer=timer(1000,10000); mytimer.subscribe(count=>alert...
        let mytimer = timer(1000,1000).subscribe(count=>{
            console.log("======== mytimer # "+ count);
        });
        mytimer.unsubscribe();//timer stop
    }

    static test1() { console.log("test"); }
}
