
# module
- ng g m ytemplate/sqlquery --routing
- sqlquery.module.ts	
  - FormsModule,ReactiveFormsModule,NgZorroAntdModule,NgxEchartsModule,

# main page/service
- ng g c ytemplate/sqlquery
- ---ng g s ytemplate/sqlquery/sqlquery

# routing
- sqlquery-routing
  - { path: 'sqlquery',component: SqlqueryComponent },
- app-routing
  - { path: 'template',loadChildren: () => import('./ytemplate/sqlquery/sqlquery.module').then(m => m.SqlqueryModule)},
- app.compoent
  - <a title routerLink="template/sqlquery"...

# detail view
- ng g c ytemplate/sqlquery/sqlquery-condition
- ng g c ytemplate/sqlquery/sqlquery-list
- ng g c ytemplate/sqlquery/sqlquery-update

# page layout
- sqlquery.compoenent.html
	nz-row/col...<app-sqlquery-condition...

# detail view 개발



# ======================== 참고
- ng g c ytemplate/sqlquery/view-search --inlineStyle=true --inlineTemplate=true --flat=true



