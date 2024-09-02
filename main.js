const $ = (id) => document.getElementById(id);

const balanceNav = $("balance-nav");
const categoriaNav = $("categoria-nav");
const reporteNav = $("reportes-nav");
const navMenu = $("navMenu");
const botonHamburguesa = $("botonMenuHamburguesa");
const botonHamburguesaCerrar = $("botonMenuHamburguesaCerrar");
const pantallaPrincipal = $("pantalla-principal");
const seccionReportes = $("seccion-reportes");
const seccionCategorias = $("seccion-categorias");
const seccionBalance = $("seccion-balance");
const seccionFiltros = $("seccion-filtros");
const seccionOperaciones = $("seccion-operaciones");
const sinOperaciones = $("sin-operaciones");
const seccionNuevaOperacion = $("nueva-operacion");
const conOperaciones = $("con-operaciones");
const botonNuevaOperacion = $("button-nueva-operacion");
const inputDescripcion = $("input-descripcion");
const inputMonto = $("input-monto");
const selectTipo = $("select-tipo");
const selectCategoria = $("select-categoria");
const inputFecha = $("input-fecha");
const botonAgregarOperacion = $("button-agregar-operacion");
const botonCancelarOperacion = $("button-cancelar-operacion");
let contadorDeOperaciones;
const tablaCuerpoOperaciones = $("tabla-cuerpo");
const agregarNuevaCategoria = $("agregar-nueva-categoria");
const tablaCuerpoCategorias = $("tabla-cuerpo-categorias");

if (localStorage.getItem("contadorDeOperaciones")) {
  contadorDeOperaciones = parseInt(localStorage.getItem("contadorOperaciones"));
} else {
  contadorDeOperaciones = 0;
}

function mostrarReporte() {
  pantallaPrincipal.classList.add("hidden");
  seccionNuevaOperacion.classList.add("hidden");
  seccionCategorias.classList.add("hidden");
  seccionReportes.classList.remove("hidden");
}
reporteNav.addEventListener("click", mostrarReporte);

function mostrarCategorias() {
  pantallaPrincipal.classList.add("hidden");
  seccionNuevaOperacion.classList.add("hidden");
  seccionReportes.classList.add("hidden");
  seccionCategorias.classList.remove("hidden");
}
categoriaNav.addEventListener("click", mostrarCategorias);

function mostrarBalance() {
  seccionNuevaOperacion.classList.add("hidden");
  seccionReportes.classList.add("hidden");
  seccionCategorias.classList.add("hidden");
  pantallaPrincipal.classList.remove("hidden");
  listaDeOperaciones();
}
balanceNav.addEventListener("click", mostrarBalance);

function mostrarMenuHamburgesa() {
  console.log("mostrar menu hamb");
  navMenu.classList.remove("hidden");
  botonHamburguesa.classList.add("hidden");
  botonHamburguesaCerrar.classList.remove("hidden");
}
botonHamburguesa.addEventListener("click", mostrarMenuHamburgesa);

function cerrarMenuHamburgesa() {
  navMenu.classList.add("hidden");
  botonHamburguesa.classList.remove("hidden");
  botonHamburguesaCerrar.classList.add("hidden");
}
botonHamburguesaCerrar.addEventListener("click", cerrarMenuHamburgesa);

function nuevaOperacion() {
  pantallaPrincipal.classList.add("hidden");
  seccionNuevaOperacion.classList.remove("hidden");
}
botonNuevaOperacion.addEventListener("click", nuevaOperacion);

function borrarDatos() {
  inputDescripcion.value = "";
  inputMonto.value = "";
  selectTipo.selectedIndex = 0;
  selectCategoria.selectedIndex = 0;
  const currentDate = new Date();
  inputFecha.value = currentDate.toISOString().slice(0, 10);
}

function guardarDatos() {
  contadorDeOperaciones++;
  const operacion = {
    id: contadorDeOperaciones,
    descripcion: inputDescripcion.value,
    monto: inputMonto.value,
    tipo: selectTipo.value,
    categoria: selectCategoria.value,
    fecha: inputFecha.value,
  };
  const operacionesJSON = localStorage.getItem("operaciones");
  let operaciones = JSON.parse(operacionesJSON);
  if (operaciones === null) {
    operaciones = [];
  }
  operaciones.push(operacion);
  localStorage.setItem("operaciones", JSON.stringify(operaciones));
  localStorage.setItem("contadorDeOperaciones", contadorDeOperaciones);
  borrarDatos();
}

function volverPantallaPrincipal() {
  seccionNuevaOperacion.classList.add("hidden");
  pantallaPrincipal.classList.remove("hidden");
  listaDeOperaciones();
}
botonAgregarOperacion.addEventListener("click", guardarDatos);
botonCancelarOperacion.addEventListener("click", volverPantallaPrincipal);

function crearTablaOperaciones() {
  tablaCuerpoOperaciones.innerHTML = "";

  const operacionesJSON = localStorage.getItem("operaciones");
  const operaciones = JSON.parse(operacionesJSON);

  operaciones.forEach((operacion) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td class="text-left">${operacion.descripcion}</td>
      <td class="bg-emerald-100 py-1 px-2 text-emerald-700 rounded inline">${
        operacion.categoria
      }</td>
      <td>${operacion.fecha}</td>
      <td class="text-${
        operacion.tipo === "ganancia" ? "green" : "red"
      }-600 font-semibold">${operacion.tipo === "ganancia" ? "+" : "-"}${
      operacion.monto
    }</td>
      <td class="gap-2">
        <button class="text-cyan-600">Editar</button>
        <button class="text-cyan-600">Eliminar</button>
      </td>
    `;

    tablaCuerpoOperaciones.appendChild(row);
  });
}

function listaDeOperaciones() {
  if (localStorage.getItem("operaciones")) {
    sinOperaciones.classList.add("hidden");
    conOperaciones.classList.remove("hidden");
    crearTablaOperaciones();
  } else {
    sinOperaciones.classList.remove("hidden");
    conOperaciones.classList.add("hidden");
  }
}

function crearCategoriasPorDefecto() {
  const categoriasPorDefecto = [
    "Comida",
    "Servicios",
    "Salidas",
    "Educacion",
    "Transporte",
    "Trabajo",
  ];
  localStorage.setItem("categorias", JSON.stringify(categoriasPorDefecto));
}

function mostrarTablaCategorias() {
  if (!localStorage.getItem("categorias")) {
    crearCategoriasPorDefecto();
  }

  tablaCuerpoCategorias.innerHTML = "";

  const categoriasGuardadas =
    JSON.parse(localStorage.getItem("categorias")) || [];

  categoriasGuardadas.forEach((categoria) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <div class="flex flex-row"> 
          <div class="text-emerald-700 inline bg-emerald-100 rounded p-1 my-2">${categoria}</div>
          <div class="ml-auto flex gap-2">
              <button class="text-cyan-600">Editar</button>
              <button class="text-cyan-600">Eliminar</button>
          </div>
      </div>
    `;

    tablaCuerpoCategorias.appendChild(row);
  });
}

listaDeOperaciones();
mostrarTablaCategorias();
