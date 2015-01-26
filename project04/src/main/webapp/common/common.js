var loginUser;

$(function() {
	$.getJSON('../json/auth/loginUser.do', function(data) {
		if (data.status == 'fail') {

		} else {
			$('#loginBtn').css('display', 'none');
			$('#logoutBtn').css('display', '').css('margin', '0px');

			console.log(data.loginUser);
			$('#userName').html(data.loginUser.name);
			loginUser = data.loginUser;
			/*
			 * $('#userName').click(function(){ alert('사용자 정보 조회 창으로 보낼 예정');
			 * });
			 */
		}
	});

});
