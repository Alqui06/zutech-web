// ESTRUCTURA DE CATEGORÍAS Y SUBCATEGORÍAS
const CATEGORIES = {
    equipos: {
        title: "Laptops & PCs",
        subs: {
            laptops_gamer: "Laptops Gamer",
            laptops_office: "Laptops Oficina / Estudio",
            pcs_escritorio: "PCs de Escritorio / Ensambladas",
        }
    },
    componentes: {
        title: "Componentes",
        subs: {
            cpu: "Procesadores",
            gpu: "Tarjetas de Video",
            mobo: "Placas Base",
            ram: "Memorias RAM",
            psu: "Fuentes de Poder",
            cooling: "Refrigeración & Ventiladores",
            case: "Cases"
        }
    },
    almacenamiento: {
        title: "Almacenamiento",
        subs: {
            ssd: "Discos SSD",
            hdd: "Discos Duros HDD",
            microsd: "Tarjetas MicroSD & SD",
            pendrives: "Pendrives"
        }
    },
    perifericos: {
        title: "Periféricos",
        subs: {
            monitores: "Monitores & Bases",
            audifonos: "Audífonos & Headsets",
            mouse: "Mouses & Mousepads",
            teclados: "Teclados (Mecánicos / Membrana)",
            microfonos: "Micrófonos & Webcams",
            cornetas: "Cornetas / Altavoces"
        }
    },
    redes: {
        title: "Redes & Conectividad",
        subs: {
            routers: "Routers",
            antenas: "Antenas Wi-Fi",
            cable_red: "Cable de Red (UTP, conectores, herramientas)"
        }
    },
    smart: {
        title: "Smart Home & Streaming",
        subs: {
            alexa: "Asistentes de Voz (Alexa)",
            streaming: "Streaming (Fire TV, Google TV, Roku)"
        }
    },
    accesorios: {
        title: "Accesorios & Cables",
        subs: {
            cables: "Cables (HDMI, DisplayPort, USB, Tipo C)",
            adaptadores: "Adaptadores, Converters & Hubs USB"
        }
    }
};

let currentCategory = 'todos';
let currentSubcategory = 'todas';
let carrito = []; // Arreglo para almacenar los productos seleccionados

const mainCatBtns = document.querySelectorAll('.cat-btn');
const subCatContainer = document.getElementById('subCategoriesContainer');
const catalogGrid = document.getElementById('catalogGrid');
const catalogSearch = document.getElementById('catalogSearch');
const resultsCount = document.getElementById('resultsCount');

