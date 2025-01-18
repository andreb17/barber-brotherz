// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Reveal animations on scroll
const revealElements = document.querySelectorAll('.service-card, .gallery-card');

const revealOnScroll = () => {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Initialize elements with opacity 0
revealElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

// Add scroll event listener
window.addEventListener('scroll', revealOnScroll);

// Call once on load to check for elements already in view
window.addEventListener('load', revealOnScroll);

// Navbar background change on scroll
const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
    } else {
        nav.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
    }
});

// Booking Calendar Functionality
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('bookingModal');
    const closeModalBtn = document.querySelector('.close-modal');
    const calendarEl = document.getElementById('calendar');
    const selectedTimeEl = document.getElementById('selectedTime');
    const confirmBtn = document.getElementById('confirmBooking');
    const bookNowBtn = document.querySelector('.cta-button');
    let selectedDate = null;

    // Initialize FullCalendar
    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'timeGridWeek',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'timeGridWeek,timeGridDay'
        },
        slotMinTime: '09:00:00',
        slotMaxTime: '20:00:00',
        slotDuration: '00:30:00',
        weekends: true,
        selectable: true,
        selectConstraint: 'businessHours',
        select: function(info) {
            const now = new Date();
            if (info.start < now) {
                alert('Please select a future date and time');
                calendar.unselect();
                return;
            }
            selectedDate = info.start;
            selectedTimeEl.textContent = info.start.toLocaleString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric'
            });
        },
        businessHours: {
            daysOfWeek: [1, 2, 3, 4, 5, 6],
            startTime: '09:00',
            endTime: '20:00'
        },
        selectConstraint: 'businessHours',
        eventOverlap: false,
        selectOverlap: false
    });

    calendar.render();

    // Open modal when Book Now is clicked
    bookNowBtn.addEventListener('click', function(e) {
        e.preventDefault();
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });

    // Close modal when X is clicked
    closeModalBtn.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Handle booking confirmation
    confirmBtn.addEventListener('click', function() {
        if (!selectedDate) {
            alert('Please select a time for your appointment');
            return;
        }

        const clientPhone = document.getElementById('clientPhone').value;
        if (!clientPhone || !/^\d{10}$/.test(clientPhone.replace(/\D/g, ''))) {
            alert('Please enter a valid 10-digit phone number');
            return;
        }

        const selectedServices = Array.from(
            document.querySelectorAll('input[name="service"]:checked')
        ).map(checkbox => checkbox.value);

        if (selectedServices.length === 0) {
            alert('Please select at least one service');
            return;
        }

        const formattedDate = selectedDate.toLocaleString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
        });

        const totalPrice = calculateTotalPrice(selectedServices);
        const confirmationMessage = 
            `Confirm booking for ${formattedDate}\n` +
            `Services: ${selectedServices.join(', ')}\n` +
            `Total: $${totalPrice}`;
        
        if (confirm(confirmationMessage)) {
            // Send SMS to barber (Dre)
            const smsBody = encodeURIComponent(
                `New Appointment!\n` +
                `Date: ${formattedDate}\n` +
                `Services: ${selectedServices.join(', ')}\n` +
                `Total: $${totalPrice}\n` +
                `Client Phone: ${clientPhone}`
            );
            
            window.open(`sms:4043091971&body=${smsBody}`, '_blank');

            // Show confirmation to client
            alert('Appointment confirmed! Dre will receive your booking details and send you a confirmation shortly.');
            
            // Reset the form
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            selectedDate = null;
            selectedTimeEl.textContent = '';
            document.getElementById('clientPhone').value = '';
            document.querySelectorAll('input[name="service"]').forEach(checkbox => checkbox.checked = false);
        }
    });

    function calculateTotalPrice(services) {
        const prices = {
            'Fade': 45,
            'Beard Trim': 35,
            'Full Shave': 40,
            'Kid\'s Cut': 30,
            'Beard & Fade Combo': 70
        };
        return services.reduce((total, service) => total + (prices[service] || 0), 0);
    }

    // Prevent form submission
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
        });
    });
});
