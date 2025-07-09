// Initialize Bootstrap Toast
const toastEl = document.getElementById('toast');
const toast = new bootstrap.Toast(toastEl, { delay: 5000 });

// DOM Elements
const step1 = document.getElementById('step1');
const step2 = document.getElementById('step2');
const bookingForm = document.getElementById('bookingForm');
const confirmation = document.getElementById('confirmation');
const checkAvailabilityBtn = document.getElementById('checkAvailabilityBtn');
const backToStep1Btn = document.getElementById('backToStep1');
const backToStep2Btn = document.getElementById('backToStep2');
const newBookingBtn = document.getElementById('newBookingBtn');
const appointmentForm = document.getElementById('appointmentForm');
const loadingSpinner = document.getElementById('loadingSpinner');
const timeSlotsContainer = document.getElementById('timeSlots');
const confirmationMessage = document.getElementById('confirmationMessage');

// Initialize empty salons object with the data from the HTML template
const salons = window.salonData || {};

// Update services dropdown when salon selection changes
document.getElementById('salonSelect').addEventListener('change', function() {
    const selectedSalonId = this.value;
    const servicesSelect = document.getElementById('serviceSelect');
    
    // Clear existing options
    servicesSelect.innerHTML = '';
    
    // Add new options based on selected salon
    if (salons[selectedSalonId] && salons[selectedSalonId].services) {
        salons[selectedSalonId].services.forEach(service => {
            const option = document.createElement('option');
            option.value = service;
            option.textContent = service;
            servicesSelect.appendChild(option);
        });
    }
});

// Check availability button click handler
checkAvailabilityBtn.addEventListener('click', async function() {
    const salonId = document.getElementById('salonSelect').value;
    const service = document.getElementById('serviceSelect').value;
    
    // Show loading spinner
    loadingSpinner.classList.remove('d-none');
    
    try {
        // Call backend to get available time slots
        const response = await fetch('/get_available_slots', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                salon_id: salonId,
                service: service
            })
        });
        
        const data = await response.json();
        
        if (data.status === 'success') {
            // Store selected salon and service in hidden fields
            document.getElementById('selectedSalon').value = salonId;
            document.getElementById('selectedService').value = service;
            
            // Display time slots
            displayTimeSlots(data.slots);
            
            // Move to step 2
            step1.classList.add('d-none');
            step2.classList.remove('d-none');
        } else {
            showToast('Error', 'Failed to fetch available time slots. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        showToast('Error', 'An error occurred while checking availability.');
    } finally {
        loadingSpinner.classList.add('d-none');
    }
});

// Display time slots in the UI
function displayTimeSlots(slots) {
    timeSlotsContainer.innerHTML = '';
    
    if (slots.length === 0) {
        timeSlotsContainer.innerHTML = '<div class="col-12">No available time slots found. Please try another service or check back later.</div>';
        return;
    }
    
    slots.forEach(slot => {
        const col = document.createElement('div');
        col.className = 'col-12 col-md-6 col-lg-4';
        
        const btn = document.createElement('button');
        btn.className = 'btn btn-outline-primary w-100 mb-2 time-slot-btn';
        btn.textContent = slot;
        btn.dataset.time = slot;
        
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            document.querySelectorAll('.time-slot-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Store selected time
            document.getElementById('selectedTime').value = this.dataset.time;
            
            // Move to booking form
            step2.classList.add('d-none');
            bookingForm.classList.remove('d-none');
        });
        
        col.appendChild(btn);
        timeSlotsContainer.appendChild(col);
    });
}

// Back to step 1
backToStep1Btn.addEventListener('click', function() {
    step2.classList.add('d-none');
    step1.classList.remove('d-none');
});

// Back to step 2
backToStep2Btn.addEventListener('click', function() {
    bookingForm.classList.add('d-none');
    step2.classList.remove('d-none');
});

// New booking
newBookingBtn.addEventListener('click', function() {
    confirmation.classList.add('d-none');
    step1.classList.remove('d-none');
    
    // Reset form
    appointmentForm.reset();
    document.querySelectorAll('.time-slot-btn').forEach(btn => {
        btn.classList.remove('active');
    });
});

// Form submission
appointmentForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = {
        salon_id: document.getElementById('selectedSalon').value,
        service: document.getElementById('selectedService').value,
        slot: document.getElementById('selectedTime').value,
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value
    };
    
    try {
        // Call backend to book appointment
        const response = await fetch('/book_appointment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        
        const data = await response.json();
        
        if (data.status === 'success') {
            // Show confirmation
            confirmationMessage.textContent = data.message;
            bookingForm.classList.add('d-none');
            confirmation.classList.remove('d-none');
        } else {
            showToast('Error', 'Failed to book appointment. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        showToast('Error', 'An error occurred while booking the appointment.');
    }
});

// Show toast notification
function showToast(title, message) {
    document.getElementById('toast-title').textContent = title;
    document.getElementById('toast-message').textContent = message;
    toast.show();
}
