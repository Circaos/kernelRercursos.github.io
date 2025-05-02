

document.addEventListener("DOMContentLoaded", function () {
  
  const sessionCode = localStorage.getItem("sessionCode");
  const horaSessionCode = localStorage.getItem("horaSessionCode");

  // Verificar sesión
  if (!sessionCode || !horaSessionCode) {
    alert("Sesión no válida. Redirigiendo al login...");
    window.location.href = "index.html";
    return;
  }

})