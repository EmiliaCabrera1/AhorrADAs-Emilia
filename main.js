/*Menu Hamburguerza */

// const botonMenuHamburger = document.getElementById("botonMenuHamburger");
// const navMenu = document.getElementById("navMenu");
// const menuHamburger = document.getElementById("menuHamburger");
// const botonMenuHamburgerCerrar = document.getElementById(
//   "botonMenuHamburgerCerrar"
// );
// const menuHamburguerContainer = document.getElementById(
//   "menuHamburguerContainer"
// );

// function agregar() {
//   navMenu.style.display = "none";
//   menuHamburguerContainer.style.display = "flex";
//   menuHamburguerContainer.classList.add("menu");
//   menuHamburger.style.display = "flex";
//   menuHamburger.classList.add("menuLi");
//   botonMenuHamburger.style.display = "none";
//   botonMenuHamburgerCerrar.style.display = "block";
// }
// //console.log(agregar)
// botonMenuHamburger.addEventListener("click", agregar);

// function cerrar() {
//   menuHamburguerContainer.style.display = "none";
//   botonMenuHamburger.style.display = "block";
//   navMenu.style.display = "block";
// }
// //console.log(cerrar)
// botonMenuHamburgerCerrar.addEventListener("click", cerrar);

// /*Conexion de las etiquitas a con el main*/
// const pantallaPrincipal = document.getElementById("pantallaPrincipal");
// const categoria1 = document.getElementById("categoria1");
// const categorias = document.getElementById("categorias");
// const reportes = document.getElementById("reportes");
// const pantallaPrincipal1 = document.getElementById("pantallaPrincipal1");

// function cerrarPantallaPrincipalYAgreagarCategorias() {
//   pantallaPrincipal.style.display = "none";
//   categorias.style.display = "flex";
// }
// //console.log(cerrarPantallaPrincipalYAgreagarCategorias);
// categoria1.addEventListener(
//   "click",
//   cerrarPantallaPrincipalYAgreagarCategorias
// );
// /* conexion del boton de nueva operacion que te lleva a descripcion */
// const operacionesBotton = document.getElementById("operacionesBotton");
// const nuevaOperaciones = document.getElementById("nuevaOperaciones");
// console.log(cerrarPantallaPrincipalYAgreagarDescripcion);

// function cerrarPantallaPrincipalYAgreagarDescripcion() {
//   pantallaPrincipal.style.display = "none";
//   nuevaOperaciones.style.display = "flex";
// }
// operacionesBotton.addEventListener(
//   "click",
//   cerrarPantallaPrincipalYAgreagarDescripcion
// );

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
    selectTipo: selectTipo.value,
    categoria: selectCategoria.value,
    inputFecha: inputFecha.value,
  };
  localStorage.setItem("operaciones", JSON.stringify(operacion));
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

function listaDeOperaciones() {
  if (localStorage.getItem("operaciones")) {
    sinOperaciones.classList.add("hidden");
    conOperaciones.classList.remove("hidden");
  } else {
    sinOperaciones.classList.remove("hidden");
    conOperaciones.classList.add("hidden");
  }
}

listaDeOperaciones();
