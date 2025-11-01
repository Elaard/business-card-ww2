// ============================================
// MINIMAL JAVASCRIPT - V2
// Simple, functional, no unnecessary features
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    initSmoothScroll();
    initContactForm();
});

// ============================================
// SMOOTH SCROLL
// ============================================

function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            if (href === '#') {
                e.preventDefault();
                return;
            }

            const target = document.querySelector(href);

            if (target) {
                e.preventDefault();
                const headerHeight = 80;
                const targetPosition = target.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// CONTACT FORM
// ============================================

function initContactForm() {
    const form = document.getElementById('contactForm');

    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            message: document.getElementById('message').value
        };

        // Basic validation
        if (!formData.name || !formData.email || !formData.message) {
            showMessage('Proszę wypełnić wszystkie wymagane pola.', 'error');
            return;
        }

        if (!isValidEmail(formData.email)) {
            showMessage('Podaj poprawny adres email.', 'error');
            return;
        }

        // In production, send to server
        // For now, just show success message
        console.log('Form data:', formData);
        showMessage('Dziękuję za wiadomość. Odpiszę w ciągu 24h.', 'success');
        form.reset();

        // Actual implementation would be:
        // sendFormData(formData);
    });
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showMessage(message, type) {
    // Remove existing message
    const existing = document.querySelector('.form-message');
    if (existing) {
        existing.remove();
    }

    // Create message element
    const messageEl = document.createElement('div');
    messageEl.className = `form-message form-message-${type}`;
    messageEl.textContent = message;

    // Style
    messageEl.style.cssText = `
        margin-top: 1rem;
        padding: 1rem;
        border-radius: 3px;
        font-size: 0.9375rem;
        ${type === 'success'
            ? 'background-color: #f0fdf4; color: #166534; border: 1px solid #bbf7d0;'
            : 'background-color: #fef2f2; color: #991b1b; border: 1px solid #fecaca;'}
    `;

    // Add to form
    const form = document.getElementById('contactForm');
    form.appendChild(messageEl);

    // Remove after 5 seconds
    setTimeout(() => {
        messageEl.style.opacity = '0';
        messageEl.style.transition = 'opacity 0.3s';
        setTimeout(() => messageEl.remove(), 300);
    }, 5000);
}

// ============================================
// EXAMPLE: Send form to server
// ============================================

/*
async function sendFormData(data) {
    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            showMessage('Dziękuję za wiadomość. Odpiszę w ciągu 24h.', 'success');
            document.getElementById('contactForm').reset();
        } else {
            throw new Error('Server error');
        }
    } catch (error) {
        console.error('Error:', error);
        showMessage('Coś poszło nie tak. Spróbuj ponownie lub napisz bezpośrednio na email.', 'error');
    }
}
*/

// ============================================
// UTILITY
// ============================================

// Add active class to nav links on scroll (optional)
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});
