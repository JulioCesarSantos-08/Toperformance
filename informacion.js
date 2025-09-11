// Importar Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, onValue, update, remove } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

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

// Renderizar colección
function renderColeccion(path, contenedorId) {
  const contenedor = document.getElementById(contenedorId);
  contenedor.innerHTML = "";

  const dataRef = ref(db, path);
  onValue(dataRef, (snapshot) => {
    contenedor.innerHTML = ""; // limpiar antes de renderizar
    snapshot.forEach((child) => {
      const data = child.val();
      const key = child.key;

      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <h3>${data.titulo || "Sin título"}</h3>
        <p>${data.descripcion || ""}</p>
        ${
          data.imagen
            ? `<img src="imagenes/${data.imagen}" alt="${data.titulo}" style="width:80px;height:auto;margin-top:10px;border-radius:6px;">`
            : ""
        }
        <div style="margin-top:10px;">
          <button class="btn btn-edit" onclick="editar('${path}','${key}','${contenedorId}')">Editar</button>
          <button class="btn btn-delete" onclick="eliminar('${path}','${key}','${contenedorId}')">Eliminar</button>
        </div>
      `;
      contenedor.appendChild(card);
    });
  });
}

// Editar
window.editar = (path, id, contenedorId) => {
  const contenedor = document.getElementById(contenedorId);
  const itemRef = ref(db, `${path}/${id}`);

  onValue(itemRef, (snapshot) => {
    const data = snapshot.val();
    contenedor.innerHTML = `
      <div class="card edit-form">
        <input type="text" id="edit-titulo" value="${data.titulo || ""}">
        <textarea id="edit-descripcion">${data.descripcion || ""}</textarea>
        <input type="text" id="edit-imagen" value="${data.imagen || ""}">
        <button class="btn btn-save" onclick="guardarEdicion('${path}','${id}','${contenedorId}')">Guardar</button>
      </div>
    `;
  }, { onlyOnce: true });
};

// Guardar edición
window.guardarEdicion = (path, id, contenedorId) => {
  const titulo = document.getElementById("edit-titulo").value;
  const descripcion = document.getElementById("edit-descripcion").value;
  const imagen = document.getElementById("edit-imagen").value;

  update(ref(db, `${path}/${id}`), { titulo, descripcion, imagen })
    .then(() => {
      alert("Información actualizada");
      renderColeccion(path, contenedorId);
    })
    .catch((err) => console.error("Error actualizando:", err));
};

// Eliminar
window.eliminar = (path, id, contenedorId) => {
  if (confirm("¿Seguro que deseas eliminar este elemento?")) {
    remove(ref(db, `${path}/${id}`))
      .then(() => {
        alert("Elemento eliminado");
        renderColeccion(path, contenedorId);
      })
      .catch((err) => console.error("Error eliminando:", err));
  }
};

// Inicializar vistas
renderColeccion("servicios", "listaServicios");
renderColeccion("nosotros", "listaNosotros");