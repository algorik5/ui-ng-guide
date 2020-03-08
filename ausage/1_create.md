# generate
- ng g m yguide-test/sqlquery --routing
- ng g c yguide-test/sqlquery
- ---ng g s yguide-test/sqlquery/sqlquery
- ng g c yguide-test/sqlquery/sqlquery-condition
- ng g c yguide-test/sqlquery/sqlquery-list
- ng g c yguide-test/sqlquery/sqlquery-update

# 현재 module 수정
- sqlquery.module.ts	
  - FormsModule,ReactiveFormsModule,NgZorroAntdModule,NgxEchartsModule,
  - FormsModule,ReactiveFormsModule,NgZorroAntdModule,NgxEchartsModule,NzCodeEditorModule,

- sqlquery-routing
  - { path: 'sqlquery',component: SqlqueryComponent }

# 현재 page layout 
- sqlquery.compoenent.html
	nz-row/col...<app-sqlquery-condition...

# app module 수정
- app-routing
  - { path: 'guide-test',loadChildren: () => import('./yguide-test/sqlquery/sqlquery.module').then(m => m.SqlqueryModule)},
- app.compoent
  - <a title routerLink="guide-test/sqlquery"...

# detail view 개발




# ========================================== guide
ng g m yguide/form --routing
ng g c yguide/form
  - FormsModule,ReactiveFormsModule,NgZorroAntdModule,NgxEchartsModule,NzCodeEditorModule,
  - { path: 'form',component: FormComponent }
  - { path: 'guide',loadChildren: () => import('./yguide/form/form.module').then(m => m.FormModule)},
  - <a title routerLink="guide/form"...



# ======================== 참고
- ng g c yguide-test/sqlquery/view-search --inlineStyle=true --inlineTemplate=true --flat=true



