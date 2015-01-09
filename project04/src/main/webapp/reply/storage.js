var currPageNo;
var maxPageNo;


//$(document).ready(function(){});
$(function(){
	$('.header').load('../common/header.html');
	$('.footer').load('../common/footer.html');

	loadProductList(1);
	
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



$('#prevBtn').click(function(event){
	if (currPageNo > 1) {
	  loadProductList(currPageNo - 1);
	}
});

$('#nextBtn').click(function(event){
	if (currPageNo < maxPageNo) {
	  loadProductList(currPageNo + 1);
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
	
function loadProductList(pageNo) {
  if(pageNo <= 0) pageNo = currPageNo;
  
	$.getJSON('../json/storage/list.do?pageNo=' + pageNo, 
    function(data){
      setPageNo(data.currPageNo, data.maxPageNo);
      var storages = data.storages;
      
     require(['text!templates/storage-table.html'], function(html){
       var template = Handlebars.compile(html);
       $('#listDiv').html(template(data));
     });
   
  });
}

