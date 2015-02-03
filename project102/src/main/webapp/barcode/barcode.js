var currPageNo;
var maxPageNo;
var barcode;

$(function(){

  loadBarcodeList(1);
  
  $(document).on('click', '.barNo', function(){
    loadbarcode($(this).attr('data-barcodeNo'));// 오리지날 태그 말고 가공된 태그
  });
	
	
	// 패널 정의!
$("#left-panel").load("menu.html", function(){
    
    $( "#barcode" ).page("destroy").page();
  });
});

$('#addMoreBtn').click(function(event){
  if (currPageNo < maxPageNo) {
    loadBarcodeList(currPageNo + 1);
  }
});


function setPageNo(currPageNo, maxPageNo) {
  window.currPageNo = currPageNo;
  window.maxPageNo = maxPageNo;
  
  $('#pageNo').html(currPageNo);
}
	
function loadBarcodeList(pageNo) {
  
  if(pageNo <= 0) pageNo = currPageNo;
  
	$.getJSON('../json/barcode/list.do?pageNo=' + pageNo, 
    function(data){
	    console.log(">>>>>",data);
      setPageNo(data.currPageNo, data.maxPageNo);
      
      var barcodes = data.barcodes;
      console.log(barcodes);
      
     require(['text!templates/barcode-table.html'], function(html){
       var template = Handlebars.compile(html);
       if(pageNo==1) {
         $('#listDiv').html(template(data));
       } else {
         $('#listDiv').append(template(data));
       }
       $('#barcode').page('destroy').page();
     });
   
  });
}

function loadbarcode(barcodeNo) {
  $.getJSON('../json/barcode/view.do?barcodeNo=' + barcodeNo, 
      function(data){
    
    /*
    $('#no').val(data.barcode.barcodeNo);
    $('#name').val(data.barcode.pno);
    $('#quantity').val(data.barcode.pname);
    */
    
    barcode = data.barcode;
    console.log(barcode);
    alert(barcode.pname);
  });
}


