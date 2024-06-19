document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('multi-step-form');
  const steps = Array.from(document.querySelectorAll('.form-step'));
  const nextBtns = Array.from(document.querySelectorAll('.next-step'));
  const prevBtns = Array.from(document.querySelectorAll('.prev-step'));

  let currentStep = 0;

  function showStep(step) {
      steps.forEach((element, index) => {
          element.classList.toggle('hidden', index !== step);
      });
      updateNavigation(step);
  }

  function updateNavigation(step) {
      document.querySelectorAll('nav ol li').forEach((li, index) => {
          li.classList.toggle('active', index === step);
      });
  }

  nextBtns.forEach(button => {
      button.addEventListener('click', () => {
          if (validateStep(currentStep)) {
              if (currentStep < steps.length - 1) {
                  currentStep++;
                  showStep(currentStep);
              }
          }
      });
  });

  prevBtns.forEach(button => {
      button.addEventListener('click', () => {
          if (currentStep > 0) {
              currentStep--;
              showStep(currentStep);
          }
      });
  });

  form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (validateStep(currentStep)) {
          alert('Form submitted successfully!');
          // You can add additional logic here to handle the form data
      }
  });

  function validateStep(step) {
      let valid = true;
      const inputs = steps[step].querySelectorAll('input, select');
      inputs.forEach(input => {
          if (!input.checkValidity()) {
              valid = false;
              input.classList.add('border-red-500');
          } else {
              input.classList.remove('border-red-500');
          }
      });
      return valid;
  }

  // Initial step display
  showStep(currentStep);
});