// Importar Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

// Configuración Firebase
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

// Función para guardar datos
function saveData(formId, path, inputs) {
  const form = document.getElementById(formId);
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = {};
    inputs.forEach(id => {
      data[id.split("-")[1]] = document.getElementById(id).value;
    });
    push(ref(db, path), data);
    alert("Información guardada en " + path);
    form.reset();
  });
}

// Guardar Servicios
saveData("form-servicios", "servicios", [
  "titulo-servicio",
  "descripcion-servicio",
  "imagen-servicio"
]);

// Guardar Nosotros
saveData("form-nosotros", "nosotros", [
  "titulo-nosotros",
  "descripcion-nosotros",
  "imagen-nosotros"
]);

// Guardar Contacto
saveData("form-contacto", "contacto", [
  "titulo-contacto",
  "descripcion-contacto",
  "imagen-contacto"
]);