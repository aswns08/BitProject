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

	$('#inputSearch').keypress(
			function(event) {
				// console.log(str);
				if (event.keyCode == 13) { // enter 클릭시
					
					 location.href= "boardList.html?ifLike=" + range +
					  "&title=" + title + "&writer=" + writer + "&content=" +
					  content + '&search=' + $('#inputSearch').val();
					 
				}
			});

	$('#selectAll').on('click', function() {
		title = true;
		content = true;
		writer = false;
	});

	$('#selectTitle').on('click', function() {
		title = true;
		content = false;
		writer = false;
	});

	$('#selectWriter').on('click', function() {
		title = false;
		content = false;
		writer = true;
	});

});