// ARREGLO DE INVENTARIO ZUTECH (COMPLETO DEL 1 AL 47 CON MAPEO DE SUBCATEGORÍAS)
const inventarioProductos = [
    { id: 1, nombre: "Laptop HP Notebook 15 (Intel Core i3 / 8GB RAM / 256GB SSD)", categoria: "Laptops & PCs", filtro: "equipos", subfiltro: "laptops_office", precio: 450.00, imagen: "img/productos/WhatsApp Image 2026-07-22 at 10.02.52 AM.webp" },
    { id: 2, nombre: "PC de Escritorio Ensamblada (Torre Gamer RGB / Core i5)", categoria: "Laptops & PCs", filtro: "equipos", subfiltro: "pcs_escritorio", precio: 650.00, imagen: "img/productos/WhatsApp Image 2026-07-22 at 10.05.14 AM.webp" },
    { id: 3, nombre: "Teclado Mecánico Gamer ZuTech RGB Compacto 60%", categoria: "Periféricos", filtro: "perifericos", subfiltro: "teclados", precio: 65.00, imagen: "img/productos/WhatsApp Image 2026-07-22 at 10.06.36 AM.webp" },
    { id: 4, nombre: "Teclado Mecánico Redragon Kumara K552 Retroiluminado", categoria: "Periféricos", filtro: "perifericos", subfiltro: "teclados", precio: 85.00, imagen: "img/productos/WhatsApp Image 2026-07-22 at 10.07.33 AM.webp" },
    { id: 5, nombre: "Case de Escritorio ATX Torre Media (Negro Clásico)", categoria: "Componentes", filtro: "componentes", subfiltro: "case", precio: 45.00, imagen: "img/productos/WhatsApp Image 2026-07-22 at 10.09.20 AM.webp" },
    { id: 6, nombre: "Setup Completo de Oficina (PC Corporativa + Monitor + Periféricos)", categoria: "Laptops & PCs", filtro: "equipos", subfiltro: "pcs_escritorio", precio: 750.00, imagen: "img/productos/WhatsApp Image 2026-07-22 at 10.11.13 AM.webp" },
    { id: 7, nombre: "Setup Gamer Completo (Torre Alta Gama + Monitor 144Hz + Kit RGB)", categoria: "Laptops & PCs", filtro: "equipos", subfiltro: "laptops_gamer", precio: 2200.00, imagen: "img/productos/WhatsApp Image 2026-07-22 at 10.12.29 AM.webp" },
    { id: 8, nombre: "Procesador AMD Ryzen 5 5600G (6 Núcleos / Gráficos Radeon Vega)", categoria: "Componentes", filtro: "componentes", subfiltro: "cpu", precio: 180.00, imagen: "img/productos/WhatsApp Image 2026-07-22 at 10.15.02 AM.webp" },
    { id: 9, nombre: "Tarjeta de Video MSI NVIDIA GeForce RTX 3060 Ventus 2X 12GB", categoria: "Componentes", filtro: "componentes", subfiltro: "gpu", precio: 350.00, imagen: "img/productos/WhatsApp Image 2026-07-22 at 10.17.33 AM.webp" },
    { id: 10, nombre: "Placa Base ASUS TUF Gaming B550M-PLUS (AM4)", categoria: "Componentes", filtro: "componentes", subfiltro: "mobo", precio: 140.00, imagen: "img/productos/WhatsApp Image 2026-07-22 at 10.20.20 AM.webp" },
    { id: 11, nombre: "Memoria RAM Gamer Corsair Vengeance RGB PRO 16GB (2x8GB) 3200MHz", categoria: "Componentes", filtro: "componentes", subfiltro: "ram", precio: 75.00, imagen: "img/productos/WhatsApp Image 2026-07-22 at 10.25.54 AM.webp" },
    { id: 12, nombre: "Memoria RAM Sencilla Kingston Fury Beast 8GB DDR4 3200MHz", categoria: "Componentes", filtro: "componentes", subfiltro: "ram", precio: 35.00, imagen: "img/productos/WhatsApp Image 2026-07-22 at 10.27.19 AM.webp" },
    { id: 13, nombre: "Fuente de Poder EVGA 600W 80 Plus White Certificada", categoria: "Componentes", filtro: "componentes", subfiltro: "psu", precio: 70.00, imagen: "img/productos/WhatsApp Image 2026-07-22 at 10.30.21 AM.webp" },
    { id: 14, nombre: "Cooler Disipador CPU Cooler Master Hyper 212 LED Turbo", categoria: "Componentes", filtro: "componentes", subfiltro: "cooling", precio: 40.00, imagen: "img/productos/WhatsApp Image 2026-07-22 at 10.31.20 AM.webp" },
    { id: 15, nombre: "Case de PC Gamer NZXT H510 con Vidrio Templado y RGB", categoria: "Componentes", filtro: "componentes", subfiltro: "case", precio: 110.00, imagen: "img/productos/WhatsApp Image 2026-07-22 at 10.32.09 AM.webp" },
    { id: 16, nombre: "Case de PC de Escritorio ATX Color Negro Mate", categoria: "Componentes", filtro: "componentes", subfiltro: "case", precio: 45.00, imagen: "img/productos/WhatsApp Image 2026-07-22 at 10.32.57 AM.webp" },
    { id: 17, nombre: "Sistema de Refrigeración Líquida RGB Thermaltake Water 3.0", categoria: "Componentes", filtro: "componentes", subfiltro: "cooling", precio: 130.00, imagen: "img/productos/WhatsApp Image 2026-07-22 at 10.37.15 AM.webp" },
    { id: 18, nombre: "Monitor Gamer de Alto Rendimiento ASUS ROG Strix 27\" 170Hz", categoria: "Periféricos", filtro: "perifericos", subfiltro: "monitores", precio: 280.00, imagen: "img/productos/WhatsApp Image 2026-07-22 at 10.38.13 AM.webp" },
    { id: 19, nombre: "Monitor de Escritorio y Oficina LG 22\" IPS Full HD", categoria: "Periféricos", filtro: "perifericos", subfiltro: "monitores", precio: 120.00, imagen: "img/productos/WhatsApp Image 2026-07-22 at 10.38.43 AM.webp" },
    { id: 20, nombre: "Base de Brazo Ergonómico para Monitor 360 Grados", categoria: "Accesorios", filtro: "accesorios", subfiltro: "adaptadores", precio: 35.00, imagen: "img/productos/WhatsApp Image 2026-07-22 at 10.42.03 AM.webp" },
    { id: 21, nombre: "Audífonos Gamer HyperX Cloud Stinger con Micrófono", categoria: "Periféricos", filtro: "perifericos", subfiltro: "audifonos", precio: 70.00, imagen: "img/productos/WhatsApp Image 2026-07-22 at 10.44.08 AM.webp" },
    { id: 22, nombre: "Audífonos Convencionales con Cable Jack 3.5mm", categoria: "Periféricos", filtro: "perifericos", subfiltro: "audifonos", precio: 15.00, imagen: "img/productos/WhatsApp Image 2026-07-22 at 10.45.02 AM.webp" },
    { id: 23, nombre: "Mouse Gamer Logitech G203 Lightsync RGB ergonómico", categoria: "Periféricos", filtro: "perifericos", subfiltro: "mouse", precio: 60.00, imagen: "img/productos/WhatsApp Image 2026-07-22 at 10.45.56 AM.webp" },
    { id: 24, nombre: "Mouse Convencional Óptico USB de Escritorio", categoria: "Periféricos", filtro: "perifericos", subfiltro: "mouse", precio: 12.00, imagen: "img/productos/WhatsApp Image 2026-07-22 at 10.47.03 AM.webp" },
    { id: 25, nombre: "Mousepad Gamer Antideslizante con Bordes Cosidos", categoria: "Accesorios", filtro: "accesorios", subfiltro: "adaptadores", precio: 10.00, imagen: "img/productos/WhatsApp Image 2026-07-22 at 10.47.55 AM.webp" },
    { id: 26, nombre: "Teclado Mecánico Inalámbrico Keychron K2 RGB", categoria: "Periféricos", filtro: "perifericos", subfiltro: "teclados", precio: 90.00, imagen: "img/productos/WhatsApp Image 2026-07-22 at 10.48.56 AM.webp" },
    { id: 27, nombre: "Teclado de Membrana Multimedia Estándar USB", categoria: "Periféricos", filtro: "perifericos", subfiltro: "teclados", precio: 20.00, imagen: "img/productos/WhatsApp Image 2026-07-22 at 10.50.22 AM.webp" },
    { id: 28, nombre: "Micrófono de Alta Calidad USB Condensador HyperX QuadCast", categoria: "Periféricos", filtro: "perifericos", subfiltro: "microfonos", precio: 110.00, imagen: "img/productos/WhatsApp Image 2026-07-22 at 10.51.05 AM.webp" },
    { id: 29, nombre: "Webcam Logitech C920 HD Pro 1080p con Micrófono", categoria: "Periféricos", filtro: "perifericos", subfiltro: "microfonos", precio: 45.00, imagen: "img/productos/WhatsApp Image 2026-07-22 at 10.51.41 AM.webp" },
    { id: 30, nombre: "Cornetas / Altavoces Multimedia RGB para PC Setup", categoria: "Periféricos", filtro: "perifericos", subfiltro: "cornetas", precio: 25.00, imagen: "img/productos/WhatsApp Image 2026-07-22 at 10.52.22 AM.webp" },
    { id: 31, nombre: "Router Wi-Fi TP-Link Archer C6 Doble Banda Gigabit", categoria: "Redes & Conectividad", filtro: "redes", subfiltro: "routers", precio: 50.00, imagen: "img/productos/WhatsApp Image 2026-07-22 at 10.53.48 AM.webp" },
    { id: 32, nombre: "Antena Receptora Wi-Fi USB TP-Link Nano 150Mbps", categoria: "Redes & Conectividad", filtro: "redes", subfiltro: "antenas", precio: 15.00, imagen: "img/productos/WhatsApp Image 2026-07-22 at 10.54.44 AM.webp" },
    { id: 33, nombre: "Cable de Red Ethernet UTP Cat6 (10 metros ponchado)", categoria: "Redes & Conectividad", filtro: "redes", subfiltro: "cable_red", precio: 8.00, imagen: "img/productos/WhatsApp Image 2026-07-22 at 10.55.35 AM.webp" },
    { id: 34, nombre: "Pelacables y Crimpeadora Profesional de Red", categoria: "Redes & Conectividad", filtro: "redes", subfiltro: "cable_red", precio: 12.00, imagen: "img/productos/WhatsApp Image 2026-07-22 at 10.56.10 AM.webp" },
    { id: 35, nombre: "Asistente Inteligente Amazon Echo Dot 4ta Gen con Alexa", categoria: "Smart Home & Streaming", filtro: "smart", subfiltro: "alexa", precio: 45.00, imagen: "img/productos/WhatsApp Image 2026-07-22 at 10.57.03 AM.webp" },
    { id: 36, nombre: "Dispositivo Streaming Amazon Fire TV Stick 4K Ultra HD", categoria: "Smart Home & Streaming", filtro: "smart", subfiltro: "streaming", precio: 40.00, imagen: "img/productos/WhatsApp Image 2026-07-22 at 10.57.41 AM.webp" },
    { id: 37, nombre: "Disco Sólido SSD M.2 NVMe Kingston 500GB", categoria: "Almacenamiento", filtro: "almacenamiento", subfiltro: "ssd", precio: 55.00, imagen: "img/productos/WhatsApp Image 2026-07-22 at 10.58.46 AM.webp" },
    { id: 38, nombre: "Disco Sólido SSD SATA 2.5\" Crucial BX500 480GB", categoria: "Almacenamiento", filtro: "almacenamiento", subfiltro: "ssd", precio: 45.00, imagen: "img/productos/WhatsApp Image 2026-07-22 at 10.59.36 AM.webp" },
    { id: 39, nombre: "Disco Duro Mecánico HDD Seagate Barracuda 1TB", categoria: "Almacenamiento", filtro: "almacenamiento", subfiltro: "hdd", precio: 40.00, imagen: "img/productos/WhatsApp Image 2026-07-22 at 11.00.26 AM.webp" },
    { id: 40, nombre: "Memoria MicroSD SanDisk Ultra 64GB Clase 10", categoria: "Almacenamiento", filtro: "almacenamiento", subfiltro: "microsd", precio: 15.00, imagen: "img/productos/WhatsApp Image 2026-07-22 at 11.01.08 AM.webp" },
    { id: 41, nombre: "Pendrive Memoria USB Kingston 32GB 3.0", categoria: "Almacenamiento", filtro: "almacenamiento", subfiltro: "pendrives", precio: 10.00, imagen: "img/productos/WhatsApp Image 2026-07-22 at 11.01.39 AM.webp" },
    { id: 42, nombre: "Cable HDMI de Alta Velocidad 4K (1.8 Metros)", categoria: "Accesorios & Cables", filtro: "accesorios", subfiltro: "cables", precio: 8.00, imagen: "img/productos/WhatsApp Image 2026-07-22 at 11.03.01 AM.webp" },
    { id: 43, nombre: "Cable DisplayPort a DisplayPort 1.4 (2 Metros)", categoria: "Accesorios & Cables", filtro: "accesorios", subfiltro: "cables", precio: 12.00, imagen: "img/productos/WhatsApp Image 2026-07-22 at 11.04.39 AM.webp" },
    { id: 44, nombre: "Cable USB a USB (Conectores macho por ambos lados)", categoria: "Accesorios & Cables", filtro: "accesorios", subfiltro: "cables", precio: 5.00, imagen: "img/productos/WhatsApp Image 2026-07-22 at 11.05.05 AM.webp" },
    { id: 45, nombre: "Cable Cargador USB Tipo C Mallado de Alta Resistencia", categoria: "Accesorios & Cables", filtro: "accesorios", subfiltro: "cables", precio: 7.00, imagen: "img/productos/WhatsApp Image 2026-07-22 at 11.05.57 AM.webp" },
    { id: 46, nombre: "Adaptador Universal Multi-port y Conectores de Video", categoria: "Accesorios & Cables", filtro: "accesorios", subfiltro: "adaptadores", precio: 15.00, imagen: "img/productos/WhatsApp Image 2026-07-22 at 11.06.40 AM.webp" },
    { id: 47, nombre: "Laptop Gamer Avanzada de Alta Gama (RTX 4070 / Core i7)", categoria: "Laptops & PCs", filtro: "equipos", subfiltro: "laptops_gamer", precio: 1850.00, imagen: "img/productos/WhatsApp Image 2026-07-22 at 9.54.59 AM.webp" }
];

