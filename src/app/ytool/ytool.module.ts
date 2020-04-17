import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { YtoolRoutingModule } from './ytool-routing.module';
import { LocalstorageComponent } from './localstorage/localstorage.component';
import { SharedModule } from 'src/app/shared.module';
import { AcompoModule } from 'src/app/acompo/acompo.module';

@NgModule({
  declarations: [LocalstorageComponent],
  imports: [
    CommonModule,
    SharedModule,AcompoModule,
    YtoolRoutingModule
  ]
})
export class YtoolModule { }
