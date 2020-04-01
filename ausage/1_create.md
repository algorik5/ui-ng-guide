# generate
- ng g m hymon/dashboardv2 --routing
- ng g c hymon/dashboardv2
- ng g c hymon/dashboardv2/view-max (--inlineStyle=true --inlineTemplate=true --flat=true)
- (보류)---ng g s hymon/dashboardv2/dashboardv2
# module/route
  - FormsModule,ReactiveFormsModule,NgZorroAntdModule,NgxEchartsModule,NzCodeEditorModule,NgxJsonViewerModule,ScrollingModule,TreeTableModule,NgPipesModule,AcompoModule
  - { path: 'dashboardv2',component: Dashboardv2Component }
# app 수정 (route/menu)
# 화면 개발
- (layout) ....compoenent.html <<< hymon/layout복사 >>>
  -	nz-row/col 변경 >>> <app-dashboardv2-form></app-dashboardv2-form> ...
- 각 화면 : hymon 참고
- *** topic변경-myname
# *** service 설정 - 설정하지 않으면 singleton
- 결론 - singleton필요하지 않으면 반드시 compo에 설정해서 사용하자
- (***주의) providers: [AatableService] <<< 또는 compo.ts에 설정 >>>
- AatableService의 경우 singleton이면 다른 화면에서 값을 넣으면 전체가 같이 변경되니 주의바람


# ========================================== dashboard
ng g m hymon/dashboardv2 --routing
ng g c hymon/dashboardv2
ng g c hymon/dashboardv2/view-atop --inlineStyle=true --inlineTemplate=true --flat=true
ng g c hymon/dashboardv2/view-aleft --inlineStyle=true --inlineTemplate=true --flat=true
ng g c hymon/dashboardv2/view-aright --inlineStyle=true --inlineTemplate=true --flat=true
ng g c hymon/dashboardv2/view-max --inlineStyle=true --inlineTemplate=true --flat=true
ng g c hymon/dashboardv2/view-top --inlineStyle=true --inlineTemplate=true --flat=true
ng g c hymon/dashboardv2/view-trend --inlineStyle=true --inlineTemplate=true --flat=true
ng g c hymon/dashboardv2/view-table --inlineStyle=true --inlineTemplate=true --flat=true

module - FormsModule,ReactiveFormsModule,NgZorroAntdModule,NgxEchartsModule,NzCodeEditorModule,NgxJsonViewerModule,ScrollingModule,TreeTableModule,NgPipesModule,AcompoModule
route - { path: 'dashboardv2',component: Dashboardv2Component }
app routing/component


# ========================================== guide (향후변경 - 1 module)
ng g m yguide/inputoutput --routing
ng g c yguide/inputoutput
  - FormsModule,ReactiveFormsModule,NgZorroAntdModule,NgxEchartsModule,NzCodeEditorModule,NgxJsonViewerModule,ScrollingModule,TreeTableModule,NgPipesModule,AcompoModule
  - { path: 'inputoutput',component: InputoutputComponent }
  - { path: 'guide',loadChildren: () => import('./yguide/inputoutput/inputoutput.module').then(m => m.InputoutputModule)},
  - <a title routerLink="guide/inputoutput"...
복사 - guide/dblocal에서 복사


# #############################################################################
# ========================================== acompo (1 module)
(처음에만) ng g m acompo --routing
  - FormsModule,ReactiveFormsModule,NgZorroAntdModule,NgxEchartsModule,NzCodeEditorModule,NgxJsonViewerModule,ScrollingModule,TreeTableModule,NgPipesModule,
ng g c acompo/atable --export=true (===exports: AtableComponent)
 - (개발) 
   - @Input() parentname = "acompo"; myname = "table";//this.parentname+"."+this.myname
   - this.pubsub.sub(this.parentname+"."+this.myname+".datas",datas => { });
   - this.pubsub.pub(this.parentname+"."+this.myname+".xxx","xxx");    
# ========================================== acompo guide (1 module)
(처음에만) ng g m yguide-acompo --routing
  - FormsModule,ReactiveFormsModule,NgZorroAntdModule,NgxEchartsModule,NzCodeEditorModule,NgxJsonViewerModule,ScrollingModule,TreeTableModule,NgPipesModule,
  - ***AcompoModule
  - { path: 'guide-acompo',loadChildren: () => import('./yguide-acompo/yguide-acompo.module').then(m => m.YguideAcompoModule)},
ng g c yguide-acompo/atable-test
  - { path: 'atable-test',component: AtableTestComponent }
  - app.component : 메뉴 등록
  - (개발) 
    - <app-atable [parentname]="myname"></app-atable>
    - @Input() parentname = "---"; myname = "table-test";//this.myname+".table.
    - this.pubsub.sub(this.myname+".table.xxx",data=>{ });
    - this.pubsub.pub(this.myname+".table.charttype",this.mycharttype);
          





# #############################################################################
# ========================================== test (simple)
ng g c ytest/test-websocket
  - { path: 'test-websocket',component: TestWebsocketComponent }
  - <a title routerLink="guide/test-websocket"...
복사 - ytest/test-mqtt에서 복사

# ========================================== tool
--ng g m ytool --routing
ng g c ytool/stomp-todb
  - { path: 'localstorage',component: LocalstorageComponent }
  - <a title routerLink="tool/localstorage"...
복사 - ytool/localstorage에서 복사




# ======================== 참고
- ng g c yguide-test/sqlquery/view-search --inlineStyle=true --inlineTemplate=true --flat=true



