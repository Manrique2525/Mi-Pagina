document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Form submission
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Here you would typically send the form data to a server
            // For demonstration, we'll just show an alert
            alert('¡Gracias por tu mensaje! Me pondré en contacto contigo pronto.');
            this.reset();
        });
    }
    
    // Animation on scroll for tech cards and project cards
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.tech-card, .project-card, .skill-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animated elements
    document.querySelectorAll('.tech-card, .project-card, .skill-item').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load
    
    // Animaciones para la sección hero
    function animateHeroSection() {
        // Animación para "Hola"
        const greeting = document.getElementById('greeting');
        if (greeting) {
            setTimeout(() => {
                greeting.style.opacity = '1';
                greeting.style.transform = 'translateY(0)';
            }, 500);
        }
        
        // Animación para "soy"
        const imText = document.getElementById('im-text');
        if (imText) {
            setTimeout(() => {
                imText.style.opacity = '1';
                imText.style.transform = 'translateY(0)';
            }, 1000);
        }
        
        // Animación letra por letra del nombre
        const nameLetters = document.querySelectorAll('.name-letter');
        nameLetters.forEach((letter, index) => {
            setTimeout(() => {
                letter.style.opacity = '1';
                letter.style.transform = 'translateY(0) rotate(0)';
                letter.style.transition = `all 0.3s ease ${index * 0.05}s`;
            }, 1500 + (index * 50));
        });
        
        // Animación del subtítulo
        const subtitle = document.querySelector('.animated-subtitle');
        if (subtitle) {
            setTimeout(() => {
                subtitle.style.opacity = '1';
                subtitle.style.transform = 'translateX(0)';
            }, 1500 + (nameLetters.length * 50) + 300);
        }
    }
    
    // Efecto de confeti para el botón de contacto en el hero
    const contactBtn = document.querySelector('.hero-content .btn');
    if (contactBtn) {
        contactBtn.addEventListener('click', (e) => {
            // Solo activar confeti si es el botón del hero
            if (e.target.closest('.hero-content')) {
                e.preventDefault();
                createConfetti();
                
                // Navegación suave
                const targetId = contactBtn.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    setTimeout(() => {
                        window.scrollTo({
                            top: targetElement.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }, 500);
                }
            }
        });
    }
    
    // Función para crear efecto de confeti
    function createConfetti() {
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
            confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }
    }
    
    // Aplicar efecto de onda a los títulos de sección
    function applyWaveEffect() {
        const sectionTitles = document.querySelectorAll('section h2');
        
        sectionTitles.forEach(title => {
            const text = title.innerText;
            title.innerHTML = '';
            
            for (let i = 0; i < text.length; i++) {
                const span = document.createElement('span');
                span.textContent = text[i];
                span.style.setProperty('--i', i);
                
                if (text[i] === ' ') {
                    span.innerHTML = '&nbsp;';
                }
                
                title.appendChild(span);
            }
        });
    }
    
    // Iniciar animaciones al cargar
    animateHeroSection();
    applyWaveEffect();
    
    // Efecto de máquina de escribir para elementos con clase typewriter
    const typewriterElements = document.querySelectorAll('.typewriter');
    typewriterElements.forEach((el, index) => {
        const text = el.textContent;
        el.textContent = '';
        el.style.borderRight = '3px solid var(--sky-blue-dark)';
        
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                el.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, Math.random() * 100 + 50);
            } else {
                el.style.borderRight = 'none';
            }
        }
        
        // Iniciar con un retraso diferente para cada elemento
        setTimeout(typeWriter, index * 500 + 1000);
    });
});

// Animar habilidades cuando se ven en el viewport
function animateSkills() {
    const skillCards = document.querySelectorAll('.skill-card');
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillProgress = entry.target.querySelector('.skill-progress');
                const percent = skillProgress.getAttribute('data-level');
                skillProgress.style.width = percent + '%';
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    skillCards.forEach(card => {
        observer.observe(card);
    });
}

// Llamar a la función cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', animateSkills);