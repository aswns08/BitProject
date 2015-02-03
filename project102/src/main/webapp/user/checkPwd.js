var loginUser;

$(function(){
	$.getJSON(ikkosaUrl + 'json/auth/loginUser.do', function(data){
		if (data.status == 'fail') {
			alert("로그인후 이용하세요.");  
			location.href = '../auth/login.html';

		} else {
			loginUser = data;
			$('#email').attr('value', data.loginUser.email);

			/* $('#userName').click(function(){
      alert('사용자 정보 조회 창으로 보낼 예정');
    });*/  
		}
	});
});

$('#btnLogin').click(function(){
	if($('#pwd').val() == loginUser.loginUser.pwd){
		location.href = '../user/myPage.html';
	}else{
		alert("비밀번호가 일치하지 않습니다.");

	}
});
