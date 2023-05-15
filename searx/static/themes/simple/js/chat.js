const API_KEY = "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";
let conversationHistory = [];
async function generateText(message) {
  const url = "https://ai-connector.splendos.org/api/v1/chat";

  const headers = {
    "Content-Type": "application/json",
  };

  const data = {
    message,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const responseData = await response.json();
      const generatedText = responseData.response;
      return generatedText;
    } else {
      throw new Error(`${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}
const codeKeywords = ['function', 'var', '{', '}', '(', ')', ';'];
const btnGenerate = document.getElementById('btn-generate');

btnGenerate.addEventListener('click', async () => {
  const inputPrompt = document.getElementById("inputPrompt").value;
  const messagesContainer = document.getElementById("messages");

  // Crear y agregar el mensaje del usuario al contenedor de mensajes
  const userMessageElement = document.createElement('div');
  userMessageElement.className = 'message user';
  const userImage = document.createElement('img');
  userImage.src = 'path-to-user-image';  // Cambiar a la ruta de la imagen del usuario
  userImage.alt = 'User';
  userMessageElement.appendChild(userImage);
  const userText = document.createElement('p');
  userText.textContent = inputPrompt;
  userMessageElement.appendChild(userText);
  messagesContainer.appendChild(userMessageElement);

  try {
    const generatedText = await generateText(inputPrompt);
    const webTitle = "Web results:";
    const webUrl = "- Mi busqueda";

    let modifiedText = '';
    const lines = generatedText.split('\n');
    for (let line of lines) {
      let isCode = false;
      for (let keyword of codeKeywords) {
        if (line.includes(keyword)) {
          isCode = true;
          break;
        }
      }
      if (isCode) {
        modifiedText += `<pre><code>${line}</code></pre><br>`;
      } else {
        modifiedText += `${line}<br>`;
      }
    }
    modifiedText += `<br>${webTitle}<br><a href="${webUrl}" target="_blank">${webUrl}</a>`;
    // Crear y agregar la respuesta del asistente al contenedor de mensajes
    const assistantMessageElement = document.createElement('div');
    assistantMessageElement.className = 'message assistant';
    const assistantImage = document.createElement('img');
    assistantImage.src = 'path-to-assistant-image';  // Cambiar a la ruta de la imagen del asistente
    assistantImage.alt = 'Assistant';
    assistantMessageElement.appendChild(assistantImage);
    const assistantText = document.createElement('p');
    assistantText.innerHTML = modifiedText;
    assistantMessageElement.appendChild(assistantText);
    messagesContainer.appendChild(assistantMessageElement);
    // Limpiar el campo de entrada y mantener el scroll en la parte inferior
    document.getElementById("inputPrompt").value = '';
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  } catch (error) {
    const errorMessageElement = document.createElement('div');
    errorMessageElement.className = 'message assistant';
    const assistantImageError = document.createElement('img');
    assistantImageError.src = 'path-to-assistant-image';  // Cambiar a la ruta de la imagen del asistente
    assistantImageError.alt = 'Assistant';
    errorMessageElement.appendChild(assistantImageError);
    const errorText = document.createElement('p');
    errorText.textContent = `Error: ${error.message}`;
    errorMessageElement.appendChild(errorText);
    messagesContainer.appendChild(errorMessageElement);
  }
});
