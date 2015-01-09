  var reply;

  $("#backLink").click(function(event) {
    event.preventDefault();
    history.back(1);
});
  
  $('#btnSave').click(function(){
    
    if(!validateForm()) return;
    
    /*$.post(URL, 성공함수)
       .fail(실패함수)
       .done(성공함수2)
       .always(마무리함수)
    */
  $.post('../json/reply/add.do' /* URL */
    , { /* 서버에 보낼 데이터를 객체에 담아 넘긴다. */
      uno : $('#uno').val(),
      bno : $('#bno').val(),
      rContent : $('#rContent').val()
      
    }, function(result) { /* 서버로부터 응답을 받았을 때 호출 될 메서드 */
      if (result.status == "success") {
        alert("등록성공");
        location.href = '/project04/reply/reply.html';
        $('#btnCancel').click(); // click 이벤트 발생 시킴.
      } else {
        alert("등록실패");
      }
    }, 'json' /* 서버가 보낸 데이터를 JSON 형식으로 처리 */)
    /*서버 요청이 실패했을 때 호출될 함수 등록 */
    .fail(function(jqXHR, textStatus, errorThrown) {
      alert(textStatus + ":" + errorThrown);
    });

  });
  
  function validateForm() {
    if ( $('#uno').val() == 0) {
      alert('회원번호는 필수 입력 항목입니다.');
      return false;
    }
    
    if ( $('#bno').val() == 0) {
      alert('게시글 번호는 필수 입력 항목입니다.');
      return false;
    }
    
    if ( $('#rContent').val().length == 0) {
      alert('내용을 입력하세요.');
      return false;
    }
    
    return true;
  }
