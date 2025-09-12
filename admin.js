// Importar Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

// Configuración Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBA_i9O3VxFn2rIKY4XQzll2fLvmD-u3A",
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

// =============================
// Función genérica para guardar datos (Servicios y Nosotros)
// =============================
function saveData(formId, path, fields) {
  const form = document.getElementById(formId);
  if (!form) return; // evita errores si no existe el form

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Captura los valores según IDs definidos en el HTML
    const data = {
      titulo: document.getElementById(fields.titulo).value,
      descripcion: document.getElementById(fields.descripcion).value,
      imagen: document.getElementById(fields.imagen).value
    };

    push(ref(db, path), data)
      .then(() => {
        alert("Información guardada en " + path);
        form.reset();
      })
      .catch((error) => {
        console.error("Error guardando en Firebase:", error);
      });
  });
}

// =============================
// Guardar Servicios
// =============================
saveData("form-servicios", "servicios", {
  titulo: "titulo-servicio",
  descripcion: "descripcion-servicio",
  imagen: "imagen-servicio"
});

// =============================
// Guardar Nosotros
// =============================
saveData("form-nosotros", "nosotros", {
  titulo: "titulo-nosotros",
  descripcion: "descripcion-nosotros",
  imagen: "imagen-nosotros"
});

// =============================
// Guardar Catálogo de Servicios con Precio y Categoría
// =============================
function saveCatalogo() {
  const form = document.getElementById("form-catalogo");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = {
      nombre: document.getElementById("nombre-servicio").value,
      descripcion: document.getElementById("descripcion-catalogo").value,
      precio: document.getElementById("precio-servicio").value,
      categoria: document.getElementById("categoria-servicio").value, // <-- NUEVO
      imagen: document.getElementById("imagen-catalogo").value
    };

    push(ref(db, "catalogo"), data)
      .then(() => {
        alert("Servicio guardado en Catálogo");
        form.reset();
      })
      .catch((error) => {
        console.error("Error guardando en Firebase:", error);
      });
  });
}

// Llamamos la función del catálogo
saveCatalogo();