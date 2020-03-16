import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StompdbinsertRoutingModule } from './stompdbinsert-routing.module';
import { StompdbinsertComponent } from './stompdbinsert.component';
import { StompdbinsertFormComponent } from './stompdbinsert-form/stompdbinsert-form.component';
import { StompdbinsertTableschemaComponent } from './stompdbinsert-tableschema/stompdbinsert-tableschema.component';
import { StompdbinsertTabledataComponent } from './stompdbinsert-tabledata/stompdbinsert-tabledata.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NgxEchartsModule } from 'ngx-echarts';
import { NzCodeEditorModule } from 'ng-zorro-antd/code-editor';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { TreeTableModule } from 'primeng/treetable';
import { AatableService } from 'src/app/aservice/aatable.service';
import { StompdbinsertDebugjsonviewComponent } from './stompdbinsert-debugjsonview/stompdbinsert-debugjsonview.component';


@NgModule({
  declarations: [StompdbinsertComponent, StompdbinsertFormComponent, StompdbinsertTableschemaComponent, StompdbinsertTabledataComponent, StompdbinsertDebugjsonviewComponent],
  imports: [
    CommonModule,
    FormsModule,ReactiveFormsModule,NgZorroAntdModule,NgxEchartsModule,NzCodeEditorModule,NgxJsonViewerModule,ScrollingModule,TreeTableModule,
    StompdbinsertRoutingModule
  ],
})
export class StompdbinsertModule { }
