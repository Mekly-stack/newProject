document.addEventListener('DOMContentLoaded', function() {
  const searchForm = document.getElementById('search-form');
  const bookingForm = document.getElementById('bookingForm');
  const notAvailable = document.getElementById('notAvailable');

  if (searchForm) {
    searchForm.addEventListener('submit', async function(event) {
      event.preventDefault();
      const address = document.getElementById('address').value.trim();

      if (!address) {
        alert('Please enter an address or city.');
        return;
      }

      try {
        const response = await fetch('http://localhost:3000/api/key');
        const data = await response.json();
        const apiKey = data.apiKey;

        geocodeAddress(apiKey, address);
      } catch (error) {
        console.error('Error fetching API key:', error);
      }
    });
  }

  async function geocodeAddress(apiKey, address) {
    try {
      const geocodeResponse = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`);
      const geocodeData = await geocodeResponse.json();

      if (geocodeData.status === 'OK' && geocodeData.results.length > 0) {
        const location = geocodeData.results[0].geometry.location;
        const components = geocodeData.results[0].address_components;
        const city = components.find(component => component.types.includes('locality')) || components.find(component => component.types.includes('postal_town'));

        if (city && city.long_name.toLowerCase() === 'stockholm') {
          window.location.href = 'booking.html';
        } else {
          checkForNearbyShops(location.lat, location.lng);
        }
      } else {
        alert('Geocode was not successful. Please check the address and try again.');
      }
    } catch (error) {
      console.error('Error geocoding address:', error);
    }
  }

  async function checkForNearbyShops(lat, lng) {
    try {
      const response = await fetch(`http://localhost:3000/api/repair-shops?lat=${lat}&lng=${lng}`);
      const data = await response.json();

      if (data.success && data.shops.length > 0) {
        bookingForm.classList.remove('hidden');
        notAvailable.classList.add('hidden');
        // Populate the booking form with data if needed
      } else {
        bookingForm.classList.add('hidden');
        notAvailable.classList.remove('hidden');
        alert('No repair shops available in your area.');
      }
    } catch (error) {
      console.error('Error checking for nearby shops:', error);
    }
  }
});