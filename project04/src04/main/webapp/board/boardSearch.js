$(document).bind('pageinit', function() {
});
// $.mobile.defaultPageTransition = 'slide';

var range = '';
var title = true;
var content = true;
var writer = false;
var str = null;

// $(document).ready(function(){});
$(function() {
	$('#select-native-1').on('change', function() {
		// console.log($(this).val());
		range = $(this).val();
	});
	
	
	
	$('#inputSearch').keypress(function(event) {		
		console.log(str);
        if (event.keyCode == 13) { // enter 클릭시
        	//alert('Entered' + $('#inputSearch').val());

        	// 1번 2번 코드 결과값은
        	// 차이가 없으나 한글(utf-8) 전달이 안될 경우를 생각해 남겨둠
        	// 1. 인코딩 후 이동
        	/*var url = encodeURI(
        			"boardList.html?ifLike=" + range        	
                	+ "&title=" + title + "&writer=" + writer + 
                	"&content=" + content + '&search=' + $('#inputSearch').val()
        			);
        	
        	//console.log(url);
        	location.href = url;*/
        	
        	// 2. 인코드 안하고 이동
        	location.href="boardList.html?ifLike=" + range 
        	+ "&title=" + title + "&writer=" + writer + 
        	"&content=" + content + '&search=' + $('#inputSearch').val();
        }
    });

});

function selectAll() {
	title = true;
	content = true;
	writer = false;
}

function selectTitle() {
	title = true;
	content = false;
	writer = false;
}

function selectWriter() {
	title = false;
	content = false;
	writer = true;
}

