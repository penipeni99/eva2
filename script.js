const experiencias = [
  {
    id: 1,
    nombre: "Capillas de Mármol",
    categoria: "Navegación",
    lugar: "Puerto Río Tranquilo",
    precio: 45000,
    cuposDisponibles: 8,
    descripcion: "Navegación en bote por el Lago General Carrera hasta las formaciones de mármol esculpidas por el agua durante miles de años.",
    icono: "⛵"
  },
  {
    id: 2,
    nombre: "Trekking Cerro Castillo",
    categoria: "Trekking",
    lugar: "Villa Cerro Castillo",
    precio: 60000,
    cuposDisponibles: 6,
    descripcion: "Caminata guiada por la Reserva Nacional Cerro Castillo, con vistas a sus agujas de granito y la Laguna Cerro Castillo.",
    icono: "🥾"
  },
  {
    id: 3,
    nombre: "Pesca con Mosca",
    categoria: "Pesca",
    lugar: "Río Simpson",
    precio: 50000,
    cuposDisponibles: 5,
    descripcion: "Jornada de pesca con mosca con guía local, práctica de captura y liberación en uno de los ríos más limpios de la Patagonia.",
    icono: "🎣"
  },
  {
    id: 4,
    nombre: "Patrimonio de Cochrane",
    categoria: "Cultura",
    lugar: "Cochrane",
    precio: 25000,
    cuposDisponibles: 10,
    descripcion: "Recorrido cultural por el pueblo fundacional de Cochrane: su museo, ferias de artesanía y la historia de los primeros colonos.",
    icono: "📷"
  },
  {
    id: 5,
    nombre: "Kayak en Fiordos",
    categoria: "Navegación",
    lugar: "Caleta Tortel",
    precio: 55000,
    cuposDisponibles: 7,
    descripcion: "Remo en kayak entre los pasarelas de ciprés de Caleta Tortel, explorando los canales y fiordos del sur de Aysén.",
    icono: "🛶"
  },
  {
    id: 6,
    nombre: "Avistamiento en Laguna San Rafael",
    categoria: "Navegación",
    lugar: "Laguna San Rafael",
    precio: 65000,
    cuposDisponibles: 4,
    descripcion: "Navegación hasta el glaciar San Rafael, con observación de fauna marina y desprendimientos de hielo milenario.",
    icono: "🐳"
  },
  {
    id: 7,
    nombre: "Carretera Austral en Bicicleta",
    categoria: "Trekking",
    lugar: "Coyhaique – Puerto Aysén",
    precio: 40000,
    cuposDisponibles: 9,
    descripcion: "Recorrido en bicicleta por un tramo panorámico de la Carretera Austral, entre bosques nativos y valles glaciares.",
    icono: "🚵"
  },
  {
    id: 8,
    nombre: "Feria Costumbrista de Chile Chico",
    categoria: "Cultura",
    lugar: "Chile Chico",
    precio: 15000,
    cuposDisponibles: 12,
    descripcion: "Visita guiada a la feria costumbrista: gastronomía típica, oficios tradicionales y relatos de la vida en la frontera con Argentina.",
    icono: "🎭"
  }
];

/* Estado simple de la categoría activa */
let categoriaActiva = "Todos";

/* ---------- Referencias al DOM ---------- */
const contenedorTarjetas = document.getElementById("tarjetas-experiencias");
const contenedorFiltros = document.getElementById("filtros");
const selectExperiencia = document.getElementById("experiencia");
const formReserva = document.getElementById("form-reserva");
const successMsg = document.getElementById("success-msg");

function crearTarjeta(exp) {
  const tarjeta = document.createElement("article");
  tarjeta.className = "tarjeta";
  tarjeta.dataset.id = exp.id;

  const top = document.createElement("div");
  top.className = "tarjeta-top";

  const icono = document.createElement("span");
  icono.className = "tarjeta-icono";
  icono.textContent = exp.icono;

  const categoria = document.createElement("span");
  categoria.className = "tarjeta-categoria";
  categoria.textContent = exp.categoria;

  top.append(icono, categoria);

  const titulo = document.createElement("h3");
  titulo.textContent = exp.nombre;

  const lugar = document.createElement("p");
  lugar.className = "tarjeta-lugar";
  lugar.textContent = "📍 " + exp.lugar;

  const meta = document.createElement("div");
  meta.className = "tarjeta-meta";

  const precio = document.createElement("span");
  precio.className = "tarjeta-precio";
  precio.textContent = "$" + exp.precio.toLocaleString("es-CL");

  const cupos = document.createElement("span");
  cupos.className = "tarjeta-cupos" + (exp.cuposDisponibles === 0 ? " agotado" : "");
  cupos.textContent = exp.cuposDisponibles === 0
    ? "Sin cupos"
    : "Cupos: " + exp.cuposDisponibles;

  meta.append(precio, cupos);

  const descripcion = document.createElement("p");
  descripcion.className = "tarjeta-descripcion";
  descripcion.textContent = exp.descripcion;

  const btnVerMas = document.createElement("button");
  btnVerMas.type = "button";
  btnVerMas.className = "btn-ver-mas";
  btnVerMas.textContent = "Ver más";

  btnVerMas.addEventListener("click", () => {
    const visible = descripcion.classList.toggle("visible");
    btnVerMas.textContent = visible ? "Ver menos" : "Ver más";
  });

  tarjeta.append(top, titulo, lugar, meta, descripcion, btnVerMas);
  return tarjeta;
}

