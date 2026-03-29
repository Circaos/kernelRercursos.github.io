import { verificarSession } from "../functions/funcionesGenerales.js"
import { API_CONFIG } from "../config/config.js"

// API endpoint (usando JSONPlaceholder como ejemplo, pero puedes cambiarlo)
// Para este ejemplo, usaremos una API pública que devuelve datos basados en búsqueda
// Cambia esta URL por la API que quieras usar
const API_URL = 'https://jsonplaceholder.typicode.com';

// Elementos del DOM
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const loading = document.getElementById('loading');
const errorMessage = document.getElementById('errorMessage');
const resultsContainer = document.getElementById('resultsContainer');
const tableHeader = document.getElementById('tableHeader');
const tableBody = document.getElementById('tableBody');
const resultCount = document.getElementById('resultCount');
const noResults = document.getElementById('noResults');

// Event listeners
searchBtn.addEventListener('click', performSearch);
searchInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    performSearch();
  }
});

//Variables globales
const sessionCode = localStorage.getItem("sessionCode");
const horaSessionCode = localStorage.getItem("horaSessionCode");


// Función principal de búsqueda
async function performSearch() {
  const searchTerm = searchInput.value.trim().toUpperCase();

  if (!searchTerm) {
    showError('Por favor, ingresa una palabra para buscar');
    return;
  }

  if (searchTerm.length < 3) {
    showError('Por favor, ingrese al menos 3 caracteres');
    return;
  }

  // Mostrar loading, ocultar resultados anteriores y errores
  showLoading();
  hideResults();
  hideError();

  try {
    // Llamar a la API - Aquí puedes modificar la URL según tu API
    // Ejemplo con JSONPlaceholder: busca posts que contengan el término
    const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.POST_BUSQUEDA_DB}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        sessionCode: sessionCode,
        palabras: [searchTerm]
      })
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const rptData = await response.json();

    // // También podemos hacer otra llamada a users para obtener más datos
    // const usersResponse = await fetch(`${API_URL}/users`);
    // const users = await usersResponse.json();

    // // Combinar datos para tener más información
    // const enrichedData = data.map(post => {
    //   const user = users.find(u => u.id === post.userId);
    //   return {
    //     ...post,
    //     authorName: user ? user.name : 'Desconocido',
    //     authorEmail: user ? user.email : 'No disponible'
    //   };
    // });

    // // Procesar y mostrar los datos
    // if (enrichedData && enrichedData.length > 0) {
    //   displayResults(enrichedData);
    // } else {
    //   showNoResults();
    // }


    console.log(rptData)

    if (rptData.estatus == 300) {
      localStorage.clear();
      alert(`Error en Session, ${rptData.mensaje}`);
      window.location.href = "index.html";
      return;
    } else if (rptData.estatus != 200) {
      showError(`ERROR: ${rptData.mensaje}`)
      return
    }

    displayResults2(rptData.data)

  } catch (error) {
    console.error('Error al obtener datos:', error);
    showError(`Error al buscar datos: ${error.message}`);
  } finally {
    hideLoading();
  }
}


function displayResults2(data) {
  if (!data || data.length === 0) {
    showNoResults();
    return;
  }

  const columns = ["DAM", "SERIE", "PART.", "ACOG.", "DESCRIPCION"]

  tableHeader.innerHTML = '';
  columns.forEach(column => {
    const th = document.createElement('th');
    th.textContent = formatColumnName(column);
    tableHeader.appendChild(th);
  });

  tableBody.innerHTML = '';
  data.forEach(item => {
    const tr = document.createElement('tr');

    const tdDAM = document.createElement('td');
    tdDAM.textContent = item["DAM"]
    tr.appendChild(tdDAM)

    const tdSerie = document.createElement('td');
    tdSerie.textContent = item["SERIE"]
    tr.appendChild(tdSerie)

    const tdPartida = document.createElement('td');
    tdPartida.textContent = item["PARTIDA"]
    tr.appendChild(tdPartida)

    const tdCodigoLiberatorio = document.createElement('td');
    tdCodigoLiberatorio.textContent = item["CODIGOLIBERATORIO"]
    // tdCodigoLiberatorio.textContent = (item["CODIGOLIBERATORIO"].length >= 17) ? item["CODIGOLIBERATORIO"].substring(0, 17) : item["CODIGOLIBERATORIO"]
    tr.appendChild(tdCodigoLiberatorio)



    const tdDescripcion = document.createElement('td');


    for (let index = 0; index <= 6; index++) {
      const trDescri = document.createElement('tr');
      trDescri.classList.add("trDescri")
      trDescri.textContent = item[`DESCRI${index}`]

      tdDescripcion.appendChild(trDescri)
    }

    // const trDescri0 = document.createElement('tr');
    // trDescri0.textContent = item["DESCRI0"]
    // const trDescri1 = document.createElement('tr');
    // trDescri1.textContent = item["DESCRI1"]
    // const trDescri2 = document.createElement('tr');
    // trDescri2.textContent = item["DESCRI2"]
    // const trDescri3 = document.createElement('tr');
    // trDescri3.textContent = item["DESCRI3"]
    // const trDescri4 = document.createElement('tr');
    // trDescri4.textContent = item["DESCRI4"]
    // const trDescri5 = document.createElement('tr');
    // trDescri5.textContent = item["DESCRI5"]
    // const trDescri6 = document.createElement('tr');
    // trDescri6.textContent = item["DESCRI6"]

    // tdDescripcion.appendChild(trDescri0)
    // tdDescripcion.appendChild(trDescri1)
    // tdDescripcion.appendChild(trDescri2)
    // tdDescripcion.appendChild(trDescri3)
    // tdDescripcion.appendChild(trDescri4)
    // tdDescripcion.appendChild(trDescri5)
    // tdDescripcion.appendChild(trDescri6)




    tr.appendChild(tdDescripcion)


    tableBody.appendChild(tr);
  })

  // Actualizar contador de resultados
  resultCount.textContent = `${data.length} resultado${data.length !== 1 ? 's' : ''}`;

  // Mostrar el contenedor de resultados
  resultsContainer.classList.remove('hidden');
  noResults.classList.add('hidden');


}

// Función para mostrar los resultados en tabla
function displayResults(data) {
  if (!data || data.length === 0) {
    showNoResults();
    return;
  }

  // Obtener todas las claves del primer objeto para las columnas
  const columns = Object.keys(data[0]);

  // Generar el header de la tabla
  tableHeader.innerHTML = '';
  columns.forEach(column => {
    const th = document.createElement('th');
    th.textContent = formatColumnName(column);
    tableHeader.appendChild(th);
  });

  // Generar el cuerpo de la tabla
  tableBody.innerHTML = '';
  data.forEach(item => {
    const tr = document.createElement('tr');
    columns.forEach(column => {
      const td = document.createElement('td');
      let value = item[column];

      // Formatear valores según tipo
      if (typeof value === 'object') {
        value = JSON.stringify(value);
      } else if (typeof value === 'boolean') {
        value = value ? '✓ Sí' : '✗ No';
      } else if (!value) {
        value = '—';
      }

      td.textContent = value;
      tr.appendChild(td);
    });
    tableBody.appendChild(tr);
  });

  // Actualizar contador de resultados
  resultCount.textContent = `${data.length} resultado${data.length !== 1 ? 's' : ''}`;

  // Mostrar el contenedor de resultados
  resultsContainer.classList.remove('hidden');
  noResults.classList.add('hidden');
}

// Función para formatear nombres de columnas
function formatColumnName(columnName) {
  // Convertir camelCase o snake_case a texto legible
  return columnName
    .replace(/([A-Z])/g, ' $1')
    .replace(/_/g, ' ')
    .replace(/^./, str => str.toUpperCase())
    .trim();
}

// Función para mostrar mensaje de error
function showError(message) {
  errorMessage.textContent = message;
  errorMessage.classList.remove('hidden');
}

// Función para ocultar mensaje de error
function hideError() {
  errorMessage.classList.add('hidden');
}

// Función para mostrar loading
function showLoading() {
  loading.classList.remove('hidden');
  searchBtn.disabled = true;
  searchBtn.textContent = 'Buscando...';
}

// Función para ocultar loading
function hideLoading() {
  loading.classList.add('hidden');
  searchBtn.disabled = false;
  searchBtn.textContent = 'Buscar';
}

// Función para mostrar mensaje de no resultados
function showNoResults() {
  resultsContainer.classList.add('hidden');
  noResults.classList.remove('hidden');
}

// Función para ocultar resultados
function hideResults() {
  resultsContainer.classList.add('hidden');
  noResults.classList.add('hidden');
}

// Función para probar con datos de ejemplo (útil para pruebas)
function loadSampleData() {
  const sampleData = [
    { id: 1, nombre: 'Ejemplo 1', descripcion: 'Este es un ejemplo de datos', categoria: 'Prueba' },
    { id: 2, nombre: 'Ejemplo 2', descripcion: 'Otro ejemplo de datos', categoria: 'Demo' },
    { id: 3, nombre: 'Ejemplo 3', descripcion: 'Tercer ejemplo', categoria: 'Prueba' }
  ];
  displayResults(sampleData);
}

// Función para configurar diferentes APIs (puedes personalizar según necesites)
function getApiEndpoint(searchTerm) {
  // Ejemplo: puedes cambiar la URL según lo que busques
  // Para este ejemplo usamos posts, pero podrías usar:
  // - https://api.publicapis.org/entries?title={searchTerm}
  // - https://api.dictionaryapi.dev/api/v2/entries/en/{searchTerm}
  // - https://api.github.com/search/repositories?q={searchTerm}

  return `${API_URL}/posts?title_like=${encodeURIComponent(searchTerm)}`;
}

// Opcional: agregar funcionalidad para cambiar entre APIs
// Esta función es solo un ejemplo de cómo podrías adaptar el código
function configureApi(apiType, searchTerm) {
  const apis = {
    posts: `https://jsonplaceholder.typicode.com/posts?q=${searchTerm}`,
    users: `https://jsonplaceholder.typicode.com/users?q=${searchTerm}`,
    comments: `https://jsonplaceholder.typicode.com/comments?q=${searchTerm}`
  };

  return apis[apiType] || apis.comments;
}

// Función para exportar datos a CSV (funcionalidad extra)
function exportToCSV(data) {
  if (!data || data.length === 0) return;

  const columns = Object.keys(data[0]);
  const csvRows = [];

  // Header
  csvRows.push(columns.join(','));

  // Data rows
  for (const row of data) {
    const values = columns.map(column => {
      let value = row[column];
      if (typeof value === 'object') {
        value = JSON.stringify(value);
      }
      return `"${String(value).replace(/"/g, '""')}"`;
    });
    csvRows.push(values.join(','));
  }

  // Descargar archivo
  const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'resultados_busqueda.csv';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Agregar botón de exportar (opcional)
// function addExportButton() {
//     const exportBtn = document.createElement('button');
//     exportBtn.textContent = '📥 Exportar a CSV';
//     exportBtn.className = 'btn-primary';
//     exportBtn.style.marginLeft = '10px';
//     exportBtn.onclick = () => {
//         const tableData = getCurrentTableData();
//         if (tableData.length > 0) {
//             exportToCSV(tableData);
//         }
//     };

//     const tableHeader = document.querySelector('.table-header');
//     if (tableHeader) {
//         tableHeader.appendChild(exportBtn);
//     }
// }

// Función para obtener datos actuales de la tabla
function getCurrentTableData() {
  const rows = tableBody.querySelectorAll('tr');
  const headers = tableHeader.querySelectorAll('th');
  const data = [];

  rows.forEach(row => {
    const cells = row.querySelectorAll('td');
    const rowData = {};
    headers.forEach((header, index) => {
      const columnName = header.textContent.toLowerCase().replace(/ /g, '_');
      rowData[columnName] = cells[index]?.textContent || '';
    });
    data.push(rowData);
  });

  return data;
}

// Inicializar la página
document.addEventListener('DOMContentLoaded', () => {
  console.log('Página cargada. Buscador listo para usar.');
  // Opcional: agregar botón de exportar
  // addExportButton();



  // Verificar sesión
  let rptVerificaSession = verificarSession(sessionCode, horaSessionCode)
  if (!rptVerificaSession.status) {
    localStorage.clear();
    alert(rptVerificaSession.mensaje)
    window.location.href = "index.html";
    return;
  }
});

// Ejemplo de cómo usar diferentes APIs (descomenta para probar)
/*
async function searchCustomApi(searchTerm) {
    // Ejemplo con API de diccionario
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchTerm}`);
    const data = await response.json();
    displayResults(data);
}
*/