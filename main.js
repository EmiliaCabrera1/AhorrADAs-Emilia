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
const botonAgregarNuevaCategoria = $("agregar-nueva-categoria");
const inputNuevaCategoria = $("nombre-categoria-nueva");
const tablaCuerpoCategorias = $("tabla-cuerpo-categorias");
const seccionEditarOperacion = $("seccion-editar-operacion");
const botonGuardarEdiccion = $("button-guardar-editar-operacion");
const botonCancelarEdicion = $("button-cancelar-editar-operacion");
const inputDescripcionEditar = $("input-descripcion-editar");
const inputMontoEditar = $("input-monto-editar");
const selectTipoEditar = $("select-tipo-editar");
const selectCategoriaEditar = $("select-categoria-editar");
const inputFechaEditar = $("input-fecha-editar");
const inputCategoriaNueva = $("input-categoria-nueva");
const botonNuevaCategoria = $("agregar-nueva-categoria");
const inputEditarCategoria = $("input-editar-categoria");
const botonEditarCategoria = $("editar-categoria");
const botonCancelarEdicionCategoria = $("cancelar-edicion");
const seccionEditarCategoria = $("seccion-editar-categoria");
const inputFiltros = $("input-filtros");
const botonOcultarFiltros = $("button-ocultar-filtros");
const botonMostrarFiltros = $("button-mostrar-filtros");
const inputFiltrarTipo = $("filtrar-tipo");
const inputFiltrarCategoria = $("filtrar-categoria");
const inputFiltrarFecha = $("filtrar-fecha");
const inputFiltrarOrden = $("filtrar-orden");
const balanceTotalGanancias = $("balance-total-ganancias");
const balanceTotalGastos = $("balance-total-gastos");
const balanceTotal = $("balance-total");
const reporteSinOperaciones = $("reportes-sin-operaciones");
const reporteConOperaciones = $("reporte-con-operaciones");
const categoriaMasGananciaNombre = $("categoria-con-mas-ganancia-nombre");
const categoriaMasGananciaMonto = $("categoria-con-mas-ganancia-monto");
const categoriaMasGastoNombre = $("categoria-con-mas-gastos-nombre");
const categoriaMasGastoMonto = $("categoria-con-mas-gastos-monto");
const categoriaMasBalanceoNombre = $("categoria-con-mas-balance-nombre");
const categoriaMasBalanceoMonto = $("categoria-con-mas-balance-monto");
const mesMasGananciaNombre = $("mes-mas-ganancia-nombre");
const mesMasGananciaMonto = $("mes-mas-ganancia-monto");
const mesMasGastoNombre = $("mes-mas-gasto-nombre");
const mesMasGastoMonto = $("mes-mas-gasto-monto");
const tabTotalPorCat = $("tabla-total-por-categoria");
const tabTotalPorMes = $("tabla-total-por-mes");

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
  seccionEditarCategoria.classList.add("hidden");
  seccionReportes.classList.remove("hidden");
  mostrarTablaReporte();
}
reporteNav.addEventListener("click", mostrarReporte);

function mostrarCategorias() {
  pantallaPrincipal.classList.add("hidden");
  seccionNuevaOperacion.classList.add("hidden");
  seccionReportes.classList.add("hidden");
  seccionEditarOperacion.classList.add("hidden");
  seccionEditarCategoria.classList.add("hidden");
  seccionCategorias.classList.remove("hidden");
}
categoriaNav.addEventListener("click", mostrarCategorias);

function mostrarBalance() {
  seccionNuevaOperacion.classList.add("hidden");
  seccionReportes.classList.add("hidden");
  seccionCategorias.classList.add("hidden");
  seccionEditarOperacion.classList.add("hidden");
  seccionEditarCategoria.classList.add("hidden");
  pantallaPrincipal.classList.remove("hidden");
  listaDeOperaciones();
  mostrarCategoriaInputFiltros();
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
  mostrarSelectCategoria(selectCategoria);
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
  let operaciones = JSON.parse(operacionesJSON);

  operaciones = filtrarPorTipo(operaciones, inputFiltrarTipo.value);
  operaciones = filtrarPorCategoria(operaciones, inputFiltrarCategoria.value);
  operaciones = filtrarPorFecha(operaciones, inputFiltrarFecha.value);

  operaciones = ordenar(operaciones, inputFiltrarOrden.value);

  operaciones.forEach((operacion) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="text-left">${operacion.descripcion}</td>
      <td class="bg-emerald-100 py-1 px-2 text-emerald-700 rounded inline">${
        operacion.categoria
      }</td>
      <td>${operacion.fecha}</td>
      <td class="text-${
        operacion.tipo === "Ganancia" ? "green" : "red"
      }-600 font-semibold">${operacion.tipo === "Ganancia" ? "+$" : "-$"}${
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

    tablaCuerpoOperaciones.appendChild(row);

    balanceGanancias();
    balanceGastos();
    balancetotal();
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

function editarOperacion(id) {
  pantallaPrincipal.classList.add("hidden");
  seccionEditarOperacion.classList.remove("hidden");
  mostrarSelectCategoria(selectCategoriaEditar);

  const operacionesJSON = localStorage.getItem("operaciones");
  const operaciones = JSON.parse(operacionesJSON);

  const operacion = operaciones.find((operacion) => {
    return operacion.id === id;
  });

  inputDescripcionEditar.value = operacion.descripcion;
  inputMontoEditar.value = operacion.monto;
  selectTipoEditar.value = operacion.tipo;
  selectCategoriaEditar.value = operacion.categoria;
  inputFechaEditar.value = operacion.fecha;

  botonGuardarEdiccion.addEventListener("click", () => guardarEdicion(id));
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
  operaciones = operaciones.filter((operacion) => operacion.id !== id);

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
              <button class="text-cyan-600" onclick=editarCategoria("${categoria}")>Editar</button>
              <button class="text-cyan-600" onclick=eliminarCategoria("${categoria}")>Eliminar</button>
          </div>
      </div>
    `;

    tablaCuerpoCategorias.appendChild(row);
  });
}

function mostrarSelectCategoria(select) {
  const categorias = JSON.parse(localStorage.getItem("categorias") || []);

  select.innerHTML = `<option value="">Selecciona una opción</option>`;

  categorias.forEach((categoria) => {
    const option = document.createElement("option");
    option.innerText = categoria;
    option.value = categoria;
    select.appendChild(option);
  });
}

function agregarNuevaCategoria() {
  const categoriasGuardadas = JSON.parse(
    localStorage.getItem("categorias") || []
  );
  categoriasGuardadas.push(inputCategoriaNueva.value);
  localStorage.setItem("categorias", JSON.stringify(categoriasGuardadas));
  mostrarTablaCategorias();
  inputCategoriaNueva.value = "";
}
botonNuevaCategoria.addEventListener("click", agregarNuevaCategoria);

function eliminarCategoria(value) {
  let categoriasGuardadas = JSON.parse(
    localStorage.getItem("categorias") || []
  );
  categoriasGuardadas = categoriasGuardadas.filter(
    (categoria) => categoria !== value
  );

  localStorage.setItem("categorias", JSON.stringify(categoriasGuardadas));
  mostrarTablaCategorias();
}
function editarCategoria(value) {
  seccionCategorias.classList.add("hidden");
  seccionEditarCategoria.classList.remove("hidden");
  inputEditarCategoria.value = value;
  botonEditarCategoria.addEventListener("click", () =>
    guardarEditarCategoria(value)
  );
}
function cancelarEdicion() {
  seccionEditarCategoria.classList.add("hidden");
  seccionCategorias.classList.remove("hidden");
}
botonCancelarEdicionCategoria.addEventListener("click", cancelarEdicion);

function guardarEditarCategoria(value) {
  let categoriasGuardadas = JSON.parse(
    localStorage.getItem("categorias") || []
  );
  categoriasGuardadas = categoriasGuardadas.filter(
    (categoria) => categoria !== value
  );

  categoriasGuardadas.push(inputEditarCategoria.value);
  localStorage.setItem("categorias", JSON.stringify(categoriasGuardadas));

  seccionEditarCategoria.classList.add("hidden");
  seccionCategorias.classList.remove("hidden");
  mostrarTablaCategorias();
}

function funcionOcultarFiltros() {
  inputFiltros.classList.add("hidden");
  botonOcultarFiltros.classList.add("hidden");
  botonMostrarFiltros.classList.remove("hidden");
}

botonOcultarFiltros.addEventListener("click", funcionOcultarFiltros);

function funcionMostrarFiltros() {
  inputFiltros.classList.remove("hidden");
  botonOcultarFiltros.classList.remove("hidden");
  botonMostrarFiltros.classList.add("hidden");
}

botonMostrarFiltros.addEventListener("click", funcionMostrarFiltros);

function mostrarCategoriaInputFiltros() {
  const categorias = JSON.parse(localStorage.getItem("categorias") || []);

  inputFiltrarCategoria.innerHTML = `<option value="Todas">Todas</option>`;

  categorias.forEach((categoria) => {
    const option = document.createElement("option");
    option.innerText = categoria;
    option.value = categoria;
    inputFiltrarCategoria.appendChild(option);
  });
}

function filtrarPorTipo(operaciones, tipo) {
  if (tipo !== "Todos") {
    operaciones = operaciones.filter((operacion) => operacion.tipo === tipo);
  }
  return operaciones;
}

inputFiltrarTipo.addEventListener("change", listaDeOperaciones);

function filtrarPorCategoria(operaciones, categoria) {
  if (categoria !== "Todas") {
    operaciones = operaciones.filter(
      (operacion) => operacion.categoria === categoria
    );
  }
  return operaciones;
}

inputFiltrarCategoria.addEventListener("change", listaDeOperaciones);

function filtrarPorFecha(operaciones, fecha) {
  if (fecha !== "") {
    operaciones = operaciones.filter((operacion) => {
      const fechaDeOperacion = new Date(operacion.fecha);
      const fechaFiltrado = new Date(fecha);
      return fechaDeOperacion >= fechaFiltrado;
    });
  }
  return operaciones;
}

inputFiltrarFecha.addEventListener("change", listaDeOperaciones);

function balanceGanancias() {
  const operacionesJSON = localStorage.getItem("operaciones");
  const operaciones = JSON.parse(operacionesJSON) || [];
  const gastos = operaciones.filter(
    (operacion) => operacion.tipo === "Ganancia"
  );
  let totalGanancias = 0;
  gastos.forEach((ganancia) => (totalGanancias += parseInt(ganancia.monto)));
  balanceTotalGanancias.innerText = `$${totalGanancias}`;
}

function balanceGastos() {
  const operacionesJSON = localStorage.getItem("operaciones");
  const operaciones = JSON.parse(operacionesJSON) || [];
  const gastos = operaciones.filter((operacion) => operacion.tipo === "Gasto");
  let totalGastos = 0;
  gastos.forEach((gasto) => (totalGastos += parseInt(gasto.monto)));
  balanceTotalGastos.innerText = `$-${totalGastos}`;
}

function balancetotal() {
  const gastos = parseInt(balanceTotalGastos.innerText.replace("$-", ""));
  const ganancia = parseInt(balanceTotalGanancias.innerText.replace("$", ""));
  const totalBalance = ganancia - gastos;
  balanceTotal.innerText = `$${totalBalance}`;
  balanceTotal.classList.remove("text-green-600", "text-red-600");
  balanceTotal.classList.add(
    totalBalance >= 0 ? "text-green-600" : "text-red-600"
  );
}

function mostrarTablaReporte() {
  if (JSON.parse(localStorage.getItem("operaciones")).length > 0) {
    reporteSinOperaciones.classList.add("hidden");
    reporteConOperaciones.classList.remove("hidden");
  } else {
    reporteSinOperaciones.classList.remove("hidden");
    reporteConOperaciones.classList.add("hidden");
  }
}

function agruparCategorias(operaciones) {
  const operacionesPorCategoria = operaciones.reduce(
    (acumulador, operacion) => {
      const categoria = operacion.categoria;
      if (!acumulador[categoria]) {
        acumulador[categoria] = { ganancias: 0, gastos: 0, operaciones: [] };
      }

      if (operacion.tipo === "Ganancia") {
        acumulador[categoria].ganancias += parseInt(operacion.monto);
      } else if (operacion.tipo === "Gasto") {
        acumulador[categoria].gastos += parseInt(operacion.monto);
      }

      acumulador[categoria].operaciones.push(operacion);

      return acumulador;
    },
    []
  );

  return operacionesPorCategoria;
}

function categoriaMayorGanancia() {
  const operacionesJSON = localStorage.getItem("operaciones");
  const operaciones = JSON.parse(operacionesJSON) || [];
  const ganancias = operaciones.filter(
    (operacion) => operacion.tipo === "Ganancia"
  );
  let gananciasPorCategoria = Object.entries(agruparCategorias(ganancias));
  gananciasPorCategoria = gananciasPorCategoria.sort(
    ([, a], [, b]) => b.ganancias - a.ganancias
  );
  categoriaMasGananciaNombre.innerText = gananciasPorCategoria[0][0];
  categoriaMasGananciaMonto.innerText = `$${gananciasPorCategoria[0][1].ganancias}`;
}

function categoriaMayorGasto() {
  const operacionesJSON = localStorage.getItem("operaciones");
  const operaciones = JSON.parse(operacionesJSON) || [];
  const gastos = operaciones.filter((operacion) => operacion.tipo === "Gasto");
  let gastosPorCategoria = Object.entries(agruparCategorias(gastos));
  gastosPorCategoria = gastosPorCategoria.sort(
    ([, a], [, b]) => b.gastos - a.gastos
  );
  categoriaMasGastoNombre.innerText = gastosPorCategoria[0][0];
  categoriaMasGastoMonto.innerText = `-$${gastosPorCategoria[0][1].gastos}`;
}

function categoriaMayorBalance() {
  const operacionesJSON = localStorage.getItem("operaciones");
  const operaciones = JSON.parse(operacionesJSON) || [];
  let balancePorCategoria = Object.entries(agruparCategorias(operaciones));
  balancePorCategoria = balancePorCategoria.sort(
    ([, a], [, b]) => b.ganancias - b.gastos - a.ganancias - a.gastos
  );

  categoriaMasBalanceoNombre.innerText = balancePorCategoria[0][0];
  categoriaMasBalanceoMonto.innerText = `$${
    parseInt(balancePorCategoria[0][1].ganancias || 0) -
    parseInt(balancePorCategoria[0][1].gasto || 0)
  }`;
}

function totalPorCategorias() {
  tabTotalPorCat.innerHTML = "";
  const operacionesJSON = localStorage.getItem("operaciones");
  const operaciones = JSON.parse(operacionesJSON) || [];
  const categorias = agruparCategorias(operaciones);

  Object.entries(categorias).forEach(([categoria, datos]) => {
    const row = document.createElement("tr");
    const balance = datos.ganancias - datos.gastos;

    row.innerHTML = `
          <td class="text-left">${categoria}</td>
          <td class="text-green-600">$${datos.ganancias}</td>
          <td class="text-red-600">-$${datos.gastos}</td>
          <td class="${balance >= 0 ? "text-green-600" : "text-red-600"}">
              ${balance >= 0 ? "+" : "-"}$${Math.abs(balance)}
          </td>
      `;

    tabTotalPorCat.appendChild(row);
  });
}

function agruparPorMes(operaciones) {
  return operaciones.reduce((acumulador, operacion) => {
    const fecha = new Date(operacion.fecha);
    const mes = `${fecha.getFullYear()}-${fecha.getMonth() + 1}`;

    if (!acumulador[mes]) {
      acumulador[mes] = { ganancias: 0, gastos: 0 };
    }

    if (operacion.tipo === "Ganancia") {
      acumulador[mes].ganancias += parseFloat(operacion.monto);
    } else if (operacion.tipo === "Gasto") {
      acumulador[mes].gastos += parseFloat(operacion.monto);
    }

    return acumulador;
  }, []);
}

function totalPorMes() {
  tabTotalPorMes.innerHTML = "";
  const operacionesJSON = localStorage.getItem("operaciones");
  const operaciones = JSON.parse(operacionesJSON) || [];
  const meses = agruparPorMes(operaciones);

  Object.entries(meses).forEach(([mes, datos]) => {
    const row = document.createElement("tr");
    const balance = datos.ganancias - datos.gastos;

    row.innerHTML = `
          <td class="text-left">${mes}</td>
          <td class="text-green-600">$${datos.ganancias.toFixed(2)}</td>
          <td class="text-red-600">-$${datos.gastos.toFixed(2)}</td>
          <td class="${balance >= 0 ? "text-green-600" : "text-red-600"}">
              ${balance >= 0 ? "+" : "-"}$${Math.abs(balance).toFixed(2)}
          </td>
      `;

    tabTotalPorMes.appendChild(row);
  });
}
function mesMayorGanancia() {
  const operacionesJSON = localStorage.getItem("operaciones");
  const operaciones = JSON.parse(operacionesJSON) || [];
  const ganancias = operaciones.filter(
    (operacion) => operacion.tipo === "Ganancia"
  );
  let gananciasPorMes = Object.entries(agruparPorMes(ganancias));
  gananciasPorMes = gananciasPorMes.sort(
    ([, a], [, b]) => b.ganancias - a.ganancias
  );
  mesMasGananciaNombre.innerText = gananciasPorMes[0][0];
  mesMasGananciaMonto.innerText = `$${gananciasPorMes[0][1].ganancias}`;
}

function mesMayorGasto() {
  const operacionesJSON = localStorage.getItem("operaciones");
  const operaciones = JSON.parse(operacionesJSON) || [];
  const gastos = operaciones.filter((operacion) => operacion.tipo === "Gasto");
  let gastosPorMes = Object.entries(agruparPorMes(gastos));
  gastosPorMes = gastosPorMes.sort(([, a], [, b]) => b.gastos - a.gastos);
  mesMasGastoNombre.innerText = gastosPorMes[0][0];
  mesMasGastoMonto.innerText = `-$${gastosPorMes[0][1].gastos}`;
}

function ordenarMasReciente(operaciones) {
  return operaciones.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
}
function ordenarMenosReciente(operaciones) {
  return operaciones.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
}
function ordenarMayorMonto(operaciones) {
  return operaciones.sort((a, b) => b.monto - a.monto);
}
function ordenarMenorMonto(operaciones) {
  return operaciones.sort((a, b) => a.monto - b.monto);
}
function ordenarAZ(operaciones) {
  return operaciones.sort((a, b) => a.descripcion.localeCompare(b.descripcion));
}
function ordenarZA(operaciones) {
  return operaciones.sort((a, b) => b.descripcion.localeCompare(a.descripcion));
}
function ordenar(operaciones, orden) {
  switch (orden) {
    case "masReciente":
      return ordenarMasReciente(operaciones);
    case "menosReciente":
      return ordenarMenosReciente(operaciones);
    case "mayorMonto":
      return ordenarMayorMonto(operaciones);
    case "menorMonto":
      return ordenarMenorMonto(operaciones);
    case "a/z":
      return ordenarAZ(operaciones);
    case "z/a":
      return ordenarZA(operaciones);
    default:
      return operaciones;
  }
}

inputFiltrarOrden.addEventListener("change", listaDeOperaciones);

mostrarCategoriaInputFiltros();
listaDeOperaciones();
mostrarTablaCategorias();
mostrarTablaReporte();
categoriaMayorGanancia();
categoriaMayorGasto();
categoriaMayorBalance();
totalPorCategorias();
totalPorMes();
mesMayorGanancia();
mesMayorGasto();
