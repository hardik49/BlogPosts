$(document).ready(function () {
  $('#signup').submit(function (e) {
    const name = $('#name').val();
    const cpassword = $('#confirmPassword').val();
    const email = $('#email').val();
    const password = $('#password').val();
    $(".error").remove();

    if (name.length < 1 || name == '') {
      e.preventDefault();
      $('#name').after('<span class="error">Please enter your name</span>');
    }
    if (email.length < 1 || email == '') {
      e.preventDefault();
      $('#email').after('<span class="error">Please enter email</span>');
    } else {
      const regEx = /^[A-Za-z0-9][A-Za-z0-9._%+-]{0,15}@(?:[A-Za-z]{1,10}\.){1,20}[A-Za-z]{2,4}$/;
      const validEmail = regEx.test(email);
      if (!validEmail) {
        e.preventDefault();
        $('#email').after('<span class="error">Enter a valid email</span>');
      }
    }
    if (password.length < 8) {
      e.preventDefault();
      $('#password').after('<span class="error">Password must be at least 8 characters long</span>');
    }
    if (cpassword.length < 8) {
      e.preventDefault();
      $('#confirmPassword').after('<span class="error">Confirm Password must be at least 8 characters long</span>');
    } else if (password != cpassword) {
      e.preventDefault();
      $('#confirmPassword').after('<span class="error">Password and confirm password must match!</span>');
    }
  }),
    $('#login').submit(function (e) {
      const email = $('#email').val();
      const password = $('#password').val();
      $(".error").remove();

      if (email.length < 1 || email == '') {
        e.preventDefault();
        $('#email').after('<span class="error">Please enter email</span>');
      } else {
        const regEx = /^[A-Za-z0-9][A-Za-z0-9._%+-]{0,15}@(?:[A-Za-z]{1,10}\.){1,20}[A-Za-z]{2,4}$/;
        const validEmail = regEx.test(email);
        if (!validEmail) {
          e.preventDefault();
          $('#email').after('<span class="error">Enter a valid email</span>');
        }
      }
      if (password.length < 1 || password == '') {
        e.preventDefault();
        $('#password').after('<span class="error">Please enter password</span>');
      } else if (password.length < 2) {
        e.preventDefault();
        $('#password').after('<span class="error">Password can not be too short</span>');
      }
    }),
    $('#addPost').submit(function (e) {
      const postTitle = $('#postTitle').val();
      const postContent = $('#postContent').val();
      $(".error").remove();

      if (postTitle.length < 1 || postTitle == '') {
        e.preventDefault();
        $('#postTitle').after('<span class="error">Please enter post title</span>');
      }
      if (postContent.length < 1 || postContent == '') {
        e.preventDefault();
        $('#postContent').after('<span class="error">Please enter post content</span>');
      }
    })
})