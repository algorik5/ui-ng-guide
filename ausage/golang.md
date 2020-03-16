

===========================================================================================================
===========================================================================================================
service 샘플 - https://github.com/jirenius/rest2res
*********** service를 만들어야 함 = https://resgate.io/blog/introducing-resgate/
client.get("test.1").then(model => { >>> 2건의 메시지 sub됨 : access.test.1/get.test.1
	timeout : 3초 <<< server실행옵션-requestTimeout  
	*https://github.com/resgateio/resgate/tree/master/examples/hello-world/
		access.test.1 	>>> {result:{get:true} 					<<< 리턴해야하는듯
		get.test.1	>>> { result: { model: { message: "Hello, world!" }}} 	<<< 리턴해야함
		테스트 - http://localhost:8080/api/test/1




--- resgate : 안맞음 (browser에서 resclient사용함-rest,nats api는 nodejs꺼)
================ nats + resgate 
=== nats 실행 - gnatsd <<< (pub/sub) https://github.com/nats-io/go-nats-examples/releases/tag/0.0.50
=== resgate 실행
=== ng
	npm install resclient <<< https://www.npmjs.com/package/resclient
	import ResClient from 'resclient';
	const client = new ResClient('ws://localhost:8080/ws');



================== golang websocket
	golang/net/websocket deprecate > gorilla/websocket통합(7개월)
	* 최신-nhooyr.io/websocket
	* 최신-gobwas/ws
	= golang starter (websocket)



================== nats websocket (향후 embed)
* https://github.com/resgateio/resgate (gorilla/websocket)
--- isobit
	server=https://github.com/isobit/ws-tcp-relay (2년)
	client=https://github.com/isobit/websocket-nats (3년)
--- https://github.com/antmanler/gnatsd-gw (2년)
--- https://github.com/orus-io/nats-websocket-gw (1년)








======================== angular-in-memory-web-api - 웹 메모리를 마치 데이터베이스 처럼 사용하게 해 주는 서비스
************https://www.a-mean-blog.com/ko/blog/Angular/Tour-of-Heroes/Tour-of-Heroes-HTTP
***https://lts0606.tistory.com/129
npm install angular-in-memory-web-api
Observable.create((obsever)=>{ <<< https://lts0606.tistory.com/55
	https://ku0re.tistory.com/20

==== axios == httpclient
	sync request가능 ? = https://donghunee.github.io/study/2019/10/21/react/
==== ngif >>> obj?.a?.b? ...
==== ng > https://www.slideshare.net/janghyunhan/angular-188926981
==== public service - html에서 사용가능


