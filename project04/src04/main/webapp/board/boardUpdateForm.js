$(function() {
	$('#menuPanel').load('../common/panel.html');

	// console.log('getURLParameter : ' + getURLParameter('no'));

	loadBoardView(getURLParameter('no'));
});

function loadBoardView(no) {
	$.getJSON('../json/board/view.do?no=' + no, function(data) {
		var board = data.board;

		//console.log('loadBoardView :' + no);
		//console.log(board);

		require([ 'text!templates/board-update.html' ], function(html) {
			var template = Handlebars.compile(html);
			// handlebars 이용시!
			// template(출력할 변수)
			$('#listDiv').html(template(board));
			// 동적으로 페이지 reload
			$('#boardWrite').page('destroy').page();
		});
	});
}

function save() {
	/*
	 * if (!validateForm()) return;
	 */
	/*
	 * $.post(URL, 성공함수) .fail(실패함수) .done(성공함수2) .always(마무리함수);
	 */
	$.post('../json/board/update.do?no=' + getURLParameter('no') /* URL */
	, { /* 서버에 보낼 데이터를 객체에 담아 넘긴다 */
		title : $('#title').val(),
		content : $('#content').val(),
		productNo : $('#productNo').val()
	}, function(result) { /* 서버로부터 응답을 받았을 때 호출될 메서드 */
		if (result.status == "success") {
			location.href = '../board/boardList.html';
		} else {
			alert("등록 실패!");
		}
	}, 'json' /* 서버가 보낸 데이터를 JSON 형식으로 처리 */)
	/* 서버 요청이 실패했을 때 호출될 함수 등록 */
	.fail(function(jqXHR, textStatus, errorThrown) {
		alert(textStatus + ":" + errorThrown);
	});
}

/* url parse */
function getURLParameter(name) {
	return decodeURI((RegExp(name + '=' + '(.+?)(&|$)').exec(location.search) || [
			, null ])[1]);
}