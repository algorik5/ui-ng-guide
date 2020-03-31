# xxx generate
- ng g m guidev2/countdown --routing
- ng g c guidev2/countdown
- ---ng g s guidev2/countdown/countdown
- ng g c guidev2/countdown/countdown-server-cpu-max
# 현재 module 수정
- xxx.module.ts	
  - FormsModule,ReactiveFormsModule,NgZorroAntdModule,NgxEchartsModule,NzCodeEditorModule,NgxJsonViewerModule,ScrollingModule,TreeTableModule,NgPipesModule,
- xxx-routing
  - { path: 'countdown',component: CountdownComponent }
# app module 수정
- app-routing
  - { path: 'guidev2',loadChildren: () => import('./guidev2/countdown/countdown.module').then(m => m.CountdownModule)},
- app.compoent
  - <a title routerLink="guidev2/countdown"...
# 화면 개발
- (layout) ....compoenent.html <<< guidev2/layout복사 >>>
  -	nz-row/col 변경 >>> <app-countdown-form></app-countdown-form> ...
- 각 화면 : guidev2 참고
- *** topic변경-myname
# *** service 설정 - 설정하지 않으면 singleton
- 결론 - singleton필요하지 않으면 반드시 compo에 설정해서 사용하자
- (***주의) providers: [AatableService] <<< 또는 compo.ts에 설정 >>>
- AatableService의 경우 singleton이면 다른 화면에서 값을 넣으면 전체가 같이 변경되니 주의바람


# ========================================== guide (향후변경 - 1 module)
ng g m yguide/inputoutput --routing
ng g c yguide/inputoutput
  - FormsModule,ReactiveFormsModule,NgZorroAntdModule,NgxEchartsModule,NzCodeEditorModule,NgxJsonViewerModule,ScrollingModule,TreeTableModule,NgPipesModule,
  - { path: 'inputoutput',component: InputoutputComponent }
  - { path: 'guide',loadChildren: () => import('./yguide/inputoutput/inputoutput.module').then(m => m.InputoutputModule)},
  - <a title routerLink="guide/inputoutput"...
복사 - guide/dblocal에서 복사


# #############################################################################
# ========================================== acompo (1 module)
(처음에만) ng g m acompo --routing
  - FormsModule,ReactiveFormsModule,NgZorroAntdModule,NgxEchartsModule,NzCodeEditorModule,NgxJsonViewerModule,ScrollingModule,TreeTableModule,NgPipesModule,
ng g c acompo/achart --export=true (===exports: AcountdownComponent)
 - (개발) 
   - @Input() parentname = "acompo"; myname = "chart";
   - this.pubsub.sub(this.parentname+"."+this.myname+".datas",datas => { });
   - this.pubsub.pub(this.parentname+"."+this.myname+".xxx","xxx");    
# ========================================== acompo guide (1 module)
(처음에만) ng g m yguide-acompo --routing
  - FormsModule,ReactiveFormsModule,NgZorroAntdModule,NgxEchartsModule,NzCodeEditorModule,NgxJsonViewerModule,ScrollingModule,TreeTableModule,NgPipesModule,
  - ***AcompoModule
  - { path: 'guide-acompo',loadChildren: () => import('./yguide-acompo/yguide-acompo.module').then(m => m.YguideAcompoModule)},
ng g c yguide-acompo/achart-test
  - { path: 'achart-test',component: AchartTestComponent }
  - app.component : 메뉴 등록
  - (개발) 
    - <app-achart [parentname]="myname"></app-achart>
    - @Input() parentname = "---"; myname = "chart-test";
    - this.pubsub.sub(this.myname+".chart.xxx",data=>{ });
    - this.pubsub.pub(this.myname+".chart.charttype",this.mycharttype);
          





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


# ========================================== dashboard


# ======================== 참고
- ng g c yguide-test/sqlquery/view-search --inlineStyle=true --inlineTemplate=true --flat=true



