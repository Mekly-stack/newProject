document.addEventListener('DOMContentLoaded', function() {
  const searchForm = document.getElementById('search-form');
  if (searchForm) {
      searchForm.addEventListener('submit', function(event) {
          event.preventDefault();
          const address = document.getElementById('address').value;
          fetch(`/api/repair-shops?address=${encodeURIComponent(address)}`)
              .then(response => response.json())
              .then(data => {
                  if (data.success && data.shop) {
                      window.location.href = `/booking.html?shopId=${data.shop.id}`;
                  } else {
                      alert('No repair shops available in your area.');
                  }
              })
              .catch(error => console.error('Error:', error));
      });
  }

  const steps = document.querySelectorAll('.form-step');
  const nextStepButtons = document.querySelectorAll('.next-step');
  const prevStepButtons = document.querySelectorAll('.prev-step');
  let currentStep = 0;
  
  function showStep(step) {
      steps.forEach((stepElement, index) => {
          stepElement.classList.toggle('active', index === step);
      });
      updateButtons(step);
  }
  
  function updateButtons(step) {
      if (step === 0) {
          prevStepButtons.forEach(button => button.classList.add('hidden'));
      } else {
          prevStepButtons.forEach(button => button.classList.remove('hidden'));
      }
      if (step === steps.length - 1) {
          nextStepButtons.forEach(button => button.classList.add('hidden'));
      } else {
          nextStepButtons.forEach(button => button.classList.remove('hidden'));
      }
  }
  
  nextStepButtons.forEach(button => {
      button.addEventListener('click', () => {
          if (currentStep < steps.length - 1) {
              currentStep++;
              showStep(currentStep);
          }
      });
  });
  
  prevStepButtons.forEach(button => {
      button.addEventListener('click', () => {
          if (currentStep > 0) {
              currentStep--;
              showStep(currentStep);
          }
      });
  });
  
  showStep(currentStep);

  let map;
  let geocoder;

  async function initMap() {
      const response = await fetch('/api/key');
      const data = await response.json();
      const apiKey = data.apiKey;

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=loadMap`;
      script.async = true;
      document.head.appendChild(script);
  }

  function loadMap() {
      map = new google.maps.Map(document.getElementById("map"), {
          center: { lat: 59.3293, lng: 18.0686 },
          zoom: 10,
      });
      geocoder = new google.maps.Geocoder();
  }

  function checkLocation() {
      const locationInput = document.getElementById('locationInput').value.toLowerCase().trim();
      const bookingForm = document.getElementById('bookingForm');
      const notAvailable = document.getElementById('notAvailable');

      if (locationInput === 'stockholm') {
          bookingForm.classList.remove('hidden');
          notAvailable.classList.add('hidden');
          geocodeAddress('Stockholm');
      } else {
          bookingForm.classList.add('hidden');
          notAvailable.classList.remove('hidden');
          geocodeAddress(locationInput);
      }
  }

  function geocodeAddress(address) {
      geocoder.geocode({ address: address }, (results, status) => {
          if (status === 'OK') {
              map.setCenter(results[0].geometry.location);
              new google.maps.Marker({
                  map: map,
                  position: results[0].geometry.location,
              });
          } else {
              alert('Geocode was not successful for the following reason: ' + status);
          }
      });
  }

  initMap();

  const faqItems = document.querySelectorAll('.faq-item h3');
  faqItems.forEach(item => {
      item.addEventListener('click', () => {
          const answer = item.nextElementSibling;
          answer.classList.toggle('hidden');
      });
  });
});