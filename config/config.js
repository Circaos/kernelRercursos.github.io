export const API_CONFIG = {
   // Puedes cambiarlo fácilmente si el servidor cambia
  // BASE_URL: "http://192.168.1.44:1333",
  // BASE_URL: "http://192.168.18.32:3000",
  BASE_URL: "https://apiproviaspruebav1-production.up.railway.app",
  ENDPOINTS: {
    GET_INFO_FECHA: "/webInt/getInfoFechaProviasSession",
    GET_DATA_FILTRADA: "/webInt/getDataFiltradaSession",
    GET_TRANSMISION_ADD: "/webInt/addMensaje",
    GET_TRANSMISION_LEER: "/webInt/leerMensaje",
  },
};

export const PROJECT_CONFIG = {
  RANGO_SESSION: 700
}
