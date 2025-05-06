import { enviarArchivo, obtenerFilePath, obtenerUrlDescarga } from "../functions/consultashttpTelegram.js";

// Reemplaza con el token de tu bot
const BOT_TOKEN = "7809689147:AAHso8x4iV7NXpEGIz54X5eKiHsKixTcYfA";
const CHAT_ID = "-4601444223";

document.getElementById("sendButton").addEventListener("click", async function (e) {
  e.preventDefault();

  const fileInput = document.getElementById("document");
  const caption = document.getElementById("caption").value;
  const statusDiv = document.getElementById("status");

  const qrDiv = document.getElementById("qrCode");


  const sendButton = document.getElementById("sendButton");
  sendButton.disabled = true;
  sendButton.textContent = "Enviando...";
  statusDiv.textContent = "";
  statusDiv.className = "";

  try {
    let rpt = await enviarArchivo(BOT_TOKEN, CHAT_ID, fileInput);

    console.table(rpt);

    if (rpt.estadoRespuesta) {
      statusDiv.textContent = rpt.mensaje;
      statusDiv.className = "success";
      qrDiv.innerHTML = ""
      // Limpiar el formulario
      document.getElementById("documentForm").reset();

      let rpt2 = await obtenerFilePath(BOT_TOKEN, rpt.fileId);
      let linkDescarga = obtenerUrlDescarga(BOT_TOKEN, rpt2.filePath);

      console.log(`LinkDescarga: ${linkDescarga}`);
      
      // const qrDiv = document.getElementById("qrCode");
      qrDiv.innerHTML = ""; // Limpiar QR anterior

      QRCode.toCanvas(linkDescarga, { width: 200 }, (error, canvas) => {
          if (error) return console.error(error);
          qrDiv.appendChild(canvas);
      });

    } else {
      statusDiv.textContent = `Alerta: ${rpt.mensaje}`;
      statusDiv.className = "alerta";
    }

    // if (!fileInput.files || fileInput.files.length === 0) {
    //     throw new Error('Por favor selecciona un documento');
    // }

    // const file = fileInput.files[0];
    // const formData = new FormData();

    // formData.append('chat_id', chatId);
    // formData.append('document', file);
    // if (caption) {
    //     formData.append('caption', caption);
    // }

    // const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendDocument`, {
    //     method: 'POST',
    //     body: formData
    // });

    // const result = await response.json();

    // console.log('Respuesta completa:', JSON.stringify(result, null, 2));
    // console.table(result)
    // // console.log(`resultado ${result}`)

    // if (result.ok) {
    //     statusDiv.textContent = '✅ Documento enviado con éxito!';
    //     statusDiv.className = 'success';
    //     // Limpiar el formulario
    //     document.getElementById('documentForm').reset();
    // } else {
    //     throw new Error(result.description || 'Error al enviar el documento');
    // }
  } catch (error) {
    console.error("Error:-", error);
    statusDiv.textContent = `❌ Error: ${error.message}`;
    statusDiv.className = "error";
  } finally {
    sendButton.disabled = false;
    sendButton.textContent = "Enviar Documento";
  }
});
