import {API_CONFIG} from "../config/config.js"

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