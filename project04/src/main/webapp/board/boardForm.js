$(function() {
  
	$('#myFormId').ajaxForm({
	  
		data : {
			userNo : loginUser.no	
		},
		beforeSubmit : function(data, form, option) {
			// validation체크
			// 막기위해서는 return false를 잡아주면됨
			return true;
		},
		success : function(response, status) {
			// 성공후 서버에서 받은 데이터 처리
			alert("업로드 성공!!");
			location.href = '../board/boardList.html';
		},
		error : function() {
			// 에러발생을 위한 code페이지
			alert("업로드 실패!!");
		}
	});
});
