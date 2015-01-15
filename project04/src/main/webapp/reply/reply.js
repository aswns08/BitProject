var product;
var currPageNo;
var maxPageNo;

//$(document).ready(function(){});
$(function(){

  loadReplyList(1);
	
	// 셀렉터가 두번째 파라미터로 들어오게 되면 
	// 현재 그리고 앞으로 만들어질 태그에 대해서도 이 함수를 적용해라.
	$(document).on('click', '.data-row a', function(){
	  loadProduct($(this).attr('data-no')); // 오리지날 태그 말고 가공된 태그
	});
	
	$(document).on('click', '.delete', function(){
	  alert('정말 삭제 하시겠습니까?');
	  console.log($(this).attr('data-rno'));
	  deleteReply($(this).attr('data-rno'));
    //loadProduct(0); 
  });
	
});

$('#moreBtn').click(function(event){
  if (currPageNo < maxPageNo) {
    loadReplyList(currPageNo + 1);
  }
});

/*
$('#prevBtn').click(function(event){
  if (currPageNo > 1) {
    loadReplyList(currPageNo - 1);
  }
});

$('#nextBtn').click(function(event){
  if (currPageNo < maxPageNo) {
    loadReplyList(currPageNo + 1);
  }
});
*/


function setPageNo(currPageNo, maxPageNo) {
  window.currPageNo = currPageNo;
  window.maxPageNo = maxPageNo;
  
  $('#pageNo').html(currPageNo);
}
	
function loadReplyList(pageNo) {
  if(pageNo <= 0) pageNo = currPageNo;
  
	$.getJSON('../json/reply/list.do?pageNo=' + pageNo, 
    function(data){
      setPageNo(data.currPageNo, data.maxPageNo);
      var replies = data.replies;
      console.log(replies);
      yyyyMMddList(replies);
      
     require(['text!templates/reply-table.html'], function(html){
       var template = Handlebars.compile(html);
       $('#listDiv').html(template(data));
       $('#reply').page('destroy').page();
       
     });
   
  });
}

function deleteReply(replyNo) {
  console.log(replyNo);
  $.getJSON('../json/reply/delete.do?rno=' + replyNo, 
      function(data){
    if(data.status == 'success') {
      console.log(data);
      loadReplyList(0);
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

