# 에러 - cb() never called
- 무조건 한번더(npm install)
- Maximum call stack size exceeded <<< SharedModule에서 AcompoModule을 참고하면 안됨 - recursive참조가 됨 >>>

# array
- add : push대신 concat사용


# 참고 - 문법
- [name]="'val'" 가능 <<< boolean/int는 [name]="true">>>
- 주의-nginit순서 > 부모부터 ngInit > 자신 ngInit ....
- (template string) `xxx` <<< multi line(`) <<< `${var}`
=== <input #myname... <button (click)="click(myname.value) <<< #사용하여 dom을 지역변수처럼 접근
= ActivatedRoute : 파라미터받기 (this.route.params.subscribe(params)


# service 싱글턴 제거 (https://poiemaweb.com/angular-service) *** https://angular.io/guide/singleton-services ***https://angular.io/guide/providers
	service.ts > providedIn : root <<< 싱글턴
	compo.ts > @Component({ ... providers: [AatableService] <<< 해당compo child까지 싱글턴
	xxx.module.ts > @NgModule({...providers: [AatableService],})




# playgroup
- typescript : https://www.typescriptlang.org/v2/en/play
- ng : https://stackblitz.com/edit/angular-playground
- zorro : https://stackblitz.com/edit/ng-zorro-antd-start?file=package.json

# Angular Universal (SSR - server side rendering)
- npm run build:ssr > npm run serve:ssr > localhost:4000
- server.ts

# tab component <<< 각 tab별로 별도 component 사용하기 - ***ngTemplateOutlet >>>
- <nz-tab ... <ng-container *ngTemplateOutlet="template"></ng-container> </nz-tab>
- <ng-template #template> <router-outlet> </router-outlet> </ng-template>


## 참고
tofixed
date-fns 포맷,addday,after...
cdkportal
data?.name
ngswitch,ngifelse

# ======================== ng sharedmodule 사용법
	잘안되면 ng restart
	(참고) lazy load module : https://alligator.io/angular/providers-shared-modules/
1) src/shared.module.ts > 
	(모듈) exports: NgPipesModule
	(service--사용하지마) providers: LoggingService <<< 굳이 안해도 그냥 쓰면 됨
2) src/app.module.ts > imports SharedModule
3) src/xxx/xxx.module.ts > imports SharedModule



# ======================== ng9 특징
- providedin
- youtupeplayer,googlemaps
- (ts) optional chaing --- data.person?.id
- localize

# ======================== ng9 upgrade
	좀 느려짐
=== node 업그레이드 (14 or 15)
=== cli
npm install -g @angular/cli
=== 프로젝트
ng update @angular/core@8 @angular/cli@8 	<< ng8최신
- git commit/push
ng update @angular/core @angular/cli		<< ng9
ng update									<< 모든항목 update (cdk,zorro,rxjs,express-engine...)
rm -rf package-lock.json node_modules
npm install
npm install monaco-editor@latest			<< 0.20
ng serve
=== 에러수정
=== (참고) npm outdated > package.json수정 > npm install

