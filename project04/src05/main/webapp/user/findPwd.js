/*$('#vcodeBtn').click(function(){
	
	$.post('../json/user/email.do'  URL 
			, {  서버에 보낼 데이터를 객체에 담아 넘긴다 
				email : $('#email').val(),
				vcode : $('#vcode').val()
			} 
			, function(result){  서버로부터 응답을 받았을 때 호출될 메서드
				if (result.status == "success") {
					if(result.vcode == $('#vcode').val()){
						alert("인증번호 인증 성공!!");
						//location.href = '../auth/login.html';
					}else{}
				}else {
					alert("인증 실패!");
				}				
			} 
 
, 'json'  서버가 보낸 데이터를 JSON 형식으로 처리)
 서버 요청이 실패했을 때 호출될 함수 등록   
.fail(function(jqXHR, textStatus, errorThrown){ 
	alert(textStatus + ":" + errorThrown);
});
	
});*/


$('#vcodeBtn').click(function(){
	
	$.post('../json/user/email.do' /* URL */
			, { /* 서버에 보낼 데이터를 객체에 담아 넘긴다 */
				email : $('#email').val(),
				vcode : $('#vcode').val()
			} 
			, function(result){ /* 서버로부터 응답을 받았을 때 호출될 메서드*/
				if (result.status == "success") {
					if(result.vcode == $('#vcode').val()){
						alert("인증번호 인증 성공!!");
						//location.href = '../auth/login.html';
					}else{}
				}else {
					alert("인증 실패!");
				}				
			} 
 
, 'json' /* 서버가 보낸 데이터를 JSON 형식으로 처리*/)
/* 서버 요청이 실패했을 때 호출될 함수 등록*/   
.fail(function(jqXHR, textStatus, errorThrown){ 
	alert(textStatus + ":" + errorThrown);
});
	
});




