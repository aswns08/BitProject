$(document).on( 'pageinit',function(event){
	$("#queryH").keydown(function(key) {
		if (key.keyCode == 13) {
			location.href = "../api/list.html?searchKey=" + $('#queryH').val();
		}
	});
});

$(function(){
	$("#left-panel").load("../auth/menu.html", function() {
		$("#home").page("destroy").page();
	});
});

$(document).on("pageinit", "#home", function() {
	var $page = $(this);	
	$page.on("swiperight", function(e) {
		if ($page.jqmData("panel") !== "open") {
			if (e.type === "swiperight") {
				$("#left-panel").load("menu.html");
				$page.find("#left-panel").panel("open");
			}
		}
	});
});

$('#logoutBtn').click(function(event) {
	$.getJSON('../json/auth/logout.do', function(data) {
		location.href = '../auth/login.html';
	});
});

$('#loginBtn').click(function(event) {
	location.href = '../auth/login.html';
});

$(function() {
	$.getJSON('../json/auth/loginUser', function(data) {
		if (data.status == 'fail') {
			// $('#loginBtn').css('display', '');
			// console.log("login fail");

		} else {
			$('#loginBtn').css('display', 'none');
			$('#logoutBtn').css('display', '').css('margin', '0px');
			// console.log("login seccess");

			console.log(data.loginUser);
			$('#userName').html(data.loginUser.name);
			/*
			 * $('#userName').click(function(){ alert('사용자 정보 조회 창으로 보낼 예정');
			 * });
			 */
		}
	});

	/*
	 * $("#left-panel").load("menu.html", function(){ $( "#home"
	 * ).page("destroy").page(); });
	 * 
	 * $(document).on("pageinit", "#home", function() { var $page = $(this);
	 * $page.on("swiperight", function(e) { if ($page.jqmData("panel") !==
	 * "open") { if (e.type === "swiperight") {
	 * $("#left-panel").load("menu.html");
	 * $page.find("#left-panel").panel("open"); } } }); });
	 */
});
