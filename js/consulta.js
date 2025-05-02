import { API_CONFIG, PROJECT_CONFIG } from "../config/config.js";
import {verificarSession} from "../functions/funcionesGenerales.js"

document.addEventListener("DOMContentLoaded", function () {
  const consultarBtn = document.getElementById("consultarBtn");
  // const obtenerInfoBtn = document.getElementById("obtenerInfoBtn");
  const modalBtn = document.getElementById("modalBtn");
  const tablaResultados = document.getElementById("resultadosTable").getElementsByTagName("tbody")[0];
  const loadingOverlay = document.getElementById("loadingOverlay");

  const sessionCode = localStorage.getItem("sessionCode");
  const horaSessionCode = localStorage.getItem("horaSessionCode");

  // Verificar sesión
  let rptVerificaSession = verificarSession(sessionCode,horaSessionCode)
  if (!rptVerificaSession.status) {
    alert(rptVerificaSession.mensaje)
    window.location.href = "index.html";
    return;
  }

  // Variables
  /**
   * @type {Array<{razonSocial: string, ruc: string, idSolicitud: string, origen: string, destino: string, fechaSalida: string, fechaLLegada: string}>}
   */
  let allData = [];

  /** @type {{RsFilt: string, rucFilt: string, idSolFilt: string, origen: string, destino: string}} */
  let filtroData = {
    RsFilt: "",
    rucFilt: "",
    idSolFilt: "",
    origen: "",
    destino: "",
  };

  let varID = "";

  // Mostrar spinner
  function showLoading() {
    loadingOverlay.style.display = "flex";
  }

  // Ocultar spinner
  function hideLoading() {
    loadingOverlay.style.display = "none";
  }

  // Función para habilitar el botón "Obtener Información"
  // function enableInfoButton() {
  //   obtenerInfoBtn.disabled = false;
  //   obtenerInfoBtn.classList.add("enabled");
  // }

  // Función para deshabilitar el botón "Obtener Información"
  // function disableInfoButton() {
  //   obtenerInfoBtn.disabled = true;
  //   obtenerInfoBtn.classList.remove("enabled");
  // }

  // Funcion Pintado Tabla
  /**
   * @param {Array<{razonSocial: string, ruc: string, idSolicitud: string, origen: string, destino: string, fechaSalida: string, fechaLLegada: string}>} listaEmpresas - Este parámetro debe ser un array.
   */
  function pintadoTabla(listaEmpresas) {
    tablaResultados.innerHTML = "";
    listaEmpresas.forEach((item) => {
      let linkIDDestino = `http://autorizacionesespeciales.proviasnac.gob.pe:8080/provias48a60tn/verFormDetalleSolicitudes48tn?idSol=${item.idSolicitud}`;

      const row = tablaResultados.insertRow();
      row.insertCell(0).textContent = item.razonSocial || "-/-";
      row.insertCell(1).textContent = item.ruc || "-/-";
      // row.insertCell(2).textContent = item.idSolicitud || "-/-";
      row.insertCell(2).textContent = item.origen || "-/-";
      row.insertCell(3).textContent = item.destino || "-/-";
      row.insertCell(4).textContent = item.fechaSalida || "-/-";
      row.insertCell(5).textContent = item.fechaLLegada || "-/-";

      let nuevoA = document.createElement("a");
      nuevoA.href = linkIDDestino;
      nuevoA.target = "_blank";
      nuevoA.textContent = "Ver en Provias";

      row.insertCell(6).appendChild(nuevoA);
    });
  }

  // Funcion de filtrado
  /**@param {{RsFilt: string, rucFilt: string, idSolFilt: string, origen: string, destino: string}} filtro  */
  function filtrado(filtro) {
    let dataFiltrada = allData;

    const cabeceraNombreEmpresa = document.getElementById("nombreEmpresaID");
    const cabeceraRuc = document.getElementById("rucID");
    // const cabeceraIdSolicitud = document.getElementById("idSolicitudID");
    const cabeceraOrigen = document.getElementById("origenID");
    const cabeceraDestino = document.getElementById("destinoID");

    if (filtro.RsFilt != "") {
      cabeceraNombreEmpresa.classList.add("cabeceraFiltrada");
      cabeceraNombreEmpresa.querySelector(".iconoCabeceraTabla").textContent = "❌";
      dataFiltrada = dataFiltrada.filter(
        (item) => item.razonSocial.includes(filtro.RsFilt) || item.razonSocial.includes(filtro.RsFilt.toUpperCase())
      );
    } else {
      cabeceraNombreEmpresa.classList.remove("cabeceraFiltrada");
      cabeceraNombreEmpresa.querySelector(".iconoCabeceraTabla").textContent = "🔎";
    }
    if (filtro.rucFilt != "") {
      cabeceraRuc.classList.add("cabeceraFiltrada");
      cabeceraRuc.querySelector(".iconoCabeceraTabla").textContent = "❌";
      dataFiltrada = dataFiltrada.filter(
        (item) => item.ruc.includes(filtro.rucFilt) || item.ruc.includes(filtro.rucFilt.toUpperCase())
      );
    } else {
      cabeceraRuc.classList.remove("cabeceraFiltrada");
      cabeceraRuc.querySelector(".iconoCabeceraTabla").textContent = "🔎";
    }
    // if (filtro.idSolFilt != "") {
    //   cabeceraIdSolicitud.classList.add("cabeceraFiltrada");
    //   cabeceraIdSolicitud.querySelector(".iconoCabeceraTabla").textContent = "❌";
    //   dataFiltrada = dataFiltrada.filter(
    //     (item) =>
    //       item.idSolicitud.includes(filtro.idSolFilt) || item.idSolicitud.includes(filtro.idSolFilt.toUpperCase())
    //   );
    // } else {
    //   cabeceraIdSolicitud.classList.remove("cabeceraFiltrada");
    //   cabeceraIdSolicitud.querySelector(".iconoCabeceraTabla").textContent = "🔎";
    // }
    if (filtro.origen != "") {
      cabeceraOrigen.classList.add("cabeceraFiltrada");
      cabeceraOrigen.querySelector(".iconoCabeceraTabla").textContent = "❌";
      dataFiltrada = dataFiltrada.filter(
        (item) => item.origen.includes(filtro.origen) || item.origen.includes(filtro.origen.toUpperCase())
      );
    } else {
      cabeceraOrigen.classList.remove("cabeceraFiltrada");
      cabeceraOrigen.querySelector(".iconoCabeceraTabla").textContent = "🔎";
    }
    if (filtro.destino != "") {
      cabeceraDestino.classList.add("cabeceraFiltrada");
      cabeceraDestino.querySelector(".iconoCabeceraTabla").textContent = "❌";
      dataFiltrada = dataFiltrada.filter(
        (item) => item.destino.includes(filtro.destino) || item.destino.includes(filtro.destino.toUpperCase())
      );
    } else {
      cabeceraDestino.classList.remove("cabeceraFiltrada");
      cabeceraDestino.querySelector(".iconoCabeceraTabla").textContent = "🔎";
    }

    pintadoTabla(dataFiltrada);
  }

  // Inicialmente deshabilitar el botón
  // disableInfoButton();

  consultarBtn.addEventListener("click", function () {
    const fechaInicio = document.getElementById("fechaInicio").value;
    const fechaFin = document.getElementById("fechaFin").value;
    const sessionCode = localStorage.getItem("sessionCode");

    if (!fechaInicio || !fechaFin) {
      alert("Por favor ingrese ambas fechas");
      return;
    }

    // disableInfoButton();
    allData = [];

    const fechaInicioPartes = fechaInicio.split("-");
    const fechaInicioFormateada = `${fechaInicioPartes[2]}/${fechaInicioPartes[1]}/${fechaInicioPartes[0]}`;

    const fechaFinPartes = fechaFin.split("-");
    const fechaFinFormateada = `${fechaFinPartes[2]}/${fechaFinPartes[1]}/${fechaFinPartes[0]}`;

    console.log(`fechaInicio ${fechaInicioFormateada}`);
    console.log(`fechaFin ${fechaFinFormateada}`);
    console.log(`Sesion code ${sessionCode}`);

    // Verificar sesión
    let rptVerificaSession2 = verificarSession(sessionCode,horaSessionCode)
    if (!rptVerificaSession2.status) {
      alert(rptVerificaSession2.mensaje)
      window.location.href = "index.html";
      return;
    }

    showLoading();
    // Limpiar tabla antes de nueva consulta
    tablaResultados.innerHTML = "";

    // Mostrar mensaje de carga
    const loadingRow = tablaResultados.insertRow();
    const loadingCell = loadingRow.insertCell(0);
    loadingCell.colSpan = 4;
    loadingCell.textContent = "Cargando datos...";
    loadingCell.style.textAlign = "center";

    //llamada a la API
    fetch(`${API_CONFIG.BASE_URL}/webInt/getDataFiltradaByFechasSession`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Authorization': `Bearer ${sessionCode}`
      },
      body: JSON.stringify({
        fechaIni: fechaInicioFormateada,
        fechaFin: fechaFinFormateada,
        sessionCode: sessionCode,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la consulta");
        }
        return response.json();
      })
      .then((data) => {
        // Limpiar mensaje de carga

        hideLoading();
        allData = data.dataEncontrada;

        // console.log(data);
        if (data.estatus == 400) {
          alert(`Error en Session, ${data.mensaje}`);
          window.location.href = "index.html";
          return;
        }

        tablaResultados.innerHTML = "";

        if (data.length === 0) {
          const emptyRow = tablaResultados.insertRow();
          const emptyCell = emptyRow.insertCell(0);
          emptyCell.colSpan = 4;
          emptyCell.textContent = "No se encontraron resultados";
          emptyCell.style.textAlign = "center";
          return;
        }

        // enableInfoButton();

        // Llenar la tabla con los resultados
        // data.listaEmpresas.forEach((item) => {
        //   const row = tablaResultados.insertRow();
        //   row.insertCell(0).textContent = item.razonSocial || "N/A";
        //   row.insertCell(1).textContent = item.ruc || "N/A";
        //   row.insertCell(2).textContent = item.idSolicitud || "N/A";
        //   // row.insertCell(3).textContent = item.valor || 'N/A';
        // });
        pintadoTabla(data.dataEncontrada);
      })
      .catch((error) => {
        hideLoading();
        // disableInfoButton();
        tablaResultados.innerHTML = "";
        const errorRow = tablaResultados.insertRow();
        const errorCell = errorRow.insertCell(0);
        errorCell.colSpan = 4;
        errorCell.textContent = "Error: " + error.message;
        errorCell.style.textAlign = "center";
        errorCell.style.color = "red";
      });
  });

  // obtenerInfoBtn.addEventListener("click", function () {
  //   if (!allData || allData.length === 0) return;
  //   const sessionCode = localStorage.getItem("sessionCode");
    
  //   if (allData.length > 200) {
  //     alert(`La consulta es muy costosa, ajuste las fechas`);
  //     return;
  //   }

  //   showLoading();
  //   fetch(`${API_CONFIG.BASE_URL}/webInt/getDataFiltradaSession`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       // 'Authorization': `Bearer ${sessionCode}`
  //     },
  //     body: JSON.stringify({
  //       listaEmpresas: allData,
  //       sessionCode: sessionCode,
  //     }),
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Error en la consulta");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {

  //       hideLoading();

  //       allData = data.dataEncontrada;

  //       console.log(data);
  //       pintadoTabla(allData);

  //     })
  //     .catch((error) => {
  //       hideLoading();
  //       disableInfoButton();
  //       tablaResultados.innerHTML = "";
  //       const errorRow = tablaResultados.insertRow();
  //       const errorCell = errorRow.insertCell(0);
  //       errorCell.colSpan = 4;
  //       errorCell.textContent = "Error: " + error.message;
  //       errorCell.style.textAlign = "center";
  //       errorCell.style.color = "red";
  //     });
  // });

  // Elementos para el modal
  const modal = document.getElementById("myModal");
  const closeBtn = document.getElementById("cancelBtn");
  const okBtn = document.getElementById("okBtn");
  const cancelBtn = document.getElementById("cancelBtn");
  const cabeceras = document.getElementById("resultadosTable");
  const textoModal = document.getElementById("modalTextarea");

  // Funcion mostrar Modal
  /**
   * @param {String} nombreModal - Este parámetro debe ser un array.
   */
  function mostrarModal(nombreModal) {
    modal.style.display = "flex"; // Mostrar modal
    const label = document.querySelector("#input-group-modal > label");
    label.textContent = `Filtrar ${nombreModal}`;

    let textoContenedor = "";
    switch (varID) {
      case "nombreEmpresaID":
        textoContenedor = filtroData.RsFilt;
        break;
      case "rucID":
        textoContenedor = filtroData.rucFilt;
        break;
      // case "idSolicitudID":
      //   textoContenedor = filtroData.idSolFilt
      //   break;
      case "origenID":
        textoContenedor = filtroData.origen;
        break;
      case "destinoID":
        textoContenedor = filtroData.destino;
        break;
      default:
        break;
    }
    textoModal.value = textoContenedor;

    textoModal.focus();
  }

  // Funcion ocultar Modal
  function ocultarModal() {
    modal.style.display = "none";
  }

  // modalBtn.addEventListener("click", function () {
  //   mostrarModal("Holi");
  // });

  // Cerrar modal al hacer clic en la X
  closeBtn.addEventListener("click", () => {
    ocultarModal();
  });

  // Cerrar modal al hacer clic en OK
  okBtn.addEventListener("click", () => {
    const text = document.getElementById("modalTextarea").value;
    console.log("Texto ingresado:", text); // Puedes hacer algo con el texto
    modal.style.display = "none";
  });

  // Cerrar modal al hacer clic en Cancelar
  cancelBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Cerrar modal al hacer clic fuera del contenido
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      // Si se hace clic en el fondo oscuro
      modal.style.display = "none";
    }
  });

  textoModal.addEventListener("input", function (e) {
    switch (varID) {
      case "nombreEmpresaID":
        filtroData.RsFilt = e.target.value;
        filtrado(filtroData);
        break;
      case "rucID":
        filtroData.rucFilt = e.target.value;
        filtrado(filtroData);
        break;
      // case "idSolicitudID":
      //   filtroData.idSolFilt = e.target.value;
      //   filtrado(filtroData);
      //   break;
      case "origenID":
        filtroData.origen = e.target.value;
        filtrado(filtroData);
        break;
      case "destinoID":
        filtroData.destino = e.target.value;
        filtrado(filtroData);
        break;
      default:
        break;
    }
  });

  // Cabeceras de Columnas
  cabeceras.addEventListener("click", (e) => {
    console.log(e.target);

    if (e.target.matches("th")) {
      console.log("Se hizo click al th");
      varID = e.target.id;
      mostrarModal(e.target.querySelector("div.cabeceraTabla").textContent);
    } else if (e.target.matches(".cabeceraTabla")) {
      console.log(e.target.parentElement.id);
      console.log("Se hizo click al cabeceraTabla");
      varID = e.target.parentElement.id;
      mostrarModal(e.target.textContent);
    } else if (e.target.matches(".iconoCabeceraTabla")) {
      console.log("Se hizo click al iconoCabeceraTabla");
      let idParent = e.target.parentElement.id;

      if (e.target.textContent == "❌") {
        switch (idParent) {
          case "nombreEmpresaID":
            filtroData.RsFilt = "";
            break;
          case "rucID":
            filtroData.rucFilt = "";
            break;
          // case "idSolicitudID":
          //   filtroData.idSolFilt = "";
          //   break;
          case "origenID":
            filtroData.origen = "";
            break;
          case "destinoID":
            filtroData.destino = "";
            break;
          default:
            break;
        }
        filtrado(filtroData);
      }
    }
    // mostrarModal(e.target.textContent);

    // if (e.target.matches('#nombreEmpresaID')) {
    //   mostrarModal()
    // }else if (e.target.matches('#nombreEmpresaID')) {

    // }else if (e.target.matches('#nombreEmpresaID')) {

    // }else if (e.target.matches('#nombreEmpresaID')) {

    // }else if (e.target.matches('#nombreEmpresaID')) {

    // }

    // console.log(e.target.matches('#nombreEmpresaID'))
  });
});
