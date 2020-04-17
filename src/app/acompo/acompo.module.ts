import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AcompoRoutingModule } from './acompo-routing.module';
import { AcountdownComponent } from './acountdown/acountdown.component';
import { AchartComponent } from './achart/achart.component';
import { AtableComponent } from './atable/atable.component';
import { AstatComponent } from './astat/astat.component';
import { SharedModule } from 'src/app/shared.module';

@NgModule({
  declarations: [AcountdownComponent, AchartComponent, AtableComponent, AstatComponent],
  exports: [AcountdownComponent, AchartComponent, AtableComponent, AstatComponent],
  imports: [
    CommonModule,
    SharedModule,
    AcompoRoutingModule
  ]
})
export class AcompoModule { }
