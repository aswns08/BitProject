var signUpCheckPwd = false;
var loginUser;
var regExp4 = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{1,20}$/;
//var regExp6 = /^[0-9a-zA-Z가-힣]([-_\.]?[0-9a-zA-Z가-힣])*$/i; //닉네임

function checkPwd() { //새로운 비밀번호 유효성검사
	var pwd = $("#pwd").val();
	var newPwd = $("#newPwd").val();
	var rePwd = $("#rePwd").val();
	//console.log(loginUser);
	
	if (newPwd == null || newPwd.length == 0) {
		document.getElementById('checkNewPwd').style.color = "red";
		document.getElementById('checkNewPwd').innerHTML = "비밀번호를 입력해주세요.";
		return false;
	}else if(!regExp4.test(newPwd)){
		document.getElementById('checkNewPwd').style.color = "red";
		document.getElementById('checkNewPwd').innerHTML = "비밀번호는 문자, 숫자, 특수문자의 조합으로 입력해주세요.";
		return false;
	}else if (newPwd.length < 6 || newPwd.length > 16) {
		document.getElementById('checkNewPwd').style.color = "red";
		document.getElementById('checkNewPwd').innerHTML = "비밀번호는 6 ~ 16 자리로 입력해주세요.";
		return false;
	} else if (newPwd != rePwd) {
		document.getElementById('checkNewPwd').style.color = "red";
		document.getElementById('checkNewPwd').innerHTML = "비밀번호가 일치하지 않습니다.";
		return false;
	} else if(newPwd == rePwd){
		document.getElementById('checkNewPwd').style.color = "blue";
		document.getElementById('checkNewPwd').innerHTML = "비밀번호가 확인되었습니다.";
		return true;;
	}
}

function changePwdUser() { //Update 입력값
	  $.post(ikkosaUrl + 'json/user/changePwd.do'
	      , {
	    	  	//email : $('#email').val(),
				newPwd :$('#newPwd').val()
				
	      } 
	      , function(result){
	        if (result.status == "success") {
	        	
	          location.href = '../auth/login.html';
	          //$('#btnCancel').click();
	          alert("변경 성공!");
	        } else {
	          alert("변경 실패!");
	        }
	      } 
	      , 'json')
	   .fail(function(jqXHR, textStatus, errorThrown){ 
	     alert(textStatus + ":" + errorThrown);
	   });
	}


$('#btnUpdate').click(function(){ //변경버튼 눌렀을때
	/*if (loginUser.loginUser.name == $('#name').val()) {		  
		alert('변경한 것이 없습니다!');
		return;
	}*/

	if (!validateForm()) return;
	
	if(!checkPwd()){
		alert("새 비밀번호를 바르게 입력하세요.");
		return;
	}
	changePwdUser();
});

	function validateForm() { //update 유효성 체크
		if ( $('#newPwd').val() == 0) {
			alert('새로운 비밀번호를 입력 하세요.');
			return false;
		}
		
		if($('#rePwd').val() == 0){
			alert('새로운 비밀번호를 다시한번 입력 하세요.');
			return false;
		}
		return true;
	}
	

	