/*Menu Hamburguerza */

const botonMenuHamburger = document.getElementById("botonMenuHamburger");
const navMenu = document.getElementById("navMenu");
const menuHamburger = document.getElementById("menuHamburger");
const botonMenuHamburgerCerrar = document.getElementById(
  "botonMenuHamburgerCerrar"
);
const menuHamburguerContainer = document.getElementById(
  "menuHamburguerContainer"
);

function agregar() {
  navMenu.style.display = "none";
  menuHamburguerContainer.style.display = "flex";
  menuHamburguerContainer.classList.add("menu");
  menuHamburger.style.display = "flex";
  menuHamburger.classList.add("menuLi");
  botonMenuHamburger.style.display = "none";
  botonMenuHamburgerCerrar.style.display = "block";
}
//console.log(agregar)
botonMenuHamburger.addEventListener("click", agregar);

function cerrar() {
  menuHamburguerContainer.style.display = "none";
  botonMenuHamburger.style.display = "block";
  navMenu.style.display = "block";
}
//console.log(cerrar)
botonMenuHamburgerCerrar.addEventListener("click", cerrar);

/*Conexion de las etiquitas a con el main*/
const pantallaPrincipal = document.getElementById("pantallaPrincipal");
const categoria1 = document.getElementById("categoria1");
const categorias = document.getElementById("categorias");
const reportes = document.getElementById("reportes");
const pantallaPrincipal1 = document.getElementById("pantallaPrincipal1");

function cerrarPantallaPrincipalYAgreagarCategorias() {
  pantallaPrincipal.style.display = "none";
  categorias.style.display = "flex";
}
//console.log(cerrarPantallaPrincipalYAgreagarCategorias);
categoria1.addEventListener(
  "click",
  cerrarPantallaPrincipalYAgreagarCategorias
);
/* conexion del boton de nueva operacion que te lleva a descripcion */
const operacionesBotton = document.getElementById("operacionesBotton");
const nuevaOperaciones = document.getElementById("nuevaOperaciones");
console.log(cerrarPantallaPrincipalYAgreagarDescripcion);

function cerrarPantallaPrincipalYAgreagarDescripcion() {
  pantallaPrincipal.style.display = "none";
  nuevaOperaciones.style.display = "flex";
}
operacionesBotton.addEventListener(
  "click",
  cerrarPantallaPrincipalYAgreagarDescripcion
);
