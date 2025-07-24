

document.addEventListener("DOMContentLoaded", function () {
  
  const sessionCode = localStorage.getItem("sessionCode");
  const horaSessionCode = localStorage.getItem("horaSessionCode");

  const modal = document.getElementById('welcomeModal');
  const nombreBienvenida = document.getElementById('nombreBienvenida');
  
  // Obtener elementos para cerrar el modal
  const closeBtn = document.querySelector('.close');
  const acceptBtn = document.getElementById('acceptBtn');
  
  // Obtener Body
  const body = document.querySelector('body')
  // instalar corrector
  setTimeout(function() {
    body.classList.remove("correctorBody")
  },1000)
  setTimeout(function() {
    body.classList.add("correctorBody")
  },1000)

  // Mostrar el modal cuando la página se carga
  if (localStorage.getItem("modalShow") == "true") {
    nombreBienvenida.textContent = localStorage.getItem("nombre")
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
  if (!sessionCode || !horaSessionCode) {
    alert("Sesión no válida. Redirigiendo al login...");
    window.location.href = "index.html";
    return;
  }





})