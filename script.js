$(document).ready(function () {
  // Email validation
  function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  // Password validation: 8–15 characters, 1 uppercase, 1 lowercase, 1 digit, 1 special character
  function isStrongPassword(password) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,15}$/;
    return regex.test(password);
  }

  // Allow only digits in phone field
  $('#phone').on('input', function () {
    this.value = this.value.replace(/\D/g, ''); // Replace non-digits with empty
  });

  // Form submission
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
      errorText += 'Password must be 8–15 characters with uppercase, lowercase, digit, and special character.<br>';
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
