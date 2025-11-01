import { PROJECT_CONFIG } from "../config/config.js";

/**
 *@param {string} sessionCode
 *@param {string} horaSessionCode
 */

export function verificarSession(sessionCode, horaSessionCode) {

  // console.log(`sessionCode ${sessionCode}`)
  // console.log(`horaSessionCode ${horaSessionCode}`)

  let rpt = {
    status: false,
    mensaje: "--",
  };

  if (!sessionCode || !horaSessionCode) {
    // alert("Sesión no válida. Redirigiendo al login...");
    // window.location.href = "index.html";
    (rpt.status = false), (rpt.mensaje = "Sesión no válida. Redirigiendo al login...");
    return rpt;
  } else {
    let horaGuardadaAsendida = new Date(horaSessionCode);
    console.log("horaSessionCode",horaGuardadaAsendida)
    horaGuardadaAsendida.setMinutes(horaGuardadaAsendida.getMinutes() + PROJECT_CONFIG.RANGO_SESSION);
    let horaAhora = new Date();
    console.log("horaAhora",horaAhora)
    console.log("horaGuardadaAsendida",horaGuardadaAsendida)
    if (horaGuardadaAsendida <= horaAhora) {
      // alert("Sesión expirada. Redirigiendo al login...");
      // window.location.href = "index.html";
      rpt.status = false;
      rpt.mensaje = "Sesión expirada. Redirigiendo al login...";
      return rpt;
    } else {
      rpt.status = true;
      rpt.mensaje = "todo OK";
      return rpt;
    }
  }
}
