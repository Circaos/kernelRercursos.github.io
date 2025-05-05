import {API_CONFIG} from "../config/config.js"

/**
 * @param {string} codigo 
 * @param {string} sessionCode 
 */
export async function leerMensajeTransimision(codigo,sessionCode) {
  const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.GET_TRANSMISION_LEER}`,{
    method: "POST",
    headers:{
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      code: codigo,
      sessionCode: sessionCode,
    }),
  })

  const data = await response.json()
  return data
}

/**
 * @param {string} codigo 
 * @param {string} mensaje 
 * @param {string} sessionCode 
 */
export async function enviarMensajeTransimision(codigo,mensaje,sessionCode) {
  const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.GET_TRANSMISION_ADD}`,{
    method: "POST",
    headers:{
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      code: codigo,
      mensaje: mensaje,
      sessionCode: sessionCode,
    }),
  })

  const data = await response.json()
  return data
}

/**
  *@param {string} dni  
  *@param {string} sessionCode  
*/
export async function consultaDNI(dni,sessionCode) {
  const response = await fetch(`${API_CONFIG.BASE_URL}/dni/postDNI`,{
    method: "POST",
    headers:{
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      dni: dni,
      sessionCode: sessionCode,
    }),
  })
  const data = await response.json()
  // console.log(data)
  return data
}

/**
  *@param {string} ruc  
  *@param {string} sessionCode  
*/
export async function consultaRUC(ruc,sessionCode) {
  const response = await fetch(`${API_CONFIG.BASE_URL}/dni/postRUC`,{
    method: "POST",
    headers:{
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      ruc: ruc,
      sessionCode: sessionCode,
    }),
  })
  const data = await response.json()
  // console.log(data)
  return data
}

/**
  *@param {string} nombres  
  *@param {string} apellidoPaterno    
  *@param {string} apellidoMaterno    
  *@param {string} sessionCode    
*/
export async function consultaDniPorDatos(nombres, apellidoPaterno, apellidoMaterno,sessionCode) {
  const response = await fetch(`${API_CONFIG.BASE_URL}/dni/postDatosDNI`,{
    method: "POST",
    headers:{
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      nombres: nombres,
      apellidoPaterno: apellidoPaterno,
      apellidoMaterno: apellidoMaterno,
      sessionCode: sessionCode,
    }),
  })
  const data = await response.json()
  // console.log(data)
  return data
}

/**@param {string} dni  *@param {string} sessionCode */
export async function consultaFechaNacimientoPorDni(dni,sessionCode) {
  const response = await fetch(`${API_CONFIG.BASE_URL}/dni/fechaNacimiento`,{
    method: "POST",
    headers:{
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      dni: dni,
      sessionCode: sessionCode,
    }),
  })
  const data = await response.json()
  console.log(data)
  return data
}

// const utlis = {
//   consultaDNI
// }

// export default utlis;