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
const inputDescripcion = $("input-descripcion-operacion");
const inputMonto = $("input-monto-operacion");
const selectTipo = $("select-tipo-operacion");
const selectCategoria = $("select-categoria-operacion");
const inputFecha = $("input-fecha-operacion");
const botonAgregarOperacion = $("button-agregar-operacion");
const botonCancelarOperacion = $("button-cancelar-operacion");
let contadorDeOperaciones;
const tablaCuerpoOperaciones = $("tabla-cuerpo");
const agregarNuevaCategoria = $("agregar-nueva-categoria");
const tablaCuerpoCategorias = $("tabla-cuerpo-categorias");
const seccionEditarOperacion = $("seccion-editar-operacion");
const botonGuardarEdiccion = $("button-guardar-editar-operacion");
const botonCancelarEdicion = $("button-cancelar-editar-operacion");
const inputDescripcionEditar = $("input-descripcion-editar");
const inputMontoEditar = $("input-monto-editar");
const selectTipoEditar = $("select-tipo-editar");
const selectCategoriaEditar = $("select-categoria-editar");
const inputFechaEditar = $("input-fecha-editar");

/*revisa el conteo de las operaciones, primero se fija si hay operaciones 
 guardadas para seguir numerando, si no hay inicia en 0 */

if (localStorage.getItem("contadorDeOperaciones")) {
  contadorDeOperaciones = parseInt(
    localStorage.getItem("contadorDeOperaciones")
  );
} else {
  contadorDeOperaciones = 0;
}

function mostrarReporte() {
  pantallaPrincipal.classList.add("hidden");
  seccionNuevaOperacion.classList.add("hidden");
  seccionCategorias.classList.add("hidden");
  seccionEditarOperacion.classList.add("hidden");
  seccionReportes.classList.remove("hidden");
}
reporteNav.addEventListener("click", mostrarReporte);

function mostrarCategorias() {
  pantallaPrincipal.classList.add("hidden");
  seccionNuevaOperacion.classList.add("hidden");
  seccionReportes.classList.add("hidden");
  seccionEditarOperacion.classList.add("hidden");
  seccionCategorias.classList.remove("hidden");
}
categoriaNav.addEventListener("click", mostrarCategorias);

function mostrarBalance() {
  seccionNuevaOperacion.classList.add("hidden");
  seccionReportes.classList.add("hidden");
  seccionCategorias.classList.add("hidden");
  seccionEditarOperacion.classList.add("hidden");
  pantallaPrincipal.classList.remove("hidden");
  listaDeOperaciones();
}
balanceNav.addEventListener("click", mostrarBalance);

function mostrarMenuHamburgesa() {
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

/* guarda los datos de cada input en localStorage, contadorDeOperaciones++ aumenta el numero 
asi las operaciones son 1,2,3 etc.
despues crea un objeto con todos los datos de los input
*/

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
  /* trae las operaciones ya guardadas y sino empieza un nuevo array*/
  const operacionesJSON = localStorage.getItem("operaciones");
  let operaciones = JSON.parse(operacionesJSON);
  if (operaciones === null) {
    operaciones = [];
  }
  /* agrega el objeto de la nueva operacion al grupo de operaciones que ya teniamos o el creado de cero*/
  operaciones.push(operacion); //push agrega la operacion
  localStorage.setItem("operaciones", JSON.stringify(operaciones)); //convierte el array en un string y lo guarda en locals
  localStorage.setItem("contadorDeOperaciones", contadorDeOperaciones); // guarda el contador aumentado
  borrarDatos(); //borra los datos del formulario
}

function volverPantallaPrincipal() {
  seccionNuevaOperacion.classList.add("hidden");
  pantallaPrincipal.classList.remove("hidden");
  listaDeOperaciones();
}
botonAgregarOperacion.addEventListener("click", guardarDatos);
botonCancelarOperacion.addEventListener("click", volverPantallaPrincipal);

function crearTablaOperaciones() {
  /*limpia la tabla*/
  tablaCuerpoOperaciones.innerHTML = "";
  /*trae los datos del local storage y los convierte en un array de objetos*/
  const operacionesJSON = localStorage.getItem("operaciones");
  const operaciones = JSON.parse(operacionesJSON);
  /*para cada operacion crea una fila*/
  operaciones.forEach((operacion) => {
    const row = document.createElement("tr");
    /*Estilamos la fila porque ya no existe en html, la creamos y estilamos */
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
        <button class="text-cyan-600" onclick=editarOperacion(${
          operacion.id
        }) >Editar</button>
        <button class="text-cyan-600" onclick=eliminarOperacion(${
          operacion.id
        }) >Eliminar</button>
      </td>
    `;
    /*Aparece la fila* */
    tablaCuerpoOperaciones.appendChild(row);
  });
}

function listaDeOperaciones() {
  if (JSON.parse(localStorage.getItem("operaciones")).length > 0) {
    sinOperaciones.classList.add("hidden");
    conOperaciones.classList.remove("hidden");
    crearTablaOperaciones();
  } else {
    sinOperaciones.classList.remove("hidden");
    conOperaciones.classList.add("hidden");
  }
}

/* editar operacion, agrege una seccion en html de editar operacion igual
  a la de nueva operacion pero con boton editar */

function editarOperacion(id) {
  pantallaPrincipal.classList.add("hidden");
  seccionEditarOperacion.classList.remove("hidden");

  const operacionesJSON = localStorage.getItem("operaciones");
  const operaciones = JSON.parse(operacionesJSON);

  const operacion = operaciones.find((operacion) => {
    return operacion.id === id; // busca la operacion con un id exactamente igual al id de arriba
  });

  inputDescripcionEditar.value = operacion.descripcion;
  inputMontoEditar.value = operacion.monto;
  selectTipoEditar.value = operacion.tipo;
  selectCategoriaEditar.value = operacion.categoria;
  inputFechaEditar.value = operacion.fecha; //trae los datos que corresponden a ese id

  botonGuardarEdiccion.addEventListener("click", () => guardarEdicion(id)); //() => espera a el click para ejecutar guardarEdicion
}

function guardarEdicion(id) {
  const operacion = {
    id: id,
    descripcion: inputDescripcionEditar.value,
    monto: inputMontoEditar.value,
    tipo: selectTipoEditar.value,
    categoria: selectCategoriaEditar.value,
    fecha: inputFechaEditar.value,
  };

  const operacionesJSON = localStorage.getItem("operaciones");
  let operaciones = JSON.parse(operacionesJSON);
  operaciones = operaciones.filter((operacion) => operacion.id !== id); // operaciones filtra y solo guarda las diferentes a mi id

  operaciones.push(operacion);
  localStorage.setItem("operaciones", JSON.stringify(operaciones));

  mostrarBalance();
}

botonCancelarEdicion.addEventListener("click", mostrarBalance);

function eliminarOperacion(id) {
  const operacionesJSON = localStorage.getItem("operaciones");
  let operaciones = JSON.parse(operacionesJSON);
  operaciones = operaciones.filter((operacion) => operacion.id !== id);

  localStorage.setItem("operaciones", JSON.stringify(operaciones));

  mostrarBalance();
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
/* revisa si hay categorias guardadas, si no las hay muesta las categorias por defecto*/
function mostrarTablaCategorias() {
  if (!localStorage.getItem("categorias")) {
    // ! niega la afirmacion
    crearCategoriasPorDefecto();
  }

  tablaCuerpoCategorias.innerHTML = ""; //limpia la tabla, para cargar la nueva si algo se elimino o0 edito

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
