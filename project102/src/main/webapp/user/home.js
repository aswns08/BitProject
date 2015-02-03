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
$("#searchBlock").click(function() {
	alert("웹 페이지에서는 실행되지 않습니다.");
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


