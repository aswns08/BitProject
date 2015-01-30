$(function(){
  /*$('.footer').load('../common/footer.html');*/
  
  $('#btnLogin').click(function(event){
	  /*console.log($('#email').val());*/
    $.post('../json/auth/login.do'
        , {
          email : $('#email').val(),
          pwd : $('#pwd').val(),
          save : $('#save').is(':checked')
        }
        , function(data){
          if (data.status == 'success') {
            location.href = '../user/home.html';
          } else {
            alert('로그인 아이디 또는 암호가 맞지 않습니다.');
            $('#pwd').val('');
          }
        }
        , 'json');
  });
  
  $("#left-panel").load("../auth/menu.html", function(){    
	    $( "#login" ).page("destroy").page();
  });
  
  $(document).on("pageinit", "#login", function() {
		var $page = $(this);
		$page.on("swiperight", function(e) {
			if ($page.jqmData("panel") !== "open") {
				if (e.type === "swiperight") {
					$("#left-panel").load("menu.html");
					$page.find("#left-panel").panel("open");
				}
			}
		});
	});
  
});





