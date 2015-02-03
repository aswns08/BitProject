var loginUser;

$(function() {
	$.getJSON(ikkosaUrl + 'json/auth/loginUser.do', function(data) {
		if (data.status == 'fail') {
			console.log("로그인 정보 없음");
		} else {
			console.log("로그인 정보 있음");
		  //console.log(data.loginUser);
			$('#loginBtn').css('display', 'none');
			$('.logoutBtn').css('display', '');
			
			loginUser = data.loginUser;
			$('#userName').html(loginUser.name);
			
		}
	});

});
