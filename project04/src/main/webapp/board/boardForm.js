	$("#btnAdd").on("click", function() {

		/*
		 * if (!validateForm()) return;
		 */
		/*
		 * $.post(URL, 성공함수) .fail(실패함수) .done(성공함수2) .always(마무리함수);
		 */
		$.post('../json/board/add.do' /* URL */
		, { /* 서버에 보낼 데이터를 객체에 담아 넘긴다 */
			ifLike : $('#ifLike').val(),
			title : $('#title').val(),
			content : $('#content').val(),
			userNo : $('#userNo').val(),
			productNo : $('#productNo').val()
		}, function(result) { /* 서버로부터 응답을 받았을 때 호출될 메서드 */
			if (result.status == "success") {
				console.log("성공");
				location.href = '../board/boardList.html';

			} else {
				alert("등록 실패!");
			}
		}, 'json' /* 서버가 보낸 데이터를 JSON 형식으로 처리 */)
		/* 서버 요청이 실패했을 때 호출될 함수 등록 */
		.fail(function(jqXHR, textStatus, errorThrown) {
			alert(textStatus + ":" + errorThrown);
		});
	});
