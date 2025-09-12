// Importar Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

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

// Elementos HTML
const catalogoContainer = document.getElementById("catalogo-container");
const searchInput = document.getElementById("search");
const filtroCategoria = document.getElementById("filter-category"); // 👈 corregido
const ordenarPrecio = document.getElementById("sort-price"); // 👈 corregido

let servicios = [];

// Cargar datos desde Firebase
onValue(ref(db, "servicios"), (snapshot) => {
  const data = snapshot.val();
  servicios = data ? Object.values(data) : [];
  renderServicios(servicios);
  actualizarCategorias(servicios);
});

// Renderizar servicios
function renderServicios(lista) {
  catalogoContainer.innerHTML = "";

  lista.forEach((item) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${item.imagen}" alt="${item.titulo}">
      <h3>${item.titulo}</h3>
      <p>${item.descripcion}</p>
      <p class="precio">$${item.precio || "0.00"}</p>
      <button>Ver más</button>
    `;
    catalogoContainer.appendChild(card);
  });
}

// === FILTRO DINÁMICO DE CATEGORÍAS ===
function actualizarCategorias(lista) {
  const categorias = new Set();

  lista.forEach((item) => {
    if (item.categoria) {
      categorias.add(item.categoria.trim());
    }
  });

  // limpiar y volver a cargar opciones
  filtroCategoria.innerHTML = `<option value="">Todas las categorías</option>`;
  categorias.forEach((cat) => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    filtroCategoria.appendChild(option);
  });
}

// === EVENTOS ===
searchInput.addEventListener("input", aplicarFiltros);
filtroCategoria.addEventListener("change", aplicarFiltros);
ordenarPrecio.addEventListener("change", aplicarFiltros);

function aplicarFiltros() {
  let listaFiltrada = [...servicios];

  // Buscar
  const busqueda = searchInput.value.toLowerCase();
  if (busqueda) {
    listaFiltrada = listaFiltrada.filter(
      (item) =>
        item.titulo.toLowerCase().includes(busqueda) ||
        item.descripcion.toLowerCase().includes(busqueda)
    );
  }

  // Categoría
  const categoriaSeleccionada = filtroCategoria.value;
  if (categoriaSeleccionada) {
    listaFiltrada = listaFiltrada.filter(
      (item) => item.categoria === categoriaSeleccionada
    );
  }

  // Ordenar por precio
  if (ordenarPrecio.value === "asc") {
    listaFiltrada.sort((a, b) => (a.precio || 0) - (b.precio || 0));
  } else if (ordenarPrecio.value === "desc") {
    listaFiltrada.sort((a, b) => (b.precio || 0) - (a.precio || 0));
  }

  renderServicios(listaFiltrada);
}