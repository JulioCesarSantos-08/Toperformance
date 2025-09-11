// Importar Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBA_i9O3vXzFn2rIKY4XQzll2fLvmD-u3A",
  authDomain: "toperformance-50d5a.firebaseapp.com",
  databaseURL: "https://toperformance-50d5a-default-rtdb.firebaseio.com",
  projectId: "toperformance-50d5a",
  storageBucket: "toperformance-50d5a.firebasestorage.app",
  messagingSenderId: "1020165964748",
  appId: "1:1020165964748:web:f05155f982eb4f2eaf9369"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Referencias a los contenedores
const servicesContainer = document.getElementById("services-container");
const aboutContainer = document.getElementById("about-container");
const contactContainer = document.getElementById("contact-container");

// Cargar datos de Firebase en tiempo real
function loadContent(path, container) {
  const refPath = ref(db, path);
  onValue(refPath, (snapshot) => {
    container.innerHTML = "";
    snapshot.forEach((child) => {
      const data = child.val();
      const card = document.createElement("div");
      card.classList.add("card");

      // Imagen
      if (data.imagen) {
        const img = document.createElement("img");
        img.src = "imagenes/" + data.imagen;
        img.alt = data.titulo || "Imagen";
        card.appendChild(img);
      }

      // Texto
      if (data.titulo) {
        const h3 = document.createElement("h3");
        h3.textContent = data.titulo;
        card.appendChild(h3);
      }

      if (data.descripcion) {
        const p = document.createElement("p");
        p.textContent = data.descripcion;
        card.appendChild(p);
      }

      container.appendChild(card);
    });
  });
}

// Cargar secciones dinámicas desde Firebase
loadContent("servicios", servicesContainer);
loadContent("nosotros", aboutContainer);
loadContent("contacto", contactContainer);

// ======================
// Carrusel Automático
// ======================
const slides = document.querySelector(".slides");
const images = document.querySelectorAll(".slides img");
let index = 0;

function showSlide(i) {
  slides.style.transform = `translateX(${-i * 100}%)`;
}

function nextSlide() {
  index++;
  if (index >= images.length) {
    index = 0;
  }
  showSlide(index);
}

// Cambiar de imagen cada 4 segundos
setInterval(nextSlide, 4000);