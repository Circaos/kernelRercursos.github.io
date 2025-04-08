import { consultaDNI, consultaRUC,consultaDniPorDatos } from "../functions/consultashttp.js";

document.addEventListener("DOMContentLoaded", function () {
  // Variables globales
  const loadingOverlay = document.getElementById("loadingOverlay");
  const sessionCode = localStorage.getItem("sessionCode");

  // Verificar sesión
  if (!sessionCode) {
    alert("Sesión no válida. Redirigiendo al login...");
    window.location.href = "index.html";
    return;
  }

  // Mostrar/Ocultar spinner
  function showLoading() {
    loadingOverlay.style.display = "flex";
  }

  function hideLoading() {
    loadingOverlay.style.display = "none";
  }

  function ocultarAlertaDNI() {
    const alerta = document.getElementById("card-alerta");
    alerta.classList.add("ocultarClass");
  }
  function ocultarAlertaRUC() {
    const alerta = document.getElementById("card-alerta-ruc");
    alerta.classList.add("ocultarClass");
  }

  function ocultarAlertaDniDatos() {
    const alerta = document.getElementById("card-alerta-dni-datos");
    alerta.classList.add("ocultarClass");
  }

  function mostrarAlertaDNI(msg) {
    const alerta = document.getElementById("card-alerta");
    alerta.querySelector("h3").textContent = `Error: ${msg}`;
    alerta.classList.remove("ocultarClass");
  }

  function mostrarAlertaRUC(msg) {
    const alerta = document.getElementById("card-alerta-ruc");
    alerta.querySelector("h3").textContent = `Error: ${msg}`;
    alerta.classList.remove("ocultarClass");
  }

  function mostrarAlertaDniDatos(msg) {
    const alerta = document.getElementById("card-alerta-dni-datos");
    alerta.querySelector("h3").textContent = `Error: ${msg}`;
    alerta.classList.remove("ocultarClass");
  }

  // Manejo de pestañas
  const tabButtons = document.querySelectorAll(".informes-tab-button");
  const tabContents = document.querySelectorAll(".informes-tab-content");

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      console.log("click");

      const tabId = button.getAttribute("data-tab");

      // Cambiar pestaña activa
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      tabContents.forEach((content) => content.classList.remove("active"));

      button.classList.add("active");
      document.getElementById(tabId).classList.add("active");
    });
  });

  // Manejo de consultas
  const consultarButtons = document.querySelectorAll(".informes-consultar-btn");

  consultarButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const tabId = this.getAttribute("data-tab");
      consultarInforme(tabId);
    });
  });

  // Función para realizar consultas
  async function consultarInforme(tabId) {
    showLoading();

    switch (tabId) {
      case "tab1":
        LimpiarCardDNI();
        ocultarAlertaDNI();

        let dni = document.getElementById("tab1-campo1").value;
        const response = await consultaDNI(dni, sessionCode);
        console.log(response);

        if (response.estatus == 200) {
          if (response.data.message) {
            mostrarAlertaDNI(response.data.message);
          } else {
            pintarCardDNI(response.data);
          }
        } else if (response.estatus == 300) {
          alert(`Error en Session, ${response.mensaje}`);
          window.location.href = "index.html";
          return;
        } else {
          mostrarAlertaDNI(response.mensaje);
        }
        break;
      case "tab2":
        LimpiarCardRUC();
        ocultarAlertaRUC();

        let ruc = document.getElementById("tab2-campo1").value;
        const responseRUC = await consultaRUC(ruc, sessionCode);
        console.log(responseRUC);

        if (responseRUC.estatus == 200) {
          if (responseRUC.data.message) {
            mostrarAlertaRUC(responseRUC.data.message);
          } else {
            pintarCardRUC(responseRUC.data);
          }
        } else if (responseRUC.estatus == 300) {
          alert(`Error en Session, ${responseRUC.mensaje}`);
          window.location.href = "index.html";
          return;
        } else {
          mostrarAlertaRUC(responseRUC.mensaje);
        }
        break;
      case "tab3":
        LimpiarTablaDatosDNI();
        ocultarAlertaDniDatos();

        let nombres = document.getElementById("tab3-campo1").value;
        let apellidoPaterno = document.getElementById("tab3-campo2").value;
        let apellidoMaterno = document.getElementById("tab3-campo3").value;
        const responseDatosDNI = await consultaDniPorDatos(nombres,apellidoPaterno,apellidoMaterno, sessionCode);
        console.log(responseDatosDNI);

        if (responseDatosDNI.estatus == 200) {
          if (responseDatosDNI.data.message) {
            mostrarAlertaDniDatos(responseDatosDNI.data.message);
          } else {
            rellenarTablaDniDatos(responseDatosDNI.data.resultados);
          }
        } else if (responseDatosDNI.estatus == 300) {
          alert(`Error en Session, ${responseDatosDNI.mensaje}`);
          window.location.href = "index.html";
          return;
        } else {
          mostrarAlertaDniDatos(responseDatosDNI.mensaje);
        }
        break;
      case "tab4":
        params = {
          seleccion: document.getElementById("tab4-campo1").value,
          busqueda: document.getElementById("tab4-campo2").value,
          tipo: "informe4",
        };
        break;
    }
    hideLoading();
  }

  // Limpiar Card DNI
  function LimpiarCardDNI() {
    const carBody = document.getElementById("card-body");
    carBody.innerHTML = "";
  }

  // Limpiar Card RUC
  function LimpiarCardRUC() {
    const carBody = document.getElementById("card-body-ruc");
    carBody.innerHTML = "";
  }

  // Limpiar tabla DNI Datos
  function LimpiarTablaDatosDNI() {
    const tablaBody = document.querySelector(`#tabla-resultados3 tbody`);
    tablaBody.innerHTML = "";
  }

  // Funcion Pintar Card DNI
  /**@param {{nombres:string, apellidoPaterno:string, apellidoMaterno:string,numeroDocumento:string,digitoVerificador:string}} data */
  function pintarCardDNI(data) {
    const carBody = document.getElementById("card-body");

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        // Filtra solo propiedades propias del objeto
        const row = document.createElement("div");
        row.className = "informes-data-row";

        const keySpan = document.createElement("span");
        keySpan.className = "informes-data-key";
        keySpan.textContent = `${key}:`;

        const valueSpan = document.createElement("span");
        valueSpan.className = "informes-data-value";
        valueSpan.id = `card-${key.toLowerCase()}`; // ID único por propiedad
        valueSpan.textContent = data[key];

        row.appendChild(keySpan);
        row.appendChild(valueSpan);
        carBody.appendChild(row);
      }
    }
  }

  // Funcion Pintar Card Ruc
  /**@param {{nombres:string, apellidoPaterno:string, apellidoMaterno:string,numeroDocumento:string,digitoVerificador:string}} data */
  function pintarCardRUC(data) {
    const carBody = document.getElementById("card-body-ruc");

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        // Filtra solo propiedades propias del objeto
        const row = document.createElement("div");
        row.className = "informes-data-row";

        const keySpan = document.createElement("span");
        keySpan.className = "informes-data-key";
        keySpan.textContent = `${key}:`;

        const valueSpan = document.createElement("span");
        valueSpan.className = "informes-data-value";
        valueSpan.id = `card-${key.toLowerCase()}`; // ID único por propiedad
        valueSpan.textContent = data[key];

        row.appendChild(keySpan);
        row.appendChild(valueSpan);
        carBody.appendChild(row);
      }
    }
  }

  // Rellenar Tabla
  /**@param {{numero:string, nombres:string, apellido_paterno:string,apellido_materno:string}[]} data */
  function rellenarTablaDniDatos(data) {
    if (!Array.isArray(data)) {
      return mostrarAlertaDniDatos(data.mensaje);
    }

    const tablaBody = document.querySelector(`#tabla-resultados3 tbody`);
    tablaBody.innerHTML = "";
    data.forEach((item) => {
      const row = tablaBody.insertRow();
      row.insertCell(0).textContent = item.numero || "N/A";
      row.insertCell(1).textContent = item.nombres || "N/A";
      row.insertCell(2).textContent = item.apellido_paterno || "N/A";
      row.insertCell(3).textContent = item.apellido_materno || "N/A";
    });
  }

  // Función para mostrar resultados en la tabla
  function mostrarResultados(tabId, data) {
    const tablaBody = document.querySelector(`#${tabId} table tbody`);
    tablaBody.innerHTML = "";

    if (!data || data.length === 0) {
      tablaBody.innerHTML = '<tr><td colspan="4" style="text-align: center;">No se encontraron resultados</td></tr>';
      return;
    }

    // Llenar tabla según el tipo de informe
    switch (tabId) {
      case "tab1":
        data.forEach((item) => {
          const row = tablaBody.insertRow();
          row.insertCell(0).textContent = item.id || "N/A";
          row.insertCell(1).textContent = item.nombre || "N/A";
          row.insertCell(2).textContent = item.valor || "N/A";
          row.insertCell(3).textContent = item.fecha || "N/A";
        });
        break;
      case "tab2":
        data.forEach((item) => {
          const row = tablaBody.insertRow();
          row.insertCell(0).textContent = item.codigo || "N/A";
          row.insertCell(1).textContent = item.descripcion || "N/A";
          row.insertCell(2).textContent = item.cantidad || "N/A";
          row.insertCell(3).textContent = item.estado || "N/A";
        });
        break;
      case "tab3":
        data.forEach((item) => {
          const row = tablaBody.insertRow();
          row.insertCell(0).textContent = item.numero || "N/A";
          row.insertCell(1).textContent = item.concepto || "N/A";
          row.insertCell(2).textContent = item.monto ? `$${item.monto.toFixed(2)}` : "N/A";
          row.insertCell(3).textContent = item.porcentaje ? `${item.porcentaje}%` : "N/A";
        });
        break;
      case "tab4":
        data.forEach((item) => {
          const row = tablaBody.insertRow();
          row.insertCell(0).textContent = item.referencia || "N/A";
          row.insertCell(1).textContent = item.cliente || "N/A";
          row.insertCell(2).textContent = item.total ? `$${item.total.toFixed(2)}` : "N/A";
          row.insertCell(3).textContent = item.fecha || "N/A";
        });
        break;
    }
  }

  // Función para mostrar resultados en la card (pestaña 1)
  function mostrarResultadosCard(data) {
    const card = document.getElementById("card-resultados1");

    if (!data || data.length === 0) {
      card.querySelector(".informes-card-body").innerHTML =
        '<div class="informes-no-data">No se encontraron resultados</div>';
      return;
    }

    // Tomar el primer resultado (o modificar según tu lógica)
    const item = data[0];

    // Actualizar valores
    document.getElementById("card-id").textContent = item.id || "N/A";
    document.getElementById("card-nombre").textContent = item.nombre || "N/A";
    document.getElementById("card-valor").textContent = item.valor ? `$${item.valor}` : "N/A";
    document.getElementById("card-fecha").textContent = item.fecha || "N/A";

    // Estado con estilo condicional
    const estadoElement = document.getElementById("card-estado");
    estadoElement.textContent = item.estado || "N/A";
    estadoElement.setAttribute("data-status", (item.estado || "").toLowerCase());

    // Fechas
    document.getElementById("card-actualizacion").textContent = item.actualizacion || "N/A";
    document.getElementById("card-consulta").textContent = new Date().toLocaleString();

    // Mostrar la card si estaba oculta
    card.style.display = "block";
  }

  // Modificar la función mostrarResultados para la pestaña 1
  function mostrarResultados(tabId, data) {
    if (tabId === "tab1") {
      mostrarResultadosCard(data);
    } else {
      // ... (el resto del código para otras pestañas)
    }
  }

  // Añadir eventos para los botones de la card
  document.querySelector(".informes-print-btn")?.addEventListener("click", () => {
    window.print();
  });

  // Eliminar alerta DNI
  document.querySelector(".delete-alert-btn")?.addEventListener("click", () => {
    ocultarAlertaDNI();
  });

  // Eliminar alerta RUC
  document.querySelector(".delete-alert-btnRUC")?.addEventListener("click", () => {
    ocultarAlertaRUC();
  });

  // Eliminar alerta DNI datos
  document.querySelector(".delete-alert-btn-dni-datos")?.addEventListener("click", () => {
    ocultarAlertaDniDatos();
  });
});
