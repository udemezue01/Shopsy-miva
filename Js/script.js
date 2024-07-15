document.getElementById('menLink').addEventListener('click', function(event) {
    event.preventDefault();
    alert('Men link clicked');
    setTimeout(function() {
      window.location.href = './Pages/men.html';
    }, 100);
  });
  
  document.getElementById('womenLink').addEventListener('click', function(event) {
    event.preventDefault();
    alert('Women link clicked');
    setTimeout(function() {
      window.location.href = './Pages/women.html';
    }, 100);
  });
  
  document.getElementById('kidsLink').addEventListener('click', function(event) {
    event.preventDefault();
    alert('Kids link clicked');
    setTimeout(function() {
      window.location.href = './Pages/kids.html';
    }, 100);
  });
  
  document.addEventListener('DOMContentLoaded', function() {
    // Email validation function
    function validateEmail(email) {
      const re = /\S+@\S+\.\S+/;
      return re.test(email);
    }
  
    // Handle subscription form submission
    const subscribeBtn = document.getElementById('subscribeBtn');
    subscribeBtn.addEventListener('click', function(event) {
      event.preventDefault(); // Prevent form submission
      const emailInput = document.getElementById('footer-field').value;
      if (validateEmail(emailInput)) {
        alert('Subscription successful!');
        // Redirect to success page
        window.location.href = '../'; // Replace with your actual success page URL
      } else {
        alert('Please enter a valid email address.');
      }
    });
  });