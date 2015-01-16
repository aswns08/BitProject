var user;
var regExp1 = /[a-zA-Z0-9_]/; //모든문자
var regExp2 = /[^a-zA-Z0-9_]/; //\W(...과 모든공백) + 문자를 제외한 문자(특수문자)
var regExp3 = /\s/g; //모든 공백
var regExp4 = /^[a-z0-9_]{4,20}$/; //아이디나 비번
var regExp5 = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i; //이메일
//var regExp6 = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;

$('#btnCancel').click(function(){
	/*$('.my-update-form').css('display', 'none');*/
	$('.my-new-form').css('display', '');
	user = null;
});

$('#btnAdd').click(function(){
	if (!validateForm()) return;

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
	
	/*console.log("aaa", regExp6.test($('#email').val()));*/
	
	/*console.log("aaa", data.result);*/
	
/*	var email = $('#email').val();*/
	
	/*if(!regMust1.test(str) || !regMust2.test(str)) alert("경고문!!");*/
	
	
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
	} else if (pwd.length < 6 || rePwd.length < 6) {
		document.getElementById('checkPwd').style.color = "red";
		document.getElementById('checkPwd').innerHTML = "비밀번호 6자 이상 입력하세요.";

	} else if (pwd != rePwd) {
		document.getElementById('checkPwd').style.color = "red";
		document.getElementById('checkPwd').innerHTML = "비밀번호가 일치하지 않습니다.";
	} else if(pwd == rePwd){
		document.getElementById('checkPwd').style.color = "blue";
		document.getElementById('checkPwd').innerHTML = "비밀번호가 확인되었습니다.";
	}
}

$(function() {

	$("#email").keyup(function() { //아이디 유효성검사
		$.get("http://192.168.0.15:3000/emailcheck", {
			email : $('#email').val()
			
		}, function(data) {
			$('#checkEmail').html(data.result);
			if (data.result == "사용 가능한 이메일 입니다.") {
				$('#checkEmail').css("color", "blue");
				
			}else if (data.result == "중복된 이메일이 존재합니다.") {
				$('#checkEmail').css("color", "red");
				
			}else if (data.result == "이메일을 입력 하시오.") {
				$('#checkEmail').css("color", "red");
				
			}else if (data.result == "이메일을 잘못 입력 하였습니다.") {
				$('#checkEmail').css("color", "red");
			}
		});
	});
})


$(function() {
	$("#name").keyup(function() { //아이디 유효성검사
		$.get("http://192.168.0.15:3000/namecheck", {
			name : $('#name').val()
		}, function(data) {
			$('#checkName').html(data.result);
			if (data.result == "사용 가능한 아이디입니다.") {
				$('#checkName').css("color", "blue");
			} else if (data.result == "중복된 아이디가 존재합니다.") {
				$('#checkName').css("color", "red");
			}
		});
	});
})  

function checkEmail() {
	var swanid = document.getElementById("email").value;
		
	if (swanid == null || swanid.length == 0) {
		document.getElementById('checkEmail').style.color = "red";
		document.getElementById('checkEmail').innerHTML = "이메일을 입력해주세요.";
		}
	
/*	else if(!regExp5.test($('#email').val())){
		document.getElementById('checkEmail').style.color = "red";
		document.getElementById('checkEmail').innerHTML = "이메일을 잘못 입력하였습니다.";		
		
	}else{
		document.getElementById('checkEmail').style.color = "blue";
		document.getElementById('checkEmail').innerHTML = "이메일성공";
	}*/
}

/*if(!regMust1.test(str) || !regMust2.test(str)) alert("경고문!!");*/

function checkName() { //닉네임 유효성검사
	var swanname = document.getElementById("name").value;
	if($('#name').val())
	if (swanname == null || swanname.length == 0) {
		document.getElementById('checkName').style.color = "red";
		document.getElementById('checkName').innerHTML = "닉네임을 입력해주세요.";
	} else {
		document.getElementById('checkName').innerHTML = "&nbsp";
	}
}

/*function validateEmail(email) {
    // First check if any value was actually set
    if (email.length == 0) return false;
    // Now validate the email format using Regex
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
    return re.test(email);
}
var email = document.getElementById('email');
if (validateEmail(email)) { alert('Valid email address'); }
else { aler('Invalid email address'); }*/


