# xxx generate
- ng g m yguide-test/stompchart --routing
- ng g c yguide-test/stompchart
- ---ng g s yguide-test/stompchart/stompchart
- ng g c yguide-test/stompchart/stompchart-form
- ng g c yguide-test/stompchart/stompchart-chart
- ng g c yguide-test/stompchart/stompchart-table

# 현재 module 수정
- xxx.module.ts	
  - FormsModule,ReactiveFormsModule,NgZorroAntdModule,NgxEchartsModule,NzCodeEditorModule,NgxJsonViewerModule,ScrollingModule,TreeTableModule,

- xxx-routing
  - { path: 'stompchart',component: StompchartComponent }

# 현재 page layout 
- stompchart.compoenent.html <<< yguide/layout복사 >>>

# app module 수정
- app-routing
  - { path: 'guide-test',loadChildren: () => import('./yguide-test/stompchart/stompchart.module').then(m => m.StompchartModule)},
- app.compoent
  - <a title routerLink="guide-test/stompchart"...

# detail view 개발
-	nz-row/col 변경 >>> <app-stompchart-form></app-stompchart-form> ...
- 각 화면 : yguide에서 복사
- *** topic변경-myname




# ========================================== guide
ng g m yguide/form-static --routing
ng g c yguide/form-static
  - FormsModule,ReactiveFormsModule,NgZorroAntdModule,NgxEchartsModule,NzCodeEditorModule,NgxJsonViewerModule,ScrollingModule,TreeTableModule,
  - { path: 'form-static',component: FormStaticComponent }
  - { path: 'guide',loadChildren: () => import('./yguide/form-static/form-static.module').then(m => m.FormStaticModule)},
  - <a title routerLink="guide/stomp"...



# ======================== 참고
- ng g c yguide-test/sqlquery/view-search --inlineStyle=true --inlineTemplate=true --flat=true