// LEER PARÁMETRO DE LA URL
function checkUrlParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const catParam = urlParams.get('cat');
    if (catParam && (CATEGORIES[catParam] || catParam === 'todos')) {
        selectCategory(catParam);
    } else {
        updateView();
    }
}

// DIBUJAR SUBCATEGORÍAS
function renderSubcategories(catKey) {
    if (catKey === 'todos' || !CATEGORIES[catKey]) {
        subCatContainer.style.display = 'none';
        subCatContainer.innerHTML = '';
        currentSubcategory = 'todas';
        return;
    }

    const subs = CATEGORIES[catKey].subs;
    let html = `<button class="subcat-btn active" data-sub="todas">Todas las subcategorías</button>`;
   
    for (const key in subs) {
        html += `<button class="subcat-btn" data-sub="${key}">${subs[key]}</button>`;
    }

    subCatContainer.innerHTML = html;
    subCatContainer.style.display = 'flex';

    document.querySelectorAll('.subcat-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.subcat-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentSubcategory = btn.getAttribute('data-sub');
            updateView();
        });
    });
}

// CAMBIAR DE CATEGORÍA
function selectCategory(catKey) {
    currentCategory = catKey;
    currentSubcategory = 'todas';

    mainCatBtns.forEach(btn => {
        if (btn.getAttribute('data-cat') === catKey) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    renderSubcategories(catKey);
    updateView();
}

// FUNCIÓN DE RENDERIZADO DE PRODUCTOS (PROPORCIONAL Y SIMÉTRICA)
function renderizarProductos(productos) {
    if (!catalogGrid) return;
   
    catalogGrid.innerHTML = "";
   
    if (resultsCount) {
        resultsCount.textContent = `Mostrando ${productos.length} producto${productos.length !== 1 ? 's' : ''}`;
    }

    if (productos.length === 0) {
        catalogGrid.innerHTML = `<p style="grid-column: 1 / -1; text-align: center; color: var(--text-muted); padding: 40px;">No se encontraron productos disponibles en esta sección.</p>`;
        return;
    }

    productos.forEach(producto => {
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("card");
       
        tarjeta.style.display = "flex";
        tarjeta.style.flexDirection = "column";
        tarjeta.style.justifyContent = "space-between";
        tarjeta.style.height = "100%";
       
        tarjeta.innerHTML = `
            <div>
                <div class="card-img-placeholder" style="overflow: hidden; padding: 0; height: 180px; background: #060a12; border-radius: 8px; margin-bottom: 15px; display: flex; align-items: center; justify-content: center;">
                    <img src="${producto.imagen}" alt="${producto.nombre}" style="width: 100%; height: 100%; object-fit: contain; padding: 8px;">
                </div>
                <span style="font-size: 0.75rem; color: var(--neon-blue); text-transform: uppercase; font-weight: 600; display: block; margin-bottom: 6px;">${producto.categoria}</span>
                <h3 style="font-size: 1.05rem; margin-bottom: 8px; color: #fff; line-height: 1.3;">${producto.nombre}</h3>
                <p style="color: var(--text-muted); font-size: 0.82rem; margin-bottom: 15px; line-height: 1.4;">Disponible para entrega inmediata en tienda y envíos en Maracaibo.</p>
            </div>
            <div class="card-footer" style="display: flex; justify-content: space-between; align-items: center; margin-top: auto; padding-top: 10px; border-top: 1px solid rgba(255,255,255,0.05);">
                <span class="price" style="font-size: 1.2rem; font-weight: 700; color: var(--neon-blue);">$${producto.precio.toFixed(2)}</span>
                <button onclick="agregarAlCarrito(${producto.id})" class="btn-card" style="background: var(--primary-blue); color: #fff; padding: 8px 16px; border-radius: 6px; font-size: 0.85rem; font-weight: 600; border: none; cursor: pointer; transition: 0.3s;">Agregar</button>
            </div>
        `;
       
        catalogGrid.appendChild(tarjeta);
    });
}

// ==========================================
// FUNCIONES BLINDADAS DEL CARRITO DE COMPRAS
// ==========================================

function toggleCartModal() {
    const modal = document.getElementById('cart-modal');
    if (!modal) return; // Evita el error si no encuentra la ventana

    // Soporta tanto la versión lateral (right) como la central (display)
    if (modal.style.right !== undefined && modal.style.right !== '') {
        if (modal.style.right === '0px') {
            modal.style.right = '-400px';
        } else {
            modal.style.right = '0px';
        }
    } else {
        if (modal.style.display === 'block') {
            modal.style.display = 'none';
        } else {
            modal.style.display = 'block';
        }
    }
}

// Escuchar el botón de cerrar si existe en el HTML
document.addEventListener('click', (e) => {
    if (e.target && e.target.classList.contains('close-cart')) {
        toggleCartModal();
    }
});

// Escuchar el botón de WhatsApp desde el carrito si existe
document.addEventListener('click', (e) => {
    if (e.target && (e.target.id === 'checkout-btn' || e.target.closest('#checkout-btn'))) {
        enviarCarritoWhatsApp();
    }
});

function agregarAlCarrito(idProducto) {
    const productoEncontrado = inventarioProductos.find(p => p.id === idProducto);
    if (!productoEncontrado) return;

    const index = carrito.findIndex(item => item.id === idProducto);
    if (index !== -1) {
        carrito[index].cantidad += 1;
    } else {
        carrito.push({ ...productoEncontrado, cantidad: 1 });
    }

    actualizarCarritoUI();

    const badge = document.getElementById('cart-badge') || document.querySelector('.cart-badge');
    if (badge) {
        badge.style.transform = 'scale(1.3)';
        setTimeout(() => badge.style.transform = 'scale(1)', 200);
    }
}

// Exponer la función globalmente para que los botones + y - funcionen en el HTML dinámico
window.cambiarCantidad = function(idProducto, cambio) {
    const index = carrito.findIndex(item => item.id === parseInt(idProducto) || item.id === idProducto);
    if (index !== -1) {
        carrito[index].cantidad += cambio;
        if (carrito[index].cantidad <= 0) {
            carrito.splice(index, 1);
        }
        actualizarCarritoUI();
    }
};

function actualizarCarritoUI() {
    // Soportar ambos nombres de contenedor por si usaste un HTML anterior
    const container = document.getElementById('cart-items-container') || document.getElementById('cart-items');
    const badge = document.getElementById('cart-badge') || document.querySelector('.cart-badge');
    const totalElement = document.getElementById('cart-total') || document.getElementById('cart-total-price');

    if (!container) return; // Si no encuentra el HTML del carrito, se detiene sin arrojar error

    let totalItems = 0;
    let precioTotal = 0;

    if (carrito.length === 0) {
        container.innerHTML = `<p style="text-align: center; color: var(--text-muted); margin-top: 50px;">Tu carrito está vacío.</p>`;
        if (badge) badge.textContent = '0';
        if (totalElement) totalElement.textContent = '$0.00';
        return;
    }

    let html = '';
    carrito.forEach(item => {
        totalItems += item.cantidad;
        precioTotal += item.precio * item.cantidad;

        html += `
            <div style="display: flex; align-items: center; justify-content: space-between; background: rgba(255,255,255,0.03); padding: 10px; margin-bottom: 10px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.05);">
                <div style="flex-grow: 1; padding-right: 8px;">
                    <h4 style="color: #fff; font-size: 0.9rem; margin-bottom: 2px; line-height: 1.2;">${item.nombre}</h4>
                    <span style="color: var(--neon-blue); font-size: 0.85rem; font-weight: bold;">$${item.precio.toFixed(2)} c/u</span>
                </div>
                <div style="display: flex; align-items: center; gap: 8px;">
                    <button onclick="cambiarCantidad(${item.id}, -1)" style="background: rgba(255,255,255,0.1); color: #fff; border: none; width: 25px; height: 25px; border-radius: 4px; cursor: pointer;">-</button>
                    <span style="color: #fff; font-weight: bold; font-size: 0.9rem;">${item.cantidad}</span>
                    <button onclick="cambiarCantidad(${item.id}, 1)" style="background: rgba(255,255,255,0.1); color: #fff; border: none; width: 25px; height: 25px; border-radius: 4px; cursor: pointer;">+</button>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
    if (badge) badge.textContent = totalItems;
    if (totalElement) {
        // Soporta si el ID ya trae el símbolo de dólar o no
        totalElement.textContent = totalElement.id === 'cart-total-price' ? precioTotal.toFixed(2) : `$${precioTotal.toFixed(2)}`;
    }
}

function enviarCarritoWhatsApp() {
    if (carrito.length === 0) {
        alert("Tu carrito está vacío. Agrega productos antes de consultar.");
        return;
    }

    let mensaje = "¡Hola ZuTech! 🛒 Me gustaría consultar la disponibilidad y comprar los siguientes productos de mi carrito:\n\n";
    let precioTotal = 0;

    carrito.forEach((item, index) => {
        let subtotal = item.precio * item.cantidad;
        precioTotal += subtotal;
        mensaje += `${index + 1}. *${item.nombre}* (Cant: ${item.cantidad}) - Subtotal: $${subtotal.toFixed(2)}\n`;
    });

    mensaje += `\n*Total Estimado: $${precioTotal.toFixed(2)}*\n\nQuedo atento a su respuesta. ¡Gracias!`;

    const urlWhatsApp = `https://wa.me/584146803313?text=${encodeURIComponent(mensaje)}`;
    window.open(urlWhatsApp, '_blank');
}

// ACTUALIZAR ESTADO DE LA VISTA SEGÚN FILTROS (CATEGORÍA + SUBCATEGORÍA + BUSCADOR)
function updateView() {
    let filtrados = inventarioProductos;

    // Filtrar por categoría principal si no es 'todos'
    if (currentCategory !== 'todos') {
        filtrados = filtrados.filter(producto => producto.filtro === currentCategory);
    }

    // Filtrar por subcategoría específica si no es 'todas'
    if (currentSubcategory !== 'todas') {
        filtrados = filtrados.filter(producto => producto.subfiltro === currentSubcategory);
    }

    // Filtrar por buscador de texto si hay algo escrito
    if (catalogSearch && catalogSearch.value.trim() !== "") {
        const termino = catalogSearch.value.toLowerCase();
        filtrados = filtrados.filter(producto =>
            producto.nombre.toLowerCase().includes(termino) ||
            producto.categoria.toLowerCase().includes(termino)
        );
    }

    renderizarProductos(filtrados);
}

// EVENTOS DE NAVEGACIÓN (BOTONES MADRE)
mainCatBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const cat = btn.getAttribute('data-cat');
        if (catalogSearch) catalogSearch.value = "";
        selectCategory(cat);
    });
});

// EVENTO DE BÚSQUEDA EN TIEMPO REAL
if (catalogSearch) {
    catalogSearch.addEventListener("keyup", (e) => {
        updateView();
    });
}

// INICIALIZAR AL CARGAR LA PÁGINA
document.addEventListener('DOMContentLoaded', () => {
    checkUrlParams();
   
    // Asignar el evento al botón flotante si existe
    const cartFloatBtn = document.getElementById('cart-float-btn') || document.getElementById('cart-btn');
    if (cartFloatBtn) {
        // Solo agrega el evento si no lo tiene directo en el HTML con onclick
        if (!cartFloatBtn.getAttribute('onclick')) {
            cartFloatBtn.addEventListener('click', toggleCartModal);
        }
    }
});
