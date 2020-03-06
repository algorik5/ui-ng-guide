
# module
- ng g m sqlview/sqlquery --routing
- sqlquery.module.ts	
  - ngzorromodule...formsmodule...

# main page/service
- ng g c sqlview/sqlquery
- ng g s sqlview/sqlquery/sqlquery

# routing
- sqlquery-routing
  - { path: 'sqlquery',component: SqlqueryComponent },
- app-routing
  - { path: 'sqlview',loadChildren: () => import('./sqlview/sqlquery/sqlquery.module').then(m => m.SqlqueryModule)},
- app.compoent
  - <a title routerLink="sqlview/sqlquery"...

# detail view
- ng g c sqlview/sqlquery/sqlquery-condition
- ng g c sqlview/sqlquery/sqlquery-list
- ng g c sqlview/sqlquery/sqlquery-update

# page layout
- sqlquery.compoenent.html
	nz-row/col...<app-sqlquery-condition...

# detail view 개발



# ======================== 참고
- ng g c sqlview/sqlquery/view-search --inlineStyle=true --inlineTemplate=true --flat=true



