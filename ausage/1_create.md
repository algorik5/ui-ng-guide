# xxx generate
- ng g m yguide-test/dblocalmanager --routing
- ng g c yguide-test/dblocalmanager
- ---ng g s yguide-test/dblocalmanager/dblocalmanager
- ng g c yguide-test/dblocalmanager/dblocalmanager-form
- ng g c yguide-test/dblocalmanager/dblocalmanager-tableschema
- ng g c yguide-test/dblocalmanager/dblocalmanager-tabledata
# 현재 module 수정
- xxx.module.ts	
  - FormsModule,ReactiveFormsModule,NgZorroAntdModule,NgxEchartsModule,NzCodeEditorModule,NgxJsonViewerModule,ScrollingModule,TreeTableModule,
- xxx-routing
  - { path: 'dblocalmanager',component: DblocalmanagerComponent }
# app module 수정
- app-routing
  - { path: 'guide-test',loadChildren: () => import('./yguide-test/dblocalmanager/dblocalmanager.module').then(m => m.DblocalmanagerModule)},
- app.compoent
  - <a title routerLink="guide-test/dblocalmanager"...
# 화면 개발
- (layout) ....compoenent.html <<< yguide/layout복사 >>>
  -	nz-row/col 변경 >>> <app-dblocalmanager-form></app-dblocalmanager-form> ...
- 각 화면 : yguide참고
- *** topic변경-myname
# *** service 설정 - 설정하지 않으면 singleton
- 결론 - singleton필요하지 않으면 반드시 compo에 설정해서 사용하자
- (***주의) providers: [AatableService] <<< 또는 compo.ts에 설정 >>>
- AatableService의 경우 singleton이면 다른 화면에서 값을 넣으면 전체가 같이 변경되니 주의바람


# ========================================== guide
ng g m yguide/layout-input --routing
ng g c yguide/layout-input
  - FormsModule,ReactiveFormsModule,NgZorroAntdModule,NgxEchartsModule,NzCodeEditorModule,NgxJsonViewerModule,ScrollingModule,TreeTableModule,
  - { path: 'layout-input',component: LayoutInputComponent }
  - { path: 'guide',loadChildren: () => import('./yguide/layout-input/layout-input.module').then(m => m.LayoutInputModule)},
  - <a title routerLink="guide/layout-input"...
복사 - guide/dblocal에서 복사


# ========================================== test
ng g c ytest/test-websocket
  - { path: 'test-websocket',component: TestWebsocketComponent }
  - <a title routerLink="guide/test-websocket"...
복사 - ytest/test-mqtt에서 복사

# ========================================== tool
--ng g m ytool --routing
ng g c ytool/localstorage
  - { path: 'localstorage',component: LocalstorageComponent }
  - <a title routerLink="tool/localstorage"...
복사 - ytest/test-mqtt에서 복사




# ======================== 참고
- ng g c yguide-test/sqlquery/view-search --inlineStyle=true --inlineTemplate=true --flat=true



