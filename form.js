// Define closeModal and openModal functions globally or within the appropriate scope
function closeModal() {
    document.getElementById('submission-modal').classList.add('hidden');
}

function openModal() {
    document.getElementById('submission-modal').classList.remove('hidden');
}

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('multi-step-form');
    const steps = Array.from(document.querySelectorAll('.form-step'));
    const nextBtns = Array.from(document.querySelectorAll('.next-step'));
    const prevBtns = Array.from(document.querySelectorAll('.prev-step'));
    const summaryContent = document.getElementById('summary-content');
    const timeSlots = document.querySelectorAll('.time-slot');
    const selectedTimeSlotsInput = document.getElementById('selected-time-slots');

    let currentStep = 0;

    // Add event listener to the close button
    document.getElementById('close-modal-button').addEventListener('click', closeModal);

    function showStep(step) {
        steps.forEach((element, index) => {
            element.classList.toggle('hidden', index !== step);
        });
        updateNavigation(step);
    }

    function updateNavigation(step) {
        document.querySelectorAll('nav ol li').forEach((li, index) => {
            const stepCircle = li.querySelector('span:first-child');
            const stepLabel = li.querySelector('span:last-child');
            const connector = li.querySelector('div');
            
            if (index <= step) {
                stepCircle.classList.add('bg-white', 'text-white');
                stepCircle.classList.remove('bg-white', 'border', 'border-gray-300', 'text-gray-500');
                stepLabel.classList.add('text-indigo-600');
                stepLabel.classList.remove('text-gray-500');
                if (connector) connector.classList.add('bg-indigo-600');
            } else {
                stepCircle.classList.remove('bg-indigo-600', 'text-white');
                stepCircle.classList.add('bg-white', 'border', 'border-gray-300', 'text-gray-500');
                stepLabel.classList.remove('text-indigo-600');
                stepLabel.classList.add('text-gray-500');
                if (connector) connector.classList.remove('bg-indigo-600');
            }
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
            openModal(); // Open modal on form submit
            // Add additional logic here to handle the form data, e.g., sending it to the server
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
        const selectedServices = formData.getAll('service-type').join(', ');
        summaryContent.innerHTML = `
            <p><strong>Services:</strong> ${selectedServices}</p>
            <p><strong>Reg.nr:</strong> ${formData.get('Reg-nummer')}</p>
            <p><strong>Namn:</strong> ${formData.get('name')}</p>
            <p><strong>Email:</strong> ${formData.get('email')}</p>
            <p><strong>Mobilnummer:</strong> ${formData.get('mobile')}</p>
            <p><strong>Adress:</strong> ${formData.get('street-address')}</p>
            <p><strong>Ort:</strong> ${formData.get('city')}</p>
            <p><strong>Postnummer:</strong> ${formData.get('region')}</p>
            <p><strong>Datum:</strong> ${formData.get('date')}</p>
            <p><strong>Vald tid:</strong> ${formData.get('selected-time-slots')}</p>
        `;
    }

    // Time Slot Selection
    document.querySelectorAll('.time-slot').forEach(slot => {
        slot.addEventListener('click', () => {
            slot.classList.toggle('time-slot-selected');
            updateSelectedTimeSlots();
        });
    });
    
    function updateSelectedTimeSlots() {
        const selectedSlots = [];
        document.querySelectorAll('.time-slot-selected').forEach(slot => {
            selectedSlots.push(slot.getAttribute('data-time'));
        });
        document.getElementById('selected-time-slots').value = selectedSlots.join(',');
    }

    // Service Selection
    const serviceLabels = document.querySelectorAll('label.service-option');
    const serviceInputs = document.querySelectorAll('input[name="service-type"]');

    serviceInputs.forEach((input) => {
        input.addEventListener('change', function() {
            serviceLabels.forEach((label) => {
                if (label.querySelector('input').checked) {
                    label.classList.add('ring-2', 'ring-indigo-500', 'border-indigo-500');
                } else {
                    label.classList.remove('ring-2', 'ring-indigo-500', 'border-indigo-500');
                }
            });
        });
    });

    // Initial step display
    showStep(currentStep);
});