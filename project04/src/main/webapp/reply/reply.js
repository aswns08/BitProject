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
	
	$(document).on('click', '.my-delete-btn', function(){
	  deleteProduct($(this).attr('data-no'));
    loadProduct(0); 
  });
	
});

$('#btnDelete').click(function(){
  deleteReply($('#rno').val());
});



function setPageNo(currPageNo, maxPageNo) {
  window.currPageNo = currPageNo;
  window.maxPageNo = maxPageNo;
  
  $('#pageNo').html(currPageNo);
  
  if (currPageNo <= 1) $('#prevBtn').css('display', 'none');
  else $('#prevBtn').css('display', '');
  
  if (currPageNo >= maxPageNo) $('#nextBtn').css('display', 'none');
  else $('#nextBtn').css('display', '');
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
       $('#listView').html(template(data));
       
     });
   
  });
}

function deleteReply(replyNo) {
  $.getJSON('../json/reply/delete.do?no=' + replyNo, 
      function(data){
    if(data.status == 'success') {
      loadReplyList(0);
      
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

