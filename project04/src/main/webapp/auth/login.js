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
            location.href = '/project04/user/home.html';
          } else {
            alert('로그인 아이디 또는 암호가 맞지 않습니다.');
            $('#pwd').val('');
          }
        }
        , 'json');
  });
});





