timer service ?
simulator,cpu,mem...

=== guide-v2/acompo	countdown button









=============== dashboard
(향후) bar막대color
(향후-수정) inline여부


trend제목




### 나중에radio > buttondbinset > createtable--nred만 사용시 aedes/mqtt.js
=== chart otherseries only data gauge,spark,loading?,tree?echartsinstance.resize
	*** echarts샘플 - https://gitlab.com/kwak70/angular/-/blob/master/src/app/ui-chart-echarts/ui-chart-echarts.component.ts

table count 이상함 - select가 아닌가 ?
==== zorro v9












= 대시보드
	last 테이블 - host pk,process pk
	> host cpu 대시보드 - host갯수/max
	> host memory 대시보드 - host갯수/max

= 기타
	테이블스키마도 저장 < restart후 화면에서 생성 가능하게
	에러표시 >>> 최상위 에러표시 - dbinsert > 에러표시

= nats/resgate 연동











============= 설계서 - 다이어그램
============= 화면설계 > 코드화 (스케처...)
============= ng표준검토 > pubsub(모듈밖),모듈내service(formservice,tableservice,chartservice) constructor에...
===(일단변경)stomp sub시 이전 sub stop후 resub (already sub > substop)











================================== 소스 정리
=====(보류)chartutil > clicklegend등 전부이동-가능한가?
table-static
form-static
	form-1줄에 넣기 - nzspan <<< 
	form item간 간격 - &nbsp; (버튼간 간격만) < input/button사이에 넣으면 이상해짐
	button group
	radio formControlName
stat사용법,count사용법?
stomp
	멀티 topic sub 
	stomp sub = 다른 화면갔다오면 sub안됨... ngdestory ? resub을 막아놨으니... (compo는 new됨)
ip/time(date) <<< 컬럼명은 반드시 대문자 (HOST/IP)
===========================================
=== 기존소스 통합 - testv2,carbon
usage복사 - 정리
service포팅
===각 service마다 설치방법 기술

=== 이슈 - getDbtables() { //html에서 함수를 연결해서 그런가? 호출횟수가 엄청 많구나...흠... 변경감지때문인가 ?
	***** html에서 함수연결한거 모두 제거 <<< pubsub으로 변경
=== 헐 - radio는 동일버튼 한번더 눌러도 이벤트 발생안함
*** guide전체 설정 - providers: [AaformService]
*** 마크다운으로 사용법 정리 - ng/zorro 등 (ausage제거)
= 보류 - indexeddb






















https://ng.ant.design/components/menu/en
https://ng-alain.github.io/ng-alain/#/dashboard/v1





=================== 기존소스 포팅
stomp	stompview
== bit.dev(share compo) : https://bit.dev/components?packageDependencies=%40angular%2Fcore
==== 이슈
상단클릭시 디폴트화면 이동
url(route)로 직접 들어올때 상단 메뉴가 자동 선택되어야 함
user create : this.router.navigateByUrl(`/user/${user.getId()}`);









================================================ 보류
(보류) ashared acompo
(보류) checked > __checked,안보이게...
(보류) 테이블크기 고정

========= 업그레이드
== ng-zorro-antd
npm install ng-zorro-antd
== ng




(보류) logging.debug > classname or type <<< disable가능하게
	? https://github.com/dbfannin/ngx-logger
	*** https://github.com/Angular-RU/angular-logger









# ng-zorro universial starter 수정 > ui-ng-guide
	수정 (form.component.html) : nz-form-extra >>> [nzExtra]="extraTpl" + <ng-template #extraTpl>
	수정 (form.component.html) : nzType="question-circle"
	수정 (angular.json) : assets...{glob...input...output...} <<< getting-started참고


# =================== ng-zorro 참고
= module.ts > import { NgZorroAntdModule } from 'ng-zorro-antd';
= collapse	일반페이지
= ng document >>> constructor(@Inject(DOCUMENT) private _document: any){}
= layout : section		card,collapse,stats,list(안에 card+nzgrid)

# =================== ng 참고
= constructor(private router: Router) > this.router.navigateByUrl(`/user/${user.getId()}`);


# ============= 개발가이드
표준 - no inline
---(곽방식)대시보드v2 
	ng g c dashboardv2/about
	ng g c dashboardv2/about/view-cpu-max --inlineStyle=true --inlineTemplate=true --flat=true
	ng g c dashboardv2/about/view-memory-max --inlineStyle=true --inlineTemplate=true --flat=true
	about.html(레이아웃) >> nz-row/nz-col/ng-card/<app-viewcpumax></app-viewcpumax>...


# 향후 - ng9 > ng-zorro체크후(1~2주후)
# 향후 - guard - hapify참고
# 향후 - reusable tab - ng-alain
# 향후 - 개발플랫폼 - ? like hapify sandbox

# 보류 - 프로젝트명 변경
-	vs에서 검색후 수동변경
-	sed -i 's/oldName/newName/g' * <<< ng new후 전체복사 ?
-	--ng rename ng6 new-project-name

# 보류 - schematic - form/dashboard ...
- ng-zorro schematics - https://github.com/NG-ZORRO/ng-zorro-antd/tree/master/schematics 


# 교육 자료
- https://angular.kr/start
- https://poiemaweb.com/angular-basics


# antv/g2 ...
============================= antv/g2-g6-f2-l7-g2pot... (https://github.com/antvis)
============= g2plot (nzcard에는 안들어감 - Cannot read property offsetWidth of null)
	g2plot : sparkline/...
npm install @antv/g2plot
<div id="g2plot1"></div>
import { Bar } from '@antv/g2plot';
let data ... let bar=new Bar... bar.render() <<< 주의-data필드명 고정
============= g2 (보류-ng9에서 사용가능>테스트는ok)
---antv/g2(v4는 typescript로 재개발) > An accessor cannot be declared in an ambient context > typescript버젼때문(3.7 - ng9사용해야함)
npm install @antv/g2
<div id="g21"></div>
import { Chart } from '@antv/g2';
let data ... let chart=new Chart... chart.data... chart.render() <<< 주의-data필드명 고정


