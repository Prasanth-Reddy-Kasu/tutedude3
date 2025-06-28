$(document).ready(function () {
  // Email validation
  function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  // Password validation
  function isStrongPassword(password) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    return regex.test(password);
  }
  
  $('#validationForm').on('submit', function (e) {
    e.preventDefault();
    $('#message').hide().removeClass('error success').html('');

    const name = $('#name').val().trim();
    const email = $('#email').val().trim();
    const phone = $('#phone').val().trim();
    const password = $('#password').val().trim();
    const confirmPassword = $('#confirm-password').val().trim();

    let hasError = false;
    let errorText = '';

    if (!name || !email || !phone || !password || !confirmPassword) {
      errorText += 'All fields are required.<br>';
      hasError = true;
    }

    if (email && !isValidEmail(email)) {
      errorText += 'Please enter a valid email address.<br>';
      hasError = true;
    }

    if (phone && !/^\d{10}$/.test(phone)) {
      errorText += 'Phone number must be exactly 10 digits.<br>';
      hasError = true;
    }

    if (password && !isStrongPassword(password)) {
      errorText += 'Password must be at least 6 characters with uppercase, lowercase, and a number.<br>';
      hasError = true;
    }

    if (password && confirmPassword && password !== confirmPassword) {
      errorText += 'Passwords do not match.<br>';
      hasError = true;
    }

    if (hasError) {
      $('#message').addClass('error').html(errorText).slideDown();
    } else {
      $('#message').addClass('success').html('Form submitted successfully!').slideDown();
    }
  });
    // Show/hide password
  $('#togglePassword').on('change', function () {
    const type = this.checked ? 'text' : 'password';
    $('#password, #confirm-password').attr('type', type);
  });
});
