import { verificarSession } from "../functions/funcionesGenerales.js";

document.addEventListener("DOMContentLoaded", function () {
  
  const sessionCode = localStorage.getItem("sessionCode");
  const horaSessionCode = localStorage.getItem("horaSessionCode");
  const nombreSession = localStorage.getItem("nombre");

  const modal = document.getElementById('welcomeModal');
  const nombreBienvenida = document.getElementById('nombreBienvenida');
  const nombreUsuario = document.getElementById('cabecera')

  // Obtener elementos para cerrar el modal
  const closeBtn = document.querySelector('.close');
  const acceptBtn = document.getElementById('acceptBtn');

  nombreUsuario.textContent = nombreSession

  // Mostrar el modal cuando la página se carga
  if (localStorage.getItem("modalShow") == "true") {
    nombreBienvenida.textContent = nombreSession
    localStorage.removeItem('modalShow')
    modal.style.display = 'block';
  }
  
  // Cuando el usuario hace clic en (x), cerrar el modal
  closeBtn.onclick = function() {
    modal.style.display = 'none';
  }
  
  // Cuando el usuario hace clic en el botón Aceptar, cerrar el modal
  acceptBtn.onclick = function() {
    modal.style.display = 'none';
  }
  
  // Cuando el usuario hace clic fuera del modal, cerrarlo
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  }


  // Verificar sesión
  let rptVerificaSession = verificarSession(sessionCode, horaSessionCode);
  if (!rptVerificaSession.status) {
    alert(rptVerificaSession.mensaje);
    localStorage.clear();
    window.location.href = "index.html";
    return;
  }





})