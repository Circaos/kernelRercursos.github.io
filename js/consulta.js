document.addEventListener("DOMContentLoaded", function () {
  const consultarBtn = document.getElementById("consultarBtn");
  const obtenerInfoBtn = document.getElementById("obtenerInfoBtn");
  const tablaResultados = document
    .getElementById("resultadosTable")
    .getElementsByTagName("tbody")[0];
  const loadingOverlay = document.getElementById("loadingOverlay");

  // Variables
  let allData = [];

  // Mostrar spinner
  function showLoading() {
    loadingOverlay.style.display = "flex";
  }

  // Ocultar spinner
  function hideLoading() {
    loadingOverlay.style.display = "none";
  }

  // Función para habilitar el botón "Obtener Información"
  function enableInfoButton() {
    obtenerInfoBtn.disabled = false;
    obtenerInfoBtn.classList.add("enabled");
  }

  // Función para deshabilitar el botón "Obtener Información"
  function disableInfoButton() {
    obtenerInfoBtn.disabled = true;
    obtenerInfoBtn.classList.remove("enabled");
  }

  // Funcion Pintado Tabla
  /**
   * @param {Array<String>} listaEmpresas - Este parámetro debe ser un array.
   */
  function pintadoTabla(listaEmpresas) {
    tablaResultados.innerHTML = "";
    listaEmpresas.forEach((item) => {
      const row = tablaResultados.insertRow();
      row.insertCell(0).textContent = item.razonSocial || "-/-";
      row.insertCell(1).textContent = item.ruc || "-/-";
      row.insertCell(2).textContent = item.idSolicitud || "-/-";
      row.insertCell(3).textContent = item.origen || "-/-";
      row.insertCell(3).textContent = item.destino || "-/-";
      row.insertCell(3).textContent = item.fechaSalida || "-/-";
      row.insertCell(3).textContent = item.fechaLLegada || "-/-";
    });
  }

  // Inicialmente deshabilitar el botón
  disableInfoButton();

  consultarBtn.addEventListener("click", function () {
    const fechaInicio = document.getElementById("fechaInicio").value;
    const fechaFin = document.getElementById("fechaFin").value;
    const sessionCode = localStorage.getItem("sessionCode");

    if (!fechaInicio || !fechaFin) {
      alert("Por favor ingrese ambas fechas");
      return;
    }

    disableInfoButton();
    allData = [];

    const fechaInicioPartes = fechaInicio.split("-");
    const fechaInicioFormateada = `${fechaInicioPartes[2]}/${fechaInicioPartes[1]}/${fechaInicioPartes[0]}`;

    const fechaFinPartes = fechaFin.split("-");
    const fechaFinFormateada = `${fechaFinPartes[2]}/${fechaFinPartes[1]}/${fechaFinPartes[0]}`;

    console.log(`fechaInicio ${fechaInicioFormateada}`);
    console.log(`fechaFin ${fechaFinFormateada}`);
    console.log(`Sesion code ${sessionCode}`);
    if (!sessionCode) {
      alert("No cuenta con Session. Por favor inicie sesión.");
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

    // Simular llamada a la API (reemplazar con tu API real)
    fetch("http://192.168.1.39:1333/webInt/getInfoFechaProviasSession", {
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
        allData = data;

        console.log(data);
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

        enableInfoButton();

        // Llenar la tabla con los resultados
        // data.listaEmpresas.forEach((item) => {
        //   const row = tablaResultados.insertRow();
        //   row.insertCell(0).textContent = item.razonSocial || "N/A";
        //   row.insertCell(1).textContent = item.ruc || "N/A";
        //   row.insertCell(2).textContent = item.idSolicitud || "N/A";
        //   // row.insertCell(3).textContent = item.valor || 'N/A';
        // });
        pintadoTabla(data.listaEmpresas);
      })
      .catch((error) => {
        hideLoading();
        disableInfoButton();
        tablaResultados.innerHTML = "";
        const errorRow = tablaResultados.insertRow();
        const errorCell = errorRow.insertCell(0);
        errorCell.colSpan = 4;
        errorCell.textContent = "Error: " + error.message;
        errorCell.style.textAlign = "center";
        errorCell.style.color = "red";
      });
  });

  obtenerInfoBtn.addEventListener("click", function () {
    if (!allData || allData.length === 0) return;
    const sessionCode = localStorage.getItem("sessionCode");
    // Ejemplo alternativo: Mostrar resumen de información
    // const totalItems = allData.length;

    console.log(allData.listaEmpresas);

    // const firstDate = allData[0].fecha;
    // const lastDate = allData[totalItems - 1].fecha;

    // alert(`Información obtenida:\n\n- Total de registros: ${totalItems}\n- Fecha inicial: ${firstDate}\n- Fecha final: ${lastDate}`);
    showLoading()
    fetch("http://192.168.1.39:1333/webInt/getDataFiltradaSession", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Authorization': `Bearer ${sessionCode}`
      },
      body: JSON.stringify({
        listaEmpresas: allData.listaEmpresas,
        sessionCode: sessionCode
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



        // allData = data;

        console.log(data);
        pintadoTabla(data.dataEncontrada)
        // if (data.estatus == 400) {
        //   alert(`Error en Session, ${data.mensaje}`);
        //   window.location.href = "index.html";
        //   return;
        // }

        // tablaResultados.innerHTML = "";

        // if (data.length === 0) {
        //   const emptyRow = tablaResultados.insertRow();
        //   const emptyCell = emptyRow.insertCell(0);
        //   emptyCell.colSpan = 4;
        //   emptyCell.textContent = "No se encontraron resultados";
        //   emptyCell.style.textAlign = "center";
        //   return;
        // }

        // enableInfoButton();

        // pintadoTabla(data.listaEmpresas);
      })
      .catch((error) => {
        hideLoading();
        disableInfoButton();
        tablaResultados.innerHTML = "";
        const errorRow = tablaResultados.insertRow();
        const errorCell = errorRow.insertCell(0);
        errorCell.colSpan = 4;
        errorCell.textContent = "Error: " + error.message;
        errorCell.style.textAlign = "center";
        errorCell.style.color = "red";
      });
  });
});
