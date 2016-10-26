$(function() {
    
    $('#login-form-link').click(function(e) {
		$("#login-form").delay(100).fadeIn(100);
 		$("#register-form").fadeOut(100);
		$('#register-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});
	$('#register-form-link').click(function(e) {
		$("#register-form").delay(100).fadeIn(100);
 		$("#login-form").fadeOut(100);
		$('#login-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});

  $('#register-submit').click(function (e) {
    e.preventDefault();
    console.log($('#email-register').val());
    $.ajax({
      type: 'POST',
      url: '/register',
      data: {email: $('#email-register').val(), password: $('#password-register').val()},
      dataType: 'json'
    })
    .done(function(data,textstatus){
      if (data.redirect) {
           window.location.href = data.redirect;
       }
       else {
           console.log(textstatus);
       }
    })
  })

  $('#login-submit').click(function (e) {
    e.preventDefault();
    $.ajax({
      type: 'POST',
      url: '/login',
      data: {email: $('#email').val(), password: $('#password').val()}

    })
    .done(function(data,textstatus){
      if (data.redirect) {
           window.location.href = data.redirect;
       }
       else {
           console.log(textstatus);
       }
    })

  })

});
