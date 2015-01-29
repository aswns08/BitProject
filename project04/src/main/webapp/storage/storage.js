var currPageNo;
var maxPageNo;

//$(document).ready(function(){});
// 첫화면
$(function(){
	
	$("#totalCount").show();
    $(".editing").hide();
    $(".liCheckbox").hide();
    $(".totalCheck").hide();
    $(".beforeEdit").show();
    $("#totalSelect").hide();
    $("#my-checkbox").hide();
    $("#allCheck").hide();
		
    loadStorageList(1);
  
  $(document).on('click', '.data-row a', function(){
    loadStorage($(this).attr('data-no'));
  });
  
	// 패널 정의!
  $("#left-panel").load("../auth/menu.html", function() {
      $( "#storagePage" ).page("destroy").page();
    });
  
});
// 편집 버튼
$("#editBtn").click(function() {
	$('#roundedOne').attr('display','');
	$("#totalCount").hide();
	$(".beforeEdit").hide();
	$(".liCheckbox").show();
	$(".totalCheck").show();
	$("#totalSelect").show();
	$("#searchCount").hide();
	$("#totalCount").hide();
	$("#my-checkbox").hide();
	$("#allCheck").show();
/*
	$("#moveEdit").animate({
		left : '30px'
	});
	$(".moveDiv").animate({
		left : '30px'
	});
	*/
	$(".editing").show();
});
// 삭제 버튼
$("#deleteBtn").click(function() {
	$("input[name=mycheck]:checked").each(function() {
		var temp = $(this).val();
		//console.log("test==>",temp);
		deleteStorage(temp);
	});
	$("#totalCount").show();
	$("#searchCount").show();
	$(".editing").hide();
	$(".liCheckbox").hide();
	$(".totalCheck").hide();
	$("#totalSelect").hide();
	$("#my-checkbox").hide();
	$("#allCheck").hide();
/*
	$("#moveEdit").animate({
		left : '30px'
	});
	$(".moveDiv").animate({
		left : '30px'
	});
	*/
	$(".beforeEdit").show();
	$("#my-checkbox").prop("checked", false);
	
});

/*$("#completeBtn").click(function() {
	$("#totalCount").show();
	$(".editing").hide();
	$(".liCheckbox").hide();
	$(".totalCheck").hide();
	$("#totalSelect").hide();

	$("#moveEdit").animate({
		left : '30px'
	});
	$(".moveDiv").animate({
		left : '30px'
	});
	$(".beforeEdit").show();
});*/

$("#my-checkbox").click(function() {
	// $("input[name=mycheck]:checkbox").attr("checked", true); 

	if ($(this).is(':checked')) {
		$("input[name=mycheck]").prop("checked", true);
	} else {
		$("input[name=mycheck]").prop("checked", false);
	}
}); 

$('#prevBtn').click(function(event){
	if (currPageNo > 1) {
	  loadStorageList(currPageNo - 1);
	}
});

$('#nextBtn').click(function(event){
	if (currPageNo < maxPageNo) {
	  loadStorageList(currPageNo + 1);
	}
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
	
function loadStorageList(pageNo) {
  if (pageNo <= 0) pageNo = currPageNo;
	$.getJSON('../json/storage/list.do?pageNo=' + pageNo, 
    function(data){
		setPageNo(data.currPageNo, data.maxPageNo);
      var storages = data.storages;
      var totalSize = data.totalSize;
      
      $('#totalCount').html(totalSize + "개");
      
      require(['text!templates/storage-table.html'], function(html){
        var template = Handlebars.compile(html);
        $('#listDiv').html( template(data) );
        $('#storagePage').page('destroy').page();
      });
  
    });
}

function deleteStorage(sno) { //체크된 함수파라미터를 넘길것
	//console.log(mycheck);
	$.getJSON('../json/storage/delete.do?sno=' + sno, 
			function(data){
		if(data.status == 'success') {
			loadStorageList(0);
		} else {
			console.log("deleteStorage Fail");
		}
	});
}

$("allCheck").removeClass("ui-btn-icon-left");
$("allCheck").addClass("ui-btn-icon-right");






















