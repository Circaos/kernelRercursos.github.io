/**
 * @param {string} botToken
 * @param {string} chatId
 * @param {HTMLElement} fileInput
 */
export async function enviarArchivo(botToken, chatId, fileInput) {
  const BOT_TOKEN = botToken;
  if (!fileInput.files || fileInput.files.length === 0) {
    console.log("error seleccionar archivo");

    return {
      estadoRespuesta: false,
      mensaje: "⚠️ Por favor selecciona un documento",
    };
  }

  const file = fileInput.files[0];
  const formData = new FormData();

  formData.append("chat_id", chatId);
  formData.append("document", file);
  // formData.append("filename", "pruebaFileName");
  // formData.append("caption","pRUEBA CAPTION")
  if (caption) {
    formData.append("caption", caption);
  }

  const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendDocument`, {
    method: "POST",
    body: formData,
  });

  const result = await response.json();

  // console.log("Respuesta completa:", JSON.stringify(result, null, 2));
  // console.table(result);
  if (result.ok) {
    return {
      estadoRespuesta: true,
      mensaje: "✅ Documento enviado con éxito!",
      fileId: result.result.document.file_id
    };
  } else {
    return {
      estadoRespuesta: false,
      mensaje: "⚠️ Error al enviar el documento",
    };
  }
}
/**
 * @param {string} botToken 
 * @param {string} fileId 
 */
export async function obtenerFilePath(botToken, fileId) {
  const response = await fetch(`https://api.telegram.org/bot${botToken}/getFile?file_id=${fileId}`)

  const respuesta = await response.json()

  if (respuesta.ok) {
    return{
      estadoRespuesta: true,
      filePath: respuesta.result.file_path
    }
  }else{
    return{
      estadoRespuesta: false,
      filePath: ""
    }
  }
}

/**
 * @param {string} botToken 
 * @param {string} filePath 
 */
export function obtenerUrlDescarga(botToken, filePath) {
  return `https://api.telegram.org/file/bot${botToken}/${filePath}`
}