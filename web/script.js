document.getElementById('feedback-form').addEventListener('submit', function(event) {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;
  
  if (validateEmail(email) && name && message) {
      alert(`Спасибо за ваше сообщение, ${name}! Мы свяжемся с вами по электронной почте: ${email}`);
      document.getElementById('feedback-form').reset();
      $('#contactModal').modal('hide');
  } else {
      alert('Пожалуйста, заполните все поля формы корректно.');
  }
});

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

function initMap() {
  const location = { lat: -25.344, lng: 131.036 };
  const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 4,
      center: location
  });
  const marker = new google.maps.Marker({
      position: location,
      map: map
  });
}
