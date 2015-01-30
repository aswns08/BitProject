var signUpCheckName = true;
var signUpCheckPwd = false;
var signUpCheckName2 = false;
var loginUser;
var regExp4 = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{1,20}$/;
var regExp6 = /^[0-9a-zA-Z가-힣]([-_\.]?[0-9a-zA-Z가-힣])*$/i; //닉네임

$(function() {
	$("#left-panel").load("../auth/menu.html", function() {
		$("#myPage").page("destroy").page();
	});


$.getJSON('../json/auth/loginUser.do', function(data){
	if (data.status == 'fail') { 
		alert("로그인후 이용하세요.");
		location.href = '../auth/login.html';

	} else {
		loginUser = data;
		$('#email').attr('value', data.loginUser.email);
		$('#name').attr('value', data.loginUser.name);
		
		//console.log("이름", $('#name').val());
		//console.log("이메일", $('#email').val());

		$(function() {
			if($("#name").val()){
				document.getElementById('checkName').style.color = "green";
				document.getElementById('checkName').innerHTML = "닉네임이 변경되지 않았습니다.(사용가능)";
				signUpCheckName2 = true;
			}
			$("#name").keyup(function() { //닉네임 유효성검사
				if(checkName(data)){
					$.get("http://192.168.0.15:3000/namecheck", {
						name : $('#name').val()
					}, function(data) {
						signUpCheck(data);
						$('#checkName').html(data.result);		
					});
				}
			});
		})

/*		$('#userName').click(function(){
			alert('사용자 정보 조회 창으로 보낼 예정');
		});  */
	}
});

});


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

function checkPwd() { //새로운 비밀번호 유효성검사
	var pwd = $("#pwd").val();
	var newPwd = $("#newPwd").val();
	var rePwd = $("#rePwd").val();
	console.log(loginUser);
	
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

function signUpCheck(data){
	if (data.result == "사용 가능한 닉네임 입니다.") {
		$('#checkName').css("color", "blue");
		signUpCheckName = true;
		return true;
	}else if(loginUser.loginUser.name == $('#name').val() & data.result == "중복된 닉네임이 존재합니다."){
		$('#checkName').css("color", "green");
		data.result = "닉네임이 변경되지 않았습니다.(사용가능)";
		signUpCheckName = true;
		return true;
	}else if (data.result == "중복된 닉네임이 존재합니다.") {
		$('#checkName').css("color", "red");
		signUpCheckName = false;
		return false;
	}/*else if(data.result == "비밀번호 불일치"){
		$('#checkPwd').css("color", "red");
		signUpCheckPwd = false;
		return false;
	}else if(data.result == "비밀번호 일치"){
		$('#checkPwd').css("color", "blue");
		signUpCheckPwd = true;
		return true;
	}*/
}

function updateUser() { //Update 입력값
	  $.post('../json/user/update.do'
	      , {
	    	  no : loginUser.loginUser.no,
	    	  email : $('#email').val(),
				name : $('#name').val(),
				newPwd :$('#newPwd').val()
				
	      } 
	      , function(result){
	        if (result.status == "success") {
	        	location.href = '../user/home.html';
	          $('#btnCancel').click();
	          alert("변경 성공!")
	        	//alert("success");
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
	
	if (!signUpCheckName || !checkName()){
		alert("닉네임을 바르게 입력하세요.");
		console.log('signUpCheckName', signUpCheckName);
		console.log('checkName', checkName());
		return;
	}/*else if(!signUpCheckPwd){
		alert("비밀번호를 바르게 입력하세요.");
		return;
	}*/else if(!checkPwd()){
		alert("새 비밀번호를 바르게 입력하세요.");
		return;
	}
	updateUser();
});

	function validateForm() { //update 유효성 체크
		if ( $('#name').val().length == 0) {
			alert('닉네임은 필수 입력 항목입니다.');
			return false;
		}

		/*if ( $('#pwd').val().length == 0) {
			alert('비밀번호는 필수 입력 항목입니다.');
			return false;
		}*/

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
	
	
/*	$(function() {
		$("#pwd").keyup(function() { //기존 비밀번호 유효성검사
			//if(checkPwd()){
				$.get("http://192.168.0.15:3000/pwdcheck", {
					no : loginUser.loginUser.no ,
					pwd : $('#pwd').val(),
					//value : loginUser.loginUser.pwd

				}, function(data) {
					console.log(data);
					$('#checkPwd').html(data.result);
					signUpCheck(data);
				});
			//}
		});
	})*/
	
	