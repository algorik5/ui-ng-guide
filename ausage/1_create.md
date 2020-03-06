# generate
- ng g m ytemplate/sqlquery --routing
- ng g c ytemplate/sqlquery
- ---ng g s ytemplate/sqlquery/sqlquery
- ng g c ytemplate/sqlquery/sqlquery-condition
- ng g c ytemplate/sqlquery/sqlquery-list
- ng g c ytemplate/sqlquery/sqlquery-update

# 현재 module 수정
- sqlquery.module.ts	
  - FormsModule,ReactiveFormsModule,NgZorroAntdModule,NgxEchartsModule,
- sqlquery-routing
  - { path: 'sqlquery',component: SqlqueryComponent },

# 현재 page layout 
- sqlquery.compoenent.html
	nz-row/col...<app-sqlquery-condition...

# app module 수정
- app-routing
  - { path: 'template',loadChildren: () => import('./ytemplate/sqlquery/sqlquery.module').then(m => m.SqlqueryModule)},
- app.compoent
  - <a title routerLink="template/sqlquery"...

# detail view 개발



# ======================== 참고
- ng g c ytemplate/sqlquery/view-search --inlineStyle=true --inlineTemplate=true --flat=true



