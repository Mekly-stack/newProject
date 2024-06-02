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
    }
  
    nextBtns.forEach(button => {
      button.addEventListener('click', () => {
        if (currentStep < steps.length - 1) {
          currentStep++;
          showStep(currentStep);
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
      alert('Form submitted successfully!');
    });
  
    // Initial step display
    showStep(currentStep);
  });