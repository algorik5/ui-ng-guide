# generate
- ng g m yguide-test/jsontotreetable --routing
- ng g c yguide-test/jsontotreetable
- ---ng g s yguide-test/sqlquery/sqlquery
- ng g c yguide-test/jsontotreetable/jsontotreetable-condition
- ng g c yguide-test/jsontotreetable/jsontotreetable-editor
- ng g c yguide-test/jsontotreetable/jsontotreetable-treetable

# 현재 module 수정
- sqlquery.module.ts	
  - FormsModule,ReactiveFormsModule,NgZorroAntdModule,NgxEchartsModule,NzCodeEditorModule,NgxJsonViewerModule,ScrollingModule,TreeTableModule,

- sqlquery-routing
  - { path: 'jsontotreetable',component: JsontotreetableComponent }

# 현재 page layout 
- jsontotreetable.compoenent.html
	nz-row/col...<app-jsontotreetable-condition...

# app module 수정
- app-routing
  - { path: 'guide-test',loadChildren: () => import('./yguide-test/jsontotreetable/jsontotreetable.module').then(m => m.JsontotreetableModule)},
- app.compoent
  - <a title routerLink="guide-test/jsontotreetable"...

# detail view 개발




# ========================================== guide
ng g m yguide/form-static --routing
ng g c yguide/form-static
  - FormsModule,ReactiveFormsModule,NgZorroAntdModule,NgxEchartsModule,NzCodeEditorModule,NgxJsonViewerModule,ScrollingModule,TreeTableModule,
  - { path: 'form-static',component: FormStaticComponent }
  - { path: 'guide',loadChildren: () => import('./yguide/form-static/form-static.module').then(m => m.FormStaticModule)},
  - <a title routerLink="guide/stomp"...



# ======================== 참고
- ng g c yguide-test/sqlquery/view-search --inlineStyle=true --inlineTemplate=true --flat=true



