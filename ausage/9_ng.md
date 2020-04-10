# 에러 - cb() never called
- 무조건 한번더(npm install)

# array
- add : push대신 concat사용


# 참고 - 문법
- [name]="'val'" 가능 <<< boolean/int는 [name]="true">>>
- 주의-nginit순서 > 부모부터 ngInit > 자신 ngInit ....
- (template string) `xxx` <<< multi line(`) <<< `${var}`


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
