var user;
var signUpCheckEmail = false; 
var signUpCheckName = false;
var regExp4 = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{1,20}$/;
var regExp5 = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i; //이메일
var regExp6 = /^[0-9a-zA-Z가-힣]([-_\.]?[0-9a-zA-Z가-힣])*$/i; //닉네임

$('#btnCancel').click(function(){
	$('.my-update-form').css('display', 'none');
	$('.my-new-form').css('display', '');
	user = null;
});

$('#btnAdd').click(function(){
	console.log("비번", checkPwd());

	if (!validateForm()) return;
	if (!signUpCheckEmail || !checkEmail()){
		alert("이메일을 바르게 입력하세요.");
		return;
	}else if(!signUpCheckName || !checkName()){
		alert("닉네임을 바르게 입력하세요.");
		return;
	}else if(!checkPwd()){
		alert("비밀번호를 바르게 입력하세요.");
		return;
	}
	/*$.post(URL, 성공함수)
     .fail(실패함수)
     .done(성공함수2)
     .always(마무리함수);
	 */
	$.post('../json/user/add.do' /* URL */
			, { /* 서버에 보낼 데이터를 객체에 담아 넘긴다 */
				email : $('#email').val(),
				name : $('#name').val(),
				pwd : $('#pwd').val()
			} 
			, function(result){ /* 서버로부터 응답을 받았을 때 호출될 메서드*/
				if (result.status == "success") {
					/*loadProductList(1);*/
					location.href = '../auth/login.html';
					$('#btnCancel').click(); // click 이벤트 발생시킴.
				} else {
					alert("등록 실패!");
				}
			} 
			, 'json' /* 서버가 보낸 데이터를 JSON 형식으로 처리*/)
			/* 서버 요청이 실패했을 때 호출될 함수 등록*/   
			.fail(function(jqXHR, textStatus, errorThrown){ 
				alert(textStatus + ":" + errorThrown);
			});

});


function validateForm() {
	if ( $('#email').val().length == 0) {
		alert('이메일은 필수 입력 항목입니다.');
		return false;
	}

	else if ( $('#name').val().length == 0) {
		alert('닉네임은 필수 입력 항목입니다.');
		return false;
	}

	else if ( $('#pwd').val().length == 0) {
		alert('비밀번호를 입력하세요.');
		return false;
	}

	return true;
}


function checkPwd() { //비밀번호 유효성검사
	var pwd = document.getElementById("pwd").value;
	var rePwd = document.getElementById("rePwd").value;
		
	if (pwd == null || pwd.length == 0) {
		document.getElementById('checkPwd').style.color = "red";
		document.getElementById('checkPwd').innerHTML = "비밀번호를 입력해주세요.";
		return false;
	}else if(!regExp4.test($("#pwd").val())){
		document.getElementById('checkPwd').style.color = "red";
		document.getElementById('checkPwd').innerHTML = "비밀번호는 문자, 숫자, 특수문자의 조합으로 입력해주세요.";
		return false;
	}else if (pwd.length < 6 || pwd.length > 16) {
		document.getElementById('checkPwd').style.color = "red";
		document.getElementById('checkPwd').innerHTML = "비밀번호는 6 ~ 16 자리로 입력해주세요.";
		return false;
	} else if (pwd != rePwd) {
		document.getElementById('checkPwd').style.color = "red";
		document.getElementById('checkPwd').innerHTML = "비밀번호가 일치하지 않습니다.";
		return false;
	} else if(pwd == rePwd){
		document.getElementById('checkPwd').style.color = "blue";
		document.getElementById('checkPwd').innerHTML = "비밀번호가 확인되었습니다.";
		return true;
	}
}


$(function() {
	$("#email").keyup(function() { //이메일 유효성검사
		if(checkEmail()){
			$.get("http://192.168.0.15:3000/emailcheck", {
				email : $('#email').val()

			}, function(data) {
				$('#checkEmail').html(data.result);
				signUpCheck(data);
			});
		}
	});
})


$(function() {
	$("#name").keyup(function() { //닉네임 유효성검사
		if(checkName()){
			$.get("http://192.168.0.15:3000/namecheck", {
				name : $('#name').val()
			}, function(data) {
				console.log('data',data);
				console.log("data.result", data.result);
				//console.log("aaaa"+ data.result.0.NAME);
				
				$('#checkName').html(data.result);
				signUpCheck(data);
			});
		}
	});
})  


function checkEmail() {
	var swanid = document.getElementById("email").value;

	if (swanid == null || swanid.length == 0) {
		document.getElementById('checkEmail').style.color = "red";
		document.getElementById('checkEmail').innerHTML = "이메일을 입력해주세요.";
		return false;
	}

	else if(!regExp5.test($('#email').val())){
		document.getElementById('checkEmail').style.color = "red";
		document.getElementById('checkEmail').innerHTML = "이메일을 잘못 입력하였습니다.";	
		return false;

	}else{ 
		return true;
	}
}


function checkName() { //닉네임 유효성검사
	var swanname = document.getElementById("name").value;
	if (swanname == null || swanname.length == 0) {
		document.getElementById('checkName').style.color = "red";
		document.getElementById('checkName').innerHTML = "닉네임을 입력해주세요.";
		return false;
	} else if(!regExp6.test($('#name').val())){
		document.getElementById('checkName').style.color = "red";
		document.getElementById('checkName').innerHTML = "닉네임을 잘못 입력하였습니다.(특수문자 입력불가!)";
		return false;
	}else{
		return true;
	}
}

function signUpCheck(data){
	/*console.log("data", data);*/
	if (data.result == "사용 가능한 이메일 입니다.") {
		$('#checkEmail').css("color", "blue");
		signUpCheckEmail = true;
		return true;

	}else if (data.result == "중복된 이메일이 존재합니다.") {
		$('#checkEmail').css("color", "red");
		signUpCheckEmail = false;
		return false;
	}else if (data.result == "사용 가능한 닉네임 입니다.") {
		$('#checkName').css("color", "blue");
		signUpCheckName = true;
		return true;
	} else if (data.result == "중복된 닉네임이 존재합니다.") {
		$('#checkName').css("color", "red");
		signUpCheckName = false;
		return false;
	}else if (data.result == "비밀번호 불일치") {
		$('#checkPwd').css("color", "red");
		signUpCheckName = false;
		return false;
	}else if (data.result == "비밀번호 일치") {
		$('#checkPwd').css("color", "blue");
		signUpCheckName = true;
		return true;
	}
}


