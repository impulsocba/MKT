document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('toggle');
    });

    // Close menu when clicking a link
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('toggle');
        });
    });

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding = '10px 0';
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        } else {
            navbar.style.padding = '20px 0';
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        }
    });

    // Scroll Animations (Intersection Observer)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elements to animate
    const animateElements = document.querySelectorAll('.service-card, .portfolio-item, .contact-info, .contact-form');

    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });

    // Handle form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;

            // Disable button and show loading state
            submitButton.disabled = true;
            submitButton.textContent = 'Enviando...';

            const formData = new FormData(contactForm);

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    submitButton.textContent = '¡Enviado!';
                    contactForm.reset();

                    setTimeout(() => {
                        submitButton.textContent = originalText;
                        submitButton.disabled = false;
                    }, 3000);
                } else {
                    const data = await response.json();
                    if (Object.hasOwn(data, 'errors')) {
                        throw new Error(data["errors"].map(error => error["message"]).join(", "));
                    } else {
                        throw new Error('Error al enviar');
                    }
                }
            } catch (error) {
                console.error('Error:', error);
                submitButton.textContent = 'Error - Intenta de nuevo';

                // Optional: Alert the user of the specific error
                // alert(error.message);

                setTimeout(() => {
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                }, 3000);
            }
        });
    }

    // Handle portfolio uploads
    const portfolioUploads = document.querySelectorAll('.portfolio-upload');
    portfolioUploads.forEach(input => {
        input.addEventListener('change', function (e) {
            const file = e.target.files[0];
            if (!file) return;

            const portfolioImage = this.parentElement.querySelector('.portfolio-image');
            const img = portfolioImage.querySelector('.portfolio-img');
            const video = portfolioImage.querySelector('.portfolio-video');
            const icon = portfolioImage.querySelector('.portfolio-icon');
            const uploadBtn = portfolioImage.querySelector('.upload-btn');

            const reader = new FileReader();

            reader.onload = function (event) {
                if (file.type.startsWith('image/')) {
                    img.src = event.target.result;
                    img.style.display = 'block';
                    video.style.display = 'none';
                } else if (file.type.startsWith('video/')) {
                    video.src = event.target.result;
                    video.style.display = 'block';
                    img.style.display = 'none';
                }
                icon.style.display = 'none';
                uploadBtn.style.display = 'none';
            };

            reader.readAsDataURL(file);
        });
    });
    // Modal Logic
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImage");
    const closeBtn = document.getElementsByClassName("close")[0];

    document.querySelectorAll('.portfolio-img').forEach(img => {
        img.addEventListener('click', function () {
            modal.style.display = "block";
            modalImg.src = this.src;
        });
    });

    if (closeBtn) {
        closeBtn.onclick = function () {
            modal.style.display = "none";
        }
    }

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});
