$(document).bind('pageinit', function() {
});

var currPageNo;
var maxPageNo;
var saveOrderBy = "";
var ifLike = "";

// $(document).ready(function(){});
$(function() {
  $("#left-panel").load("../auth/menu.html", function() {
		$("#board").page("destroy").page();
	});

	// url 파싱
	// console.log("URL : " + url());

	if (url('?orderBy') != "null") {
		ifLike = url('?orderBy');
	}

	/* 동적으로 셀렉트 옵션 지정 */
	$('#select-native-1 option').removeAttr('selected').filter(
			'[value="' + url('?ifLike') + '"]').attr('selected', true)
	$('#select-native-1').selectmenu('refresh');

	loadBoardList(1, url('?orderBy'), url('?ifLike'), url('?title'),
			url('?content'), url('?writer'), url('?search'));

	$(document).on('click', '.data-row a', function() {
		// console.log($(this).attr('data-no'));
		plusCount($(this).attr('data-no'));
	});

	// 미사용?
	/*
	 * $(document).on('click', '.my-delete-btn', function() {
	 * deleteBoard($(this).attr('data-no')) loadBoard(0); });
	 */

	$('#prevBtn').click(
			function(event) {
				if (currPageNo > 1) {
					loadBoardList(currPageNo - 1, saveOrderBy, $(
							"#select-native-1").val(), url('?title'),
							url('?content'), url('?writer'), url('?search'));
				}
			});

	$('#nextBtn').click(
			function(event) {
				if (currPageNo < maxPageNo) {
					loadBoardList(currPageNo + 1, saveOrderBy, $(
							"#select-native-1").val(), url('?title'),
							url('?content'), url('?writer'), url('?search'));
				}
			});

	$('#select-native-1').on(
			'change',
			function() {
				// console.log($(this).val());

				ifLike = $("#select-native-1").val();
				loadBoardList(1, url('?orderBy'), $(this).val(), url('?title'),
						url('?content'), url('?writer'), url('?search'));
			});

	$('#newOrder').click(
			function() {
				saveOrderBy = 'new';
				loadBoardList(1, 'new', ifLike, url('?title'), url('?content'),
						url('?writer'), url('?search'));
			});

	$('#viewOrder').click(
			function() {
				saveOrderBy = 'count';
				loadBoardList(1, 'count', ifLike, url('?title'),
						url('?content'), url('?writer'), url('?search'));
			});

	$('#recomOrder').click(
			function() {
				saveOrderBy = 'reco';
				loadBoardList(1, 'reco', ifLike, url('?title'),
						url('?content'), url('?writer'), url('?search'));
			});
});

function plusCount(bno) {
	console.log('조회수증가 ' + bno);
	$.post('../json/board/plusCount.do' /* URL */
	, { /* 서버에 보낼 데이터를 객체에 담아 넘긴다 */
		no : bno
	}, function(result) { /* 서버로부터 응답을 받았을 때 호출될 메서드 */
		if (result.status == "success") {
			$('#btnCancel').click(); // click 이벤트 발생시킴.
			location.href = 'boardView.html?no=' + bno;
		} else {
			alert("등록 실패!");
		}
	}, 'json' /* 서버가 보낸 데이터를 JSON 형식으로 처리 */)
	/* 서버 요청이 실패했을 때 호출될 함수 등록 */
	.fail(function(jqXHR, textStatus, errorThrown) {
		alert(textStatus + ":" + errorThrown);
	});
}

function setPageNo(currPageNo, maxPageNo) {
	window.currPageNo = currPageNo;
	window.maxPageNo = maxPageNo;

	$('#pageNo').html(currPageNo);

	if (currPageNo == null) {
		$('#prevBtn').css('display', 'none');
		$('#nextBtn').css('display', 'none');
	}
	if (currPageNo <= 1)
		$('#prevBtn').css('display', 'none');
	else
		$('#prevBtn').css('display', '');

	if (currPageNo >= maxPageNo)
		$('#nextBtn').css('display', 'none');
	else
		$('#nextBtn').css('display', '');
}

function loadBoardList(pageNo, orderBy, ifLike, title, content, writer, search) {
	// console.log($("#select-native-1").val());
	saveOrderBy = orderBy;

	if (pageNo <= 0)
		pageNo = currPageNo;

	if (orderBy == null)
		orderBy = "";
	if (ifLike == null)
		ifLike = "";
	if (title == null)
		title = "";
	if (content == null)
		content = "";
	if (writer == null)
		writer = "";
	if (search == null)
		search = "";

	$.getJSON('../json/board/list.do?pageNo=' + pageNo + '&orderBy=' + orderBy
			+ '&ifLike=' + ifLike + '&title=' + title + '&writer=' + writer
			+ '&content=' + content + '&search=' + search, function(data) {
		var boards = data.boards;

		// console.log("불러온 데이터 수: " + boards.length);
		// console.log(boards);
		if (boards.length == 0) {
			var msg = '검색된 결과가 없습니다.';
			$('#listDiv').html(msg);
			setPageNo(null, null);

		} else {
			yyyyMMddList(boards);
			setPageNo(data.currPageNo, data.maxPageNo);

			require([ 'text!templates/board-table.html' ], function(html) {
				var template = Handlebars.compile(html);
				if (currPageNo == 1) {
					$('#listDiv').html(template(data));
				} else {
					$('#listDiv').append(template(data));
				}
				$('#board').page('destroy').page();
			});
		}
		loadAddMoreBtn();
	});
}

/* 날짜 포맷 */
function yyyyMMddList(boards) {
	if (boards) {
		// 현재날짜
		var currentDate = new Date();
		// console.log("현재날짜 :" + currentDate);

		var str;
		for ( var board in boards) {
			// 데이터베이스 날짜
			var dbDate = new Date(boards[board].date);

			str = "";
			if (!compareDate(currentDate, dbDate)) {
				str = dbDate.getFullYear() + '.';

				if (dbDate.getMonth() < 9)
					str += '0';
				str += (dbDate.getMonth() + 1) + '.';

				if (dbDate.getDate() < 10)
					str += '0';
				str += dbDate.getDate();
			} else {
				if (dbDate.getHours() < 10)
					str += '0';
				str += dbDate.getHours() + ":";

				if (dbDate.getMinutes() < 10)
					str += '0';
				str += dbDate.getMinutes();
			}

			boards[board].date = str;
		}
	} else {
		return '';
	}
}

function compareDate(currentDate, dbDate) {
	if (yyyyMMdd(currentDate) == yyyyMMdd(dbDate))
		return true;
	else
		false;
}

function yyyyMMdd(date) {
	if (date) {
		var date = new Date(date);
		var str = date.getFullYear();

		if (date.getMonth() < 9)
			str += '0';
		str += (date.getMonth() + 1);

		if (date.getDate() < 10)
			str += '0';
		str += date.getDate();

		return str;

	} else {
		return '';
	}
}

function loadAddMoreBtn() {
	if (url('?search')) {
		if ((currPageNo + 1) < maxPageNo) {
			$('#addMoreA').css('display', '');
		} else {
			$('#addMoreA').css('display', 'none');
		}
	} else {
		if (currPageNo < maxPageNo) {
			$('#addMoreA').css('display', '');
		} else {
			$('#addMoreA').css('display', 'none');
		}
	}	
}

$(document).on(
		"click",
		"#addMoreBtn",
		function() {
			loadBoardList(currPageNo + 1, saveOrderBy, ifLike, url('?title'),
					url('?content'), url('?writer'), url('?search'));

		});