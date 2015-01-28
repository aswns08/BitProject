var loginUser;

$(function() {
	$.getJSON('../json/auth/loginUser.do', function(data) {
		if (data.status == 'fail') {

		} else {
		  //console.log(data.loginUser);
			$('#loginBtn').css('display', 'none');
			$('.logoutBtn').css('display', '');
			//$('.logoutBtn').css('display', '').css('margin', '0px');
			
			$('#userName').html(data.loginUser.name);
      loginUser = data.loginUser;
			/*
			 * $('#userName').click(function(){ alert('사용자 정보 조회 창으로 보낼 예정');
			 * });
			 */
		}
	});

});
