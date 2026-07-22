/* ==========================================
   1. EFECTO DE TEXTO CAMBIANTE (TYPEWRITER)
   ========================================== */
const words = ["PCs Ensambladas", "Hardware", "PC Gamers", "Servicio Técnico", "Mantenimiento"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function runTypewriter() {
    const targetElement = document.getElementById("changing-text") || document.getElementById("typewriter");
    if (!targetElement) return;

    const currentWord = words[wordIndex];

    if (isDeleting) {
        targetElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        targetElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 40 : 90;

    if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 2000; // Pausa cuando termina de escribir la palabra
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 350; // Pausa antes de la siguiente palabra
    }

    setTimeout(runTypewriter, typeSpeed);
}

/* ==========================================
   2. MAPA MARACAIBO (LEAFLET)
   ========================================== */
function initMap() {
    const mapElement = document.getElementById('map');
    if (!mapElement) return;

    const lat = 10.6433;
    const lng = -71.6144;
    const map = L.map('map').setView([lat, lng], 16);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap'
    }).addTo(map);

    L.marker([lat, lng]).addTo(map)
        .bindPopup("<b>ZuTech</b><br>C.C. Gran Bazar, Pasillo 5")
        .openPopup();
}

/* ==========================================
   3. MENÚ HAMBURGUESA MÓVIL
   ========================================== */
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    if (!menuToggle || !navLinks) return;

    // Abrir / Cerrar al pulsar el botón hamburguesa
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        navLinks.classList.toggle('active');

        const icon = menuToggle.querySelector('i');
        if (icon) {
            icon.className = navLinks.classList.contains('active') ? 'fas fa-xmark' : 'fas fa-bars';
        }
    });

    // Cerrar el menú al presionar un enlace interno
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            if (icon) icon.className = 'fas fa-bars';
        });
    });

    // Cerrar si hacen clic fuera del menú desplegable
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
            navLinks.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            if (icon) icon.className = 'fas fa-bars';
        }
    });
}

/* ==========================================
   4. MARCAR ENLACE ACTIVO EN NAVBAR AL SCROLLEAR
   ========================================== */
function initScrollSpy() {
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links a');
        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (currentSection && link.getAttribute('href').includes(currentSection)) {
                link.classList.add('active');
            }
        });
    });
}

/* ==========================================
   5. SLIDER TECH (GLITCH + SCANNER LÁSER)
   ========================================== */
function initHeroSlider() {
    const sliderContainer = document.querySelector('.hero-slider');
    const images = document.querySelectorAll('.hero-slider .hero-3d-img');
    if (!sliderContainer || images.length <= 1) return;

    let currentIndex = 0;

    setInterval(() => {
        const currentImg = images[currentIndex];
        
        // 1. Aplica efecto Glitch a la imagen que sale
        currentImg.classList.add('glitch-out');
        
        // 2. Activa el escáner láser neón
        sliderContainer.classList.add('scanning');

        setTimeout(() => {
            // Quita las clases a la imagen anterior
            currentImg.classList.remove('active', 'glitch-out');

            // Pasa a la siguiente imagen
            currentIndex = (currentIndex + 1) % images.length;
            const nextImg = images[currentIndex];

            // 3. Enciende la nueva imagen
            nextImg.classList.add('active');
        }, 350); // Tiempo del glitch

        // Desactiva el láser después del escaneo
        setTimeout(() => {
            sliderContainer.classList.remove('scanning');
        }, 800);

    }, 3800); // Transición cada 3.8 segundos
}

/* ==========================================
   INICIALIZADOR UNIFICADO
   ========================================== */
document.addEventListener('DOMContentLoaded', () => {
    runTypewriter();
    initMap();
    initMobileMenu();
    initScrollSpy();
    initHeroSlider();
    initTiltEffect(); // <-- ¡AQUÍ ESTÁ LA LLAMADA QUE FALTABA!
});

/* ==========================================
6. EFECTO 3D EN TARJETAS (VANILLA TILT)
   ========================================== */
function initTiltEffect() {
    // Aplica el efecto a las tarjetas de categorías y servicios
    VanillaTilt.init(document.querySelectorAll(".cat-card, .service-box"), {
        max: 12, // Ángulo máximo de inclinación
        speed: 400, // Velocidad de la transición
        glare: true, // Activa el reflejo tipo cristal
        "max-glare": 0.25, // Opacidad del reflejo (azul tecnológico)
    });
}