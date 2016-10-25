$(function() {
    $( "#letter" ).datepicker()
    $( "#letter" ).datepicker( "setDate", new Date() );
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
    // .done(function(result){
    //   console.log(result)
    //   result.forEach(function(item){
    //     insert_to_tabel(item)
    //   })
    // })
    // e.preventDefault();
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
           // data.redirect contains the string URL to redirect to
           window.location.href = data.redirect;
       }
       else {
           // data.form contains the HTML for the replacement form
           console.log(textstatus);
          //  $("#myform").replaceWith(data.form);
       }
    })

  })

});
