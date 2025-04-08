document.addEventListener("DOMContentLoaded", function () {
  const btn = document.getElementById("btnPrueba");

  btn.addEventListener("click", (e) => {
    console.log("Se hizo CLikc");
    // Simular llamada a la API (reemplazar con tu API real)
    fetch("https://api.apis.net.pe/v2/reniec/dni?numero=74094660", {
      method: "GET",
      headers: {
        // "Content-Type": "application/json",
        Referer: "http://apis.net.pe/api-ruc",
        Authorization: "Bearer apis-token-13573.ls4iP8pxaFlIhtKxXBrdboEU0shN0DFu",
        // 'Authorization': `Bearer ${sessionCode}`
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la consulta");
        }
        console.log(`response ${response}`);
        return response;
      })
      .then((data) => {
        console.log(`data ${data}`);
      })
      .catch((error) => {
        console.log(`Error ${error}`);

        // // tablaResultados.innerHTML = "";
        // const errorRow = tablaResultados.insertRow();
        // const errorCell = errorRow.insertCell(0);
        // errorCell.colSpan = 4;
        // errorCell.textContent = "Error: " + error.message;
        // errorCell.style.textAlign = "center";
        // errorCell.style.color = "red";
      });
  });
});
