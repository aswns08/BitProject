var currPageNo;
var maxPageNo;

$(function() {
	// 패널 정의!
	$("#left-panel").load("../auth/menu.html", function() {
		$("#storagePage").page("destroy").page();
	});

	
	/* topNav */
	$("#totalCount").show();
	$("#editingTopNavDiv").hide();
	$("#my-checkbox").hide();
	$(".editing").hide();

	/* template */
	$(".liCheckbox").hide();
	$("checkbox").hide();

	/*
	 * $(".totalCheck").hide(); $(".beforeEdit").show();
	 * $("#totalSelect").hide(); $("#allCheck").hide();
	 */
	
	loadStorageList(1);

});

// 편집 버튼
$("#editBtn").click(function() {

	$('#roundedOne').attr('display', '');
	$("#totalCount").hide();
	$("#editingTopNavDiv").show();
	$("#my-checkbox").show();

	$(".itemDetail").removeClass("notEditingClass");
	$(".itemDetail").addClass("editingClass");

	$(".itemImg").removeClass("notEditingClass");
	$(".itemImg").addClass("editingClass");

	$(".beforeEdit").hide();
	$(".liCheckbox").show();
	$(".totalCheck").show();
	$("#totalSelect").show();
	$("#searchCount").hide();
	$("#totalCount").hide();
	$("#allCheck").show();
	$(".editing").show();
});

// 삭제 버튼
$("#deleteBtn").click(function() {
	$("input[name=mycheck]:checked").each(function() {
		var temp = $(this).val();
		 console.log("test==>",temp);
		deleteStorage(temp);
	});
	$("#totalCount").show();
	$("#searchCount").show();
	$(".editing").hide();
	/*
	 * $(".liCheckbox").hide();
	 */$(".totalCheck").hide();
	$("#totalSelect").hide();
	$("#my-checkbox").hide();
	$("#allCheck").hide();

	$(".beforeEdit").show();
	$("#my-checkbox").prop("checked", false);

});

$("#completeBtn").click(function() {
	$("#totalCount").show();
	$("#editingTopNavDiv").hide();
	$("#my-checkbox").hide();

	$(".itemDetail").removeClass("editingClass");
	$(".itemDetail").addClass("notEditingClass");

	$(".itemImg").removeClass("editingClass");
	$(".itemImg").addClass("notEditingClass");

	$(".editing").hide();
	$(".liCheckbox").hide();
	$(".totalCheck").hide();
	$("#totalSelect").hide();

	$(".beforeEdit").show();
});

$('#prevBtn').click(function(event) {
	if (currPageNo > 1) {
		loadStorageList(currPageNo - 1);
	}
});

$('#nextBtn').click(function(event) {
	if (currPageNo < maxPageNo) {
		loadStorageList(currPageNo + 1);
	}
});

function setPageNo(currPageNo, maxPageNo) {
	window.currPageNo = currPageNo;
	window.maxPageNo = maxPageNo;

	$('#pageNo').html(currPageNo);

	if (currPageNo <= 1)
		$('#prevBtn').css('display', 'none');
	else
		$('#prevBtn').css('display', '');

	if (currPageNo >= maxPageNo)
		$('#nextBtn').css('display', 'none');
	else
		$('#nextBtn').css('display', '');
}

$(document).on('click', '#my-checkbox', function() {
	// $("input[name=mycheck]:checkbox").attr("checked", true);

	if ($(this).is(':checked')) {
		$("input[name=mycheck]").prop("checked", true);
	} else {
		$("input[name=mycheck]").prop("checked", false);
	}
});

function loadStorageList(pageNo) {
	if (pageNo <= 0) pageNo = currPageNo;
	$.getJSON('../json/storage/list.do?pageNo=' + pageNo, 
    function(data){
		setPageNo(data.currPageNo, data.maxPageNo);
      var storages = data.storages;
      var totalSize = data.totalSize;
      
      //alert(totalSize);
      $('#totalResult').html(totalSize);
      
      require(['text!templates/storage-table.html'], function(html){
        var template = Handlebars.compile(html);
        $('#listDiv').html( template(data) );
        $('#storagePage').page('destroy').page();
      });
  
    });
}

function deleteStorage(sno) { // 체크된 함수파라미터를 넘길것
	// console.log(mycheck);
	$.getJSON('../json/storage/delete.do?sno=' + sno, function(data) {
		if (data.status == 'success') {
			loadStorageList(0);
		} else {
			console.log("deleteStorage Fail");
		}
	});
}

/*
 * $("allCheck").removeClass("ui-btn-icon-left");
 * $("allCheck").addClass("ui-btn-icon-right");
 */
