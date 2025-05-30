import { leerMensajeTransimision, enviarMensajeTransimision } from "../functions/consultashttp.js";
import {verificarSession} from "../functions/funcionesGenerales.js"

document.addEventListener("DOMContentLoaded", function () {
  const btnEnviar = document.getElementById("enviar-button");
  const btnLeer = document.getElementById("leer-button");
  const taArea = document.getElementById("text-area");
  const tiImput = document.getElementById("text-input");
  const cardAlerta = document.getElementById("card-alerta");
  const loadingOverlay = document.getElementById("loadingOverlay");

  const sessionCode = localStorage.getItem("sessionCode");
  const horaSessionCode = localStorage.getItem("horaSessionCode");

  // Verificar sesión
  let rptVerificaSession = verificarSession(sessionCode, horaSessionCode);
  if (!rptVerificaSession.status) {
    alert(rptVerificaSession.mensaje);
    window.location.href = "index.html";
    return;
  }

  // Funciones
  function verificarTextImput() {
    let texto = tiImput.value
    
    if (texto.length > 5 || texto.length < 2) {
      alert(`El codigo debe tenener entre 2 y 5 caracteres`)
      return {
        retorno: false,
        codigo: ""
      }
    }else{
      return {
        retorno: true,
        codigo: texto
      }
    }
  }
  // Mostrar/Ocultar spinner
  function showLoading() {
    loadingOverlay.style.display = "flex";
  }

  function hideLoading() {
    loadingOverlay.style.display = "none";
  }

  // Botones
  btnEnviar.addEventListener("click",async ()=>{
    
    let verificadoCodigo = verificarTextImput()
    if(!verificadoCodigo.retorno){
      return
    }

    let textAreaTexto = taArea.value
    const envioTransmision = await enviarMensajeTransimision(verificadoCodigo.codigo,textAreaTexto,sessionCode);

    if (envioTransmision.status == 200) {
      console.log("Envio correctamente")
    }
  })

  btnLeer.addEventListener("click",async ()=>{
    let verificadoCodigo = verificarTextImput()
    if(!verificadoCodigo.retorno){
      return
    }

    const leerTransmision = await leerMensajeTransimision(verificadoCodigo.codigo,sessionCode);

    if (leerTransmision.estatus == 200 || leerTransmision.estatus == 200) {
      console.log("Leido correctamente")
      console.log(leerTransmision)
      console.log(leerTransmision.mensaje)
      taArea.value = leerTransmision.mensaje
    }
  })

});
