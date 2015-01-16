var currPageNo;
var maxPageNo;

//$(document).ready(function(){});
$(function(){
  $('.header').load('../common/header.html');
  $('.footer').load('../common/footer.html');
  $('.form').load('form.html');
  
  loadProductList(1);
  
  $(document).on('click', '.data-row a', function(){
    loadProduct($(this).attr('data-no'));
  });
  
  $(document).on('click', '.my-delete-btn', function(){
    deleteProduct($(this).attr('data-no'))
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
  if (pageNo <= 0) pageNo = currPageNo;
  
	$.getJSON('../json/product/list.do?pageNo=' + pageNo, 
    function(data){
      setPageNo(data.currPageNo, data.maxPageNo);
      var products = data.products;
      
      require(['text!templates/product-table.html'], function(html){
        var template = Handlebars.compile(html);
        $('#listDiv').html( template(data) );
      });
    });
}



























