


# =================== ng-zorro 참고
= module.ts > import { NgZorroAntdModule } from 'ng-zorro-antd';
= collapse	일반페이지
= ng document >>> constructor(@Inject(DOCUMENT) private _document: any){}



# ============= 개발가이드
표준 - no inline
---(곽방식)대시보드v2
	ng g c dashboardv2/about
	ng g c dashboardv2/about/view-cpu-max --inlineStyle=true --inlineTemplate=true --flat=true
	ng g c dashboardv2/about/view-memory-max --inlineStyle=true --inlineTemplate=true --flat=true
	about.html(레이아웃) >> nz-row/nz-col/ng-card/<app-viewcpumax></app-viewcpumax>...


# 향후 - ng9 > ng-zorro체크후(1~2주후)



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


