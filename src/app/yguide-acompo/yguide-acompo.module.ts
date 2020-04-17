import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { YguideAcompoRoutingModule } from './yguide-acompo-routing.module';
import { AcompoModule } from '../acompo/acompo.module';
import { AcountdownTestComponent } from './acountdown-test/acountdown-test.component';
import { AchartTestComponent } from './achart-test/achart-test.component';
import { AtableTestComponent } from './atable-test/atable-test.component';
import { AstatTestComponent } from './astat-test/astat-test.component';
import { SharedModule } from 'src/app/shared.module';


@NgModule({
  declarations: [AcountdownTestComponent, AchartTestComponent, AtableTestComponent, AstatTestComponent],
  imports: [
    CommonModule,
    SharedModule,AcompoModule,
    AcompoModule,
    YguideAcompoRoutingModule
  ]
})
export class YguideAcompoModule { }
