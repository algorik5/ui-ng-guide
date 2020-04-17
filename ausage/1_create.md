# generate
- ng g m hymon/dashboardv2 --routing
- ng g c hymon/dashboardv2
- ng g c hymon/dashboardv2/view-max (--inlineStyle=true --inlineTemplate=true --flat=true)
- (보류)---ng g s hymon/dashboardv2/dashboardv2
# module/route
  - SharedModule
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


# ========================================== 화면개발 (dashboard 등)
ng g m hymon/config --routing
ng g c hymon/config
ng g c hymon/config/view-atop --inlineStyle=true --inlineTemplate=true --flat=true
ng g c hymon/config/view-aleft --inlineStyle=true --inlineTemplate=true --flat=true
ng g c hymon/config/view-aright --inlineStyle=true --inlineTemplate=true --flat=true
ng g c hymon/config/view-tablestatus --inlineStyle=true --inlineTemplate=true --flat=true

module  - SharedModule
route - { path: 'config',component: ConfigComponent }
app routing/component


# ========================================== guide (향후변경 - 1 module)
ng g m yguide/inputoutput --routing
ng g c yguide/inputoutput
  - SharedModule
  - { path: 'inputoutput',component: InputoutputComponent }
  - { path: 'guide',loadChildren: () => import('./yguide/inputoutput/inputoutput.module').then(m => m.InputoutputModule)},
  - <a title routerLink="guide/inputoutput"...
복사 - guide/dblocal에서 복사


# #############################################################################
# ========================================== acompo (1 module)
(처음에만) ng g m acompo --routing
  - SharedModule
ng g c acompo/astat --export=true (===exports: AstatComponent)
 - (개발)-astat 복사)
   - @Input() myname = "stat";
   - this.pubsub.sub(this.myname+".datas",datas => { });
   - this.pubsub.pub(this.myname+".xxx","xxx");    
# ========================================== acompo guide (1 module)
(처음에만) ng g m yguide-acompo --routing
  - SharedModule
  - ***AcompoModule
  - { path: 'guide-acompo',loadChildren: () => import('./yguide-acompo/yguide-acompo.module').then(m => m.YguideAcompoModule)},
ng g c yguide-acompo/astat-test
  - { path: 'astat-test',component: AstatTestComponent }
  - app.component : 메뉴 등록
  - (개발-astat-test복사) 
    - <app-astat [myname]="myname"></app-astat>
    - @Input() myname = "stat-test";
    - this.pubsub.sub(this.myname+".statselectdata",data=>{ });
    - this.pubsub.pub(this.myname+".statdatas",datas);
          





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
- ng g s aservice/aanats