function renderExperiencias(lista) {
  contenedorTarjetas.innerHTML = "";

  if (lista.length === 0) {
    const vacio = document.createElement("p");
    vacio.className = "section-lede";
    vacio.textContent = "No hay experiencias disponibles en esta categoría por ahora.";
    contenedorTarjetas.appendChild(vacio);
    return;
  }

  lista.forEach(exp => {
    const tarjeta = crearTarjeta(exp);
    contenedorTarjetas.appendChild(tarjeta);
  });
}

function filtrarPorCategoria(categoria) {
  if (categoria === "Todos") return experiencias;
  return experiencias.filter(exp => exp.categoria === categoria);
}

function marcarFiltroActivo(boton) {
  document.querySelectorAll(".filtro-btn").forEach(btn => {
    btn.classList.remove("activo");
  });
  boton.classList.add("activo");
}

function manejarClicFiltro(evento) {
  const boton = evento.target.closest(".filtro-btn");
  if (!boton) return;

  categoriaActiva = boton.dataset.categoria;
  marcarFiltroActivo(boton);
  renderExperiencias(filtrarPorCategoria(categoriaActiva));
}

contenedorFiltros.addEventListener("click", manejarClicFiltro);

function poblarSelectExperiencias() {
  experiencias.forEach(exp => {
    const opcion = document.createElement("option");
    opcion.value = exp.id;
    opcion.textContent = `${exp.nombre} — ${exp.lugar}`;
    selectExperiencia.appendChild(opcion);
  });
}

function actualizarEstadisticas() {
  const totalCupos = experiencias.reduce((acc, exp) => acc + exp.cuposDisponibles, 0);
  const localidades = new Set(experiencias.map(exp => exp.lugar)).size;

  document.getElementById("stat-experiencias").textContent = experiencias.length;
  document.getElementById("stat-cupos").textContent = totalCupos;
  document.getElementById("stat-localidades").textContent = localidades;
}

function mostrarError(campoId, mensaje) {
  const input = document.getElementById(campoId);
  const errorEl = document.getElementById("error-" + campoId);
  if (input) input.classList.add("invalido");
  if (errorEl) errorEl.textContent = mensaje;
}

function limpiarErrores() {
  document.querySelectorAll(".error-msg").forEach(el => (el.textContent = ""));
  document.querySelectorAll(".invalido").forEach(el => el.classList.remove("invalido"));
  successMsg.classList.remove("visible");
  successMsg.textContent = "";
}

function emailValido(email) {
  const patron = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return patron.test(email);
}

function validarFormulario(datos) {
  let esValido = true;

  if (datos.nombre.trim() === "") {
    mostrarError("nombre", "Ingresa tu nombre completo.");
    esValido = false;
  }

  if (datos.email.trim() === "") {
    mostrarError("email", "Ingresa tu correo electrónico.");
    esValido = false;
  } else if (!emailValido(datos.email.trim())) {
    mostrarError("email", "El formato del correo no es válido.");
    esValido = false;
  }

  if (datos.experienciaId === "") {
    mostrarError("experiencia", "Selecciona una experiencia.");
    esValido = false;
  }

  if (datos.personas === "" || Number(datos.personas) <= 0) {
    mostrarError("personas", "Indica el número de personas (mínimo 1).");
    esValido = false;
  } else if (datos.experienciaId !== "") {
    const exp = experiencias.find(e => e.id === Number(datos.experienciaId));
    if (exp && Number(datos.personas) > exp.cuposDisponibles) {
      mostrarError(
        "personas",
        `Sólo quedan ${exp.cuposDisponibles} cupo(s) disponibles para esta experiencia.`
      );
      esValido = false;
    }
  }

  if (datos.fecha === "") {
    mostrarError("fecha", "Selecciona una fecha para tu visita.");
    esValido = false;
  }

  return esValido;
}

function descontarCupo(id, personas) {
  const exp = experiencias.find(e => e.id === id);
  if (!exp) return;

  exp.cuposDisponibles = Math.max(0, exp.cuposDisponibles - personas);
  renderExperiencias(filtrarPorCategoria(categoriaActiva));
  actualizarEstadisticas();
  actualizarOpcionSelect(exp);
}

function actualizarOpcionSelect(exp) {
  const opcion = selectExperiencia.querySelector(`option[value="${exp.id}"]`);
  if (opcion) {
    opcion.textContent = `${exp.nombre} — ${exp.lugar}`;
  }
}

function manejarEnvioFormulario(evento) {
  evento.preventDefault();
  limpiarErrores();

  const datos = {
    nombre: document.getElementById("nombre").value,
    email: document.getElementById("email").value,
    experienciaId: document.getElementById("experiencia").value,
    personas: document.getElementById("personas").value,
    fecha: document.getElementById("fecha").value
  };

  const formularioValido = validarFormulario(datos);
  if (!formularioValido) return;

  const idExperiencia = Number(datos.experienciaId);
  const cantidadPersonas = Number(datos.personas);

  descontarCupo(idExperiencia, cantidadPersonas);

  const exp = experiencias.find(e => e.id === idExperiencia);
  successMsg.textContent = `¡Reserva confirmada para ${exp.nombre}! Te escribiremos a ${datos.email}.`;
  successMsg.classList.add("visible");

  formReserva.reset();
}

formReserva.addEventListener("submit", manejarEnvioFormulario);

function init() {
  renderExperiencias(experiencias);
  poblarSelectExperiencias();
  actualizarEstadisticas();
}

document.addEventListener("DOMContentLoaded", init);
