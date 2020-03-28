# 에러 - cb() never called
- 무조건 한번더(npm install)

# array
- add : push대신 concat사용





# service 싱글턴 제거 (https://poiemaweb.com/angular-service) *** https://angular.io/guide/singleton-services ***https://angular.io/guide/providers
	service.ts > providedIn : root <<< 싱글턴
	compo.ts > @Component({ ... providers: [AatableService] <<< 해당compo child까지 싱글턴
	xxx.module.ts > @NgModule({...providers: [AatableService],})




# playgroup
- typescript : https://www.typescriptlang.org/v2/en/play
- ng : https://stackblitz.com/edit/angular-playground

# Angular Universal (SSR - server side rendering)
- npm run build:ssr > npm run serve:ssr > localhost:4000
- server.ts



## 참고
tofixed
date-fns 포맷,addday,after...
cdkportal
data?.name
ngswitch,ngifelse
