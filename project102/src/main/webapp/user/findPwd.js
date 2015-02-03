var vcode;
var signUpCheckEmail;

$('#authBtn').click(function(){
	
	if (!validateForm()) return;
	
	if (!signUpCheckEmail || !checkEmail()){
		alert("존재하지 않는 이메일 입니다.");
		return;
	}

	$.post(ikkosaUrl + 'json/user/email.do' 
			, {   
				email : $('#email').val()
			} 
			, function(result){  
				if (result.status == "success") {
					vcode = result.vcode;	
					alert("메일발송!!!");
				}else {
					alert("인증 실패!");
				}				
			} 

			, 'json')
			.fail(function(jqXHR, textStatus, errorThrown){ 
				alert(textStatus + ":" + errorThrown);
			});

});


$('#vcodeBtn').click(function(){
	if(vcode == $("#vcode").val()){
		alert("인증번호가 일치합니다.");
		location.href = ikkosaUrl + "user/changePwd.html"; 
	}else{
		alert("인증번호를 다시 확인하시오.");
	}
});


$(function() {
	$("#email").keyup(function() { //이메일 유효성검사
		/*if(checkEmail()){*/
			$.get("http://192.168.0.15:3000/emailfind", {
				email : $('#email').val()

			}, function(data) {
				$('#checkEmail').html(data.result);
				signUpCheck(data);
			});
		/*}*/
	});
})

function signUpCheck(data){
	/*console.log("data", data);*/
	if (data.result == "이메일 확인.") {
		$('#checkEmail').css("color", "blue");
		signUpCheckEmail = true;
		return true;

	}else if (data.result == "존재하지 않는 이메일 입니다.") {
		$('#checkEmail').css("color", "red");
		signUpCheckEmail = false;
		return false;
	}
}

function validateForm() {
	if ( $('#email').val().length == 0) {
		alert('이메일은 필수 입력 항목입니다.');
		return false;
	}else {
		return true;
	}
}

function checkEmail() {
	var userid = document.getElementById("email").value;

	if (userid == null || userid.length == 0) {
		document.getElementById('checkEmail').style.color = "red";
		document.getElementById('checkEmail').innerHTML = "이메일을 입력해주세요.";
		return false;
	}else{ 
		return true;
	}
}


