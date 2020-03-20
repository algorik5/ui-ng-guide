# xxx generate
- ng g m hymon/dashboard --routing
- ng g c hymon/dashboard
- ---ng g s hymon/dashboard/dashboard
- ng g c hymon/dashboard/dashboard-form
- ng g c hymon/dashboard/dashboard-view
# 현재 module 수정
- xxx.module.ts	
  - FormsModule,ReactiveFormsModule,NgZorroAntdModule,NgxEchartsModule,NzCodeEditorModule,NgxJsonViewerModule,ScrollingModule,TreeTableModule,
- xxx-routing
  - { path: 'dashboard',component: DashboardComponent }
# app module 수정
- app-routing
  - { path: 'hymon',loadChildren: () => import('./hymon/dashboard/dashboard.module').then(m => m.DashboardModule)},
- app.compoent
  - <a title routerLink="hymon/dashboard"...
# 화면 개발
- (layout) ....compoenent.html <<< yguide/layout복사 >>>
  -	nz-row/col 변경 >>> <app-dashboard-form></app-dashboard-form> ...
- 각 화면 : yguide참고
- *** topic변경-myname
# *** service 설정 - 설정하지 않으면 singleton
- 결론 - singleton필요하지 않으면 반드시 compo에 설정해서 사용하자
- (***주의) providers: [AatableService] <<< 또는 compo.ts에 설정 >>>
- AatableService의 경우 singleton이면 다른 화면에서 값을 넣으면 전체가 같이 변경되니 주의바람


# ========================================== guide
ng g m yguide/chart-bar --routing
ng g c yguide/chart-bar
  - FormsModule,ReactiveFormsModule,NgZorroAntdModule,NgxEchartsModule,NzCodeEditorModule,NgxJsonViewerModule,ScrollingModule,TreeTableModule,
  - { path: 'chart-bar',component: ChartBarComponent }
  - { path: 'guide',loadChildren: () => import('./yguide/chart-bar/chart-bar.module').then(m => m.ChartBarModule)},
  - <a title routerLink="guide/layout-input"...
복사 - guide/dblocal에서 복사


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



