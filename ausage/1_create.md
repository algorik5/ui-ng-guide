# xxx generate
- ng g m yguide-test/stompdbinsert --routing
- ng g c yguide-test/stompdbinsert
- ---ng g s yguide-test/stompdbinsert/stompdbinsert
- ng g c yguide-test/stompdbinsert/stompdbinsert-form
- ng g c yguide-test/stompdbinsert/stompdbinsert-tableschema
- ng g c yguide-test/stompdbinsert/stompdbinsert-tabledata
# 현재 module 수정
- xxx.module.ts	
  - FormsModule,ReactiveFormsModule,NgZorroAntdModule,NgxEchartsModule,NzCodeEditorModule,NgxJsonViewerModule,ScrollingModule,TreeTableModule,
- xxx-routing
  - { path: 'stompdbinsert',component: StompdbinsertComponent }
# app module 수정
- app-routing
  - { path: 'guide-test',loadChildren: () => import('./yguide-test/stompdbinsert/stompdbinsert.module').then(m => m.StompdbinsertModule)},
- app.compoent
  - <a title routerLink="guide-test/stompdbinsert"...
# 화면 개발
- (layout) stompdbinsert.compoenent.html <<< yguide/layout복사 >>>
  -	nz-row/col 변경 >>> <app-stompdbinsert-form></app-stompdbinsert-form> ...
- 각 화면 : yguide참고
- *** topic변경-myname
# *** service 설정 - 설정하지 않으면 singleton
- 결론 - singleton필요하지 않으면 반드시 compo에 설정해서 사용하자
- (***주의) providers: [AatableService] <<< 또는 compo.ts에 설정 >>>
- AatableService의 경우 singleton이면 다른 화면에서 값을 넣으면 전체가 같이 변경되니 주의바람


# ========================================== guide
ng g m yguide/dblocal --routing
ng g c yguide/dblocal
  - FormsModule,ReactiveFormsModule,NgZorroAntdModule,NgxEchartsModule,NzCodeEditorModule,NgxJsonViewerModule,ScrollingModule,TreeTableModule,
  - { path: 'dblocal',component: DblocalComponent }
  - { path: 'guide',loadChildren: () => import('./yguide/dblocal/dblocal.module').then(m => m.DblocalModule)},
  - <a title routerLink="guide/dblocal"...
복사 - guide/dblocal에서 복사


# ======================== 참고
- ng g c yguide-test/sqlquery/view-search --inlineStyle=true --inlineTemplate=true --flat=true



