var currPageNo;
var maxPageNo;
var currentBoard;
var data_rno;

//$(document).ready(function(){});
$(function(){

  currentBoard = getURLParameter('no');
  console.log("현재게시글번호---->",currentBoard);
  
  loadBoardView(currentBoard);
  loadReplyList(1, currentBoard);
	
  /*
	$(document).on('click', '.ui-popUp', function(){
	  console.log($(this).attr('data-rno'));
	  deleteReply($(this).attr('data-rno'));
    //loadProduct(0);
    
  });
	*/
	
	// 패널 정의!
$("#left-panel").load("../auth/menu.html", function() {
    $( "#reply" ).page("destroy").page();
  });

// 팝업창 정의
$(document).on('click', '.ui-popUp', function(){
  console.log($(this).attr('data-rno'));
  data_rno = $(this).attr('data-rno');
  $("#popupMenu").popup("open");
});



});

// 더보기 버튼
$('#addMoreBtn').click(function(event){
  if (currPageNo < maxPageNo) {
    loadReplyList(currPageNo + 1, currentBoard);
  }
});

$('.deleteBtn').click(function(evnet){
  console.log("삭제버튼", data_rno);
  deleteReply(data_rno);
  $("#popupMenu").popup("close");
});

$('.cancelBtn').click(function(event){
  $("#popupMenu").popup("close");
});

/* 댓글 쓰기 페이지로 이동 */
$('.writeReply').click(function(event){
  if(loginUser == null) {
    alert("로그인 후 이용이 가능합니다.");
  } else 
    location.href = 'writeReply.html?no=' + currentBoard;
});

function setPageNo(currPageNo, maxPageNo) {
  window.currPageNo = currPageNo;
  window.maxPageNo = maxPageNo;
  
  $('#pageNo').html(currPageNo);
}
	
function loadBoardView(no) {
  $.getJSON('../json/board/view.do?no=' + no, 
      function(data) {
    
    //console.log("view:", data);
    var board = data.board;

    require([ 'text!templates/board-view.html' ], function(html) {
      var template = Handlebars.compile(html);
      // handlebars 이용시!
      // template(출력할 변수)
      $('#viewDiv').html(template(board));
    });
  });
}

function loadReplyList(pageNo, bno) {
  
  if(pageNo <= 0) pageNo = currPageNo;
  
	$.getJSON('../json/reply/list.do?pageNo=' + pageNo + '&bno=' + bno, 
    function(data){
	    console.log(">>>>>",data);
      setPageNo(data.currPageNo, data.maxPageNo);
      
      var replies = data.replies;
      console.log(replies);
      yyyyMMddList(replies);
      
     require(['text!templates/reply-table.html'], function(html){
       var template = Handlebars.compile(html);
       if(pageNo==1) {
         $('#listDiv').html(template(data));
       } else {
         $('#listDiv').append(template(data));
       }
       $('#reply').page('destroy').page();
       console.log("회원정보 ?!!", loginUser.no);
     });
     loadAddMoreBtn();
   
  });
}

function deleteReply(replyNo) {
  console.log(replyNo);
  $.getJSON('../json/reply/delete.do?rno=' + replyNo, 
      function(data){
    if(data.status == 'success') {
      console.log(data);
      loadReplyList(0, currentBoard);
    } else {
      console.log("deleteReply Fail");
    }
  });
  }

/* 날짜 포맷 */
function yyyyMMddList(replies) {
  if (replies) {
    // 현재날짜
    var currentDate = new Date();
    // console.log("현재날짜 :" + currentDate);

    var str;
    for ( var reply in replies) {
      // 데이터베이스 날짜
      var dbDate = new Date(replies[reply].rDate);

      str = "";
      if (!compareDate(currentDate, dbDate)) {
        str = dbDate.getFullYear() + '/';

        if (dbDate.getMonth() < 9)
          str += '0';
        str += (dbDate.getMonth() + 1) + '/';

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

      // console.log("이전 : " + boards[board].date);
      // console.log(str);
      replies[reply].rDate = str;
      // console.log("이전 : 이후" +boards[board].date);

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

/* url parse */
function getURLParameter(name) {
  return decodeURI((RegExp(name + '=' + '(.+?)(&|$)').exec(location.search) || [
      , null ])[1]);
}

function loadAddMoreBtn() {
  if (currPageNo < maxPageNo) {
    $('#addMoreA').css('display', '');
  } else {
    $('#addMoreA').css('display', 'none');
  }
}


