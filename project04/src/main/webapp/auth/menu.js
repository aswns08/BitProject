$(document).on( 'pageinit',function(event){
	$("#query").keydown(function(key) {
		if (key.keyCode == 13) {
			location.href = ikkosaUrl + "api/list.html?searchKey=" + $('#query').val();
		}
	});
});

$("#barcodeBtn").click(function() {
	alert("웹 페이지에서는 실행되지 않습니다.");
});

$('#loginBtn').click(function() {
	location.href = ikkosaUrl + 'auth/login.html';
});

$('.logoutBtn').click(function(event) {
	$.getJSON(ikkosaUrl + 'json/auth/logout.do', function(data) {
		location.href = ikkosaUrl + 'auth/login.html';
	});
});

$('#homeBtn').click(function() {
	location.href = ikkosaUrl + 'user/home.html';
});

/*
 * $('#viewBtn').click(function(){ location.href = '../user/home.html'; });
 */

$('#mypage').click(function() {
	location.href = ikkosaUrl + 'user/checkPwd.html';
});

$('#storage').click(function() {
	location.href = ikkosaUrl + 'storage/storage.html';
});

$('#community').click(function() {
	location.href = ikkosaUrl + 'board/boardList.html';
});

$('#good').click(function() {
	location.href = ikkosaUrl + 'board/boardList.html?ifLike=true';
});

$('#bad').click(function() {
	location.href = ikkosaUrl + 'board/boardList.html?ifLike=false';
});


