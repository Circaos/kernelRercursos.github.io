import { verificarSession } from "../functions/funcionesGenerales.js";


document.addEventListener("DOMContentLoaded", function () {

  const sessionCode = localStorage.getItem("sessionCode");
  const horaSessionCode = localStorage.getItem("horaSessionCode");
  const nombreSession = localStorage.getItem("nombre");

  // Verificar sesión
  let rptVerificaSession = verificarSession(sessionCode, horaSessionCode);
  if (!rptVerificaSession.status) {
    console.log("11")
    // alert(rptVerificaSession.mensaje);
    localStorage.clear();
  }else{
    console.log("22")
    window.location.href = "dashboard.html";
    return
  }

})