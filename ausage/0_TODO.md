
================== 프로젝트 관리툴 -taskworld(유료)
jira칸반(또는 trello) - 1주 계획(월~목,금:평가/보완)
confluence - 산출물 링크
카톡 - 채팅
기타 - jira간트...
	***https://medium.com/plustv/%EC%8A%A4%ED%83%80%ED%8A%B8%EC%97%85-%EA%B0%99%EC%9D%B4-%EC%9D%BC%ED%95%98%EB%8A%94-%EB%8A%A5%EB%A0%A5-%EA%B8%B0%EB%A5%B4%EA%B8%B0-feat-attlasian-c3a55ff4eb5a	
	https://www.eventservice.kr/atlassian/file/1207_Atlassian_busan_HandsOnLabs01.pdf

=== PM - 프로젝트 생성(==1제품)
=== PM - epic > story > task 생성 > task에 설명달고 개발자 배분
=== 개발자 - task를 in process로 변경 > 주기적으로 update > 완료시 resolve
=== PM - close
============ 문서
https://uxd.team.handstudio.net/post/64286399069/jira%EB%A5%BC-%ED%86%B5%ED%95%B4-%ED%94%84%EB%A1%9C%ED%8E%98%EC%85%94%EB%84%90%ED%95%98%EA%B2%8C-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%ED%98%91%EC%97%85%ED%95%98%EA%B8%B0
http://melonicedlatte.com/softwareengineering/2017/10/15/212131.html
https://www.slideshare.net/ssuser800974/jira-98019877
https://www.eventservice.kr/atlassian/file/1207_Atlassian_busan_HandsOnLabs03.pdf
https://smallake.kr/?p=19559

=jira간트 : https://www.lesstif.com/jira/jira-wbs-big-gantt-36209441.html

(component:논리그룹=sub project,epic : 스토리묶음,story : 요구사항,개발대상task : 할일)







================== 배포판 만들기 - ng-zorro-universal-starter
업그레이드 9 - ng/zorro
템플릿 코드
app/페이지명



================== TODO
읽어보기
	https://angular-2-training-book.rangle.io/modules/shared-modules-di



================== hymon 구현



================== 기존 모니터링 구현



=== ngrx store...
simple > https://dzone.com/articles/ngrx-with-redux-in-angular
https://doyoungan.github.io/react-vue-angular-redux/
https://pcconsoleoraksil.tistory.com/304
https://ngrx.io/guide/store
https://mobicon.tistory.com/567
https://soon-devblog.tistory.com/17
https://medium.com/pplink/ngrx-architecture%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%98%EC%97%AC-angular-%EC%95%B1%EC%9D%84-%EB%8D%94-%EA%B8%B0%EB%B6%84-%EC%A2%8B%EA%B2%8C-%EB%A7%8C%EB%93%A4%EA%B8%B0-9182c582a113


ng강의자료
	http://wiki.sys4u.co.kr/pages/viewpage.action?pageId=8554017
	https://angular.kr/start
	https://poiemaweb.com/ (js)




================== 향후
=NgZorroAntdModule 제거 > 개별 모듈로 ...
	formexplain > nzerrortip
=g2 : Type 'PieLayerConfig' is not assignable to type 'ViewLayerConfig' <<< 몇일전에 패치됨 - 향후 패치 >>>
	임시 : dashboard.component.ts - 1)this.initg2plot(); 2)new Bar 3)import >>> 3개주석처리함



	



========== 실행
nats-server/tool-resgate
nats-reg
nred
ng serve











=============== dashboard
(향후) bar막대color
trend제목
---테이블크기 고정은 ?
= (향후) pubsub myname/this.constructor.name <<< *myname=myname+"."+this.constructor.name
=guide	drawer
= 필수	[myname]=...포함 +로깅(    this.logging.debug("======================== "+this.constructor.name+"#myname="+this.myname))




### 나중에radio > buttondbinset > createtable--nred만 사용시 aedes/mqtt.js
=== chart otherseries only data gauge,spark,loading?,tree?echartsinstance.resize
	*** echarts샘플 - https://gitlab.com/kwak70/angular/-/blob/master/src/app/ui-chart-echarts/ui-chart-echarts.component.ts

table count 이상함 - select가 아닌가 ?
==== zorro v9

==== scroll ? (https://ng.ant.design/components/affix/en)
<div class="scrollable-container"... <div class="background"> ...

==== ? 코드블럭 ? https://auralinna.blog/post/2017/code-syntax-highlighting-with-angular-and-prismjs
---향후 - atop >>> affix 변경
---주석 > pre









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




















=========================== npm outdated > package.json수정 > npm install
D:\project\kwakNG\ui-ng-guide>npm outdated
Package                            Current    Wanted   Latest  Location
@antv/g2plot                       0.11.41   0.11.41    1.0.3  ui-ng-guide
@types/jasmine                      3.3.16    3.3.16   3.5.10  ui-ng-guide
@types/node                       12.12.35  12.12.35  13.11.1  ui-ng-guide
http-server                         0.11.1    0.11.1   0.12.1  ui-ng-guide
jasmine-core                         3.4.0     3.4.0    3.5.0  ui-ng-guide
jasmine-spec-reporter                4.2.1     4.2.1    5.0.1  ui-ng-guide
karma                                4.1.0     4.1.0    5.0.2  ui-ng-guide
karma-chrome-launcher                2.2.0     2.2.0    3.1.0  ui-ng-guide
karma-coverage-istanbul-reporter     2.0.6     2.0.6    2.1.1  ui-ng-guide
karma-jasmine                        2.0.1     2.0.1    3.1.1  ui-ng-guide
ts-loader                            6.2.2     6.2.2    7.0.0  ui-ng-guide
ts-node                              8.3.0     8.3.0    8.8.2  ui-ng-guide
tslint                              5.18.0    5.18.0    6.1.1  ui-ng-guide 
