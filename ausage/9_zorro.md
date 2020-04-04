# 향후
- (향후) experi > split panel(resize)
- reusetab - ngalain

# 소수점 : [nzValue]="11.28 | number: '1.0-2'"

# clipboard (참고-guide/jsonview)
- private clipboard:NzCopyToClipboardService
- this.clipboard.copy(JSON.stringify(this.debugjsondata))

# 참고 - table
- 헤더고정(y값) - [nzScroll]="{ y: '400px' }" <<< scroll들어가면 헤더자동고정됨
- row고정 : 왼쪽고정(nzLeft),오른쪽고정(nzRight) <<< nzLeft/nzRight는 head/body 모두 설정해야함
- nzScroll --- x:width,y:height
- nzWidth는 헤더만 지정하면 됨
  - nzWidth는 제일 큰놈은 제외하면 설정하면 됨
- scroll과expand는 같이 사용하면 컬럼위치 이상해짐 >>> 반드시 nzWidth로 크기고정해야 함



# 참고
- badge : (주의)nzCount는 무조건 숫자
- stat/countdown : countdown는 내부가 div로 되어 있어 button과 동일라인에 넣을수없음
- drawer : (주의) 반드시 선언은 되어야한다+visible로 show <<< <xxx-drawer></xxx-drawer>
- <a> ==  <button nz-button nzType="link"


<div style="background: rgb(190, 200, 200);padding: 26px 16px 16px;">
