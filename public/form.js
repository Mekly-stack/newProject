document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('multi-step-form');
    const steps = Array.from(document.querySelectorAll('.form-step'));
    const nextBtns = Array.from(document.querySelectorAll('.next-step'));
    const prevBtns = Array.from(document.querySelectorAll('.prev-step'));
    const summaryContent = document.getElementById('summary-content');

    let currentStep = 0;

    function showStep(step) {
        steps.forEach((element, index) => {
            element.classList.toggle('hidden', index !== step);
        });
        updateNavigation(step);
    }

    function updateNavigation(step) {
        document.querySelectorAll('nav ol li').forEach((li, index) => {
            li.classList.toggle('bg-indigo-600', index === step);
            li.classList.toggle('text-white', index === step);
        });
    }

    nextBtns.forEach(button => {
        button.addEventListener('click', () => {
            if (validateStep(currentStep)) {
                if (currentStep < steps.length - 1) {
                    currentStep++;
                    if (currentStep === steps.length - 1) {
                        generateSummary();
                    }
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
            // Add additional logic here to handle the form data
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

    function generateSummary() {
        const formData = new FormData(form);
        summaryContent.innerHTML = `
            <p><strong>Service:</strong> ${formData.get('service-type')}</p>
            <p><strong>Reg.nr:</strong> ${formData.get('Reg-nummer')}</p>
            <p><strong>Namn:</strong> ${formData.get('name')}</p>
            <p><strong>Email:</strong> ${formData.get('email')}</p>
            <p><strong>Mobilnummer:</strong> ${formData.get('mobile')}</p>
            <p><strong>Adress:</strong> ${formData.get('street-address')}</p>
            <p><strong>Ort:</strong> ${formData.get('city')}</p>
            <p><strong>Postnummer:</strong> ${formData.get('region')}</p>
            <p><strong>Datum:</strong> ${formData.get('date')}</p>
            <p><strong>Valda tidsslotter:</strong> ${formData.get('selected-time-slots')}</p>
        `;
    }

    // Time Slot Selection
    const timeSlots = document.querySelectorAll('.time-slot');
    const selectedTimeSlotsInput = document.getElementById('selected-time-slots');

    timeSlots.forEach(slot => {
        slot.addEventListener('click', function() {
            this.classList.toggle('bg-indigo-600');
            this.classList.toggle('text-white');

            updateSelectedTimeSlots();
        });
    });

    function updateSelectedTimeSlots() {
        const selectedSlots = Array.from(timeSlots)
            .filter(slot => slot.classList.contains('bg-indigo-600'))
            .map(slot => slot.getAttribute('data-time'));

        selectedTimeSlotsInput.value = selectedSlots.join(',');
    }

    // Initial step display
    showStep(currentStep);
});