document.addEventListener('DOMContentLoaded', function() {
    // Handle search form submission
    const searchForm = document.getElementById('search-form');
    if (searchForm) {
      searchForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const address = document.getElementById('address').value;
        fetch(`/api/repair-shops?address=${encodeURIComponent(address)}`)
          .then(response => response.json())
          .then(data => {
            if (data.success && data.shop) {
              // Redirect to booking page with shop information
              window.location.href = `/booking.html?shopId=${data.shop.id}`;
            } else {
              alert('No repair shops available in your area.');
            }
          })
          .catch(error => console.error('Error:', error));
      });
    }
  
    // Handle form submission
    document.addEventListener('DOMContentLoaded', function() {
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
        
        // Initialize the first step
        showStep(currentStep);
    });
  
    // FAQ Toggle Functionality
    const faqItems = document.querySelectorAll('.faq-item h3');
    faqItems.forEach(item => {
      item.addEventListener('click', () => {
        const answer = item.nextElementSibling;
        if (answer.classList.contains('hidden')) {
          answer.classList.remove('hidden');
        } else {
          answer.classList.add('hidden');
        }
      });
    });
  });