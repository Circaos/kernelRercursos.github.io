import {API_CONFIG} from "../config/config.js"

document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const errorMessage = document.getElementById("errorMessage");

  showLoading()
  // Limpiar mensaje de error
  errorMessage.style.display = "none";

  // Simular llamada a la API (reemplazar con tu API real)
  fetch(`${API_CONFIG.BASE_URL}/webInt/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error en la autenticación");
      }
      return response.json();
    })
    .then((data) => {
      hideLoading()
      console.log(`Data recibida es ${data}`);

      if (data.status === 200) {
        // Guardar el código de sesión en localStorage
        console.log(data.sessionCode);
        localStorage.setItem("sessionCode", data.sessionCode);

        let hoy = new Date()
        localStorage.setItem("horaSessionCode",hoy.toISOString())


        localStorage.setItem("modalShow","true")
        localStorage.setItem("nombre",data.nombre)
        // Redirigir al dashboard
        window.location.href = "dashboard.html";
      } else {
        throw new Error(data.message || "Credenciales incorrectas");
      }
    })
    .catch((error) => {
      hideLoading()
      errorMessage.textContent = error.message;
      errorMessage.style.display = "block";
    });

  

  // Funciones del loading
    // Mostrar spinner
  function showLoading() {
    loadingOverlay.style.display = "flex";
  }

  // Ocultar spinner
  function hideLoading() {
    loadingOverlay.style.display = "none";
  }


});
