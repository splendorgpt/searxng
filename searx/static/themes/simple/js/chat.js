 const API_KEY = "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";

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

    const btnGenerate = document.getElementById('btn-generate');

    btnGenerate.addEventListener('click', async () => {
      const inputPrompt = document.getElementById("inputPrompt").value;
      const messagesContainer = document.getElementById("messages");

      // Crear y agregar el mensaje del usuario al contenedor de mensajes
      const userMessageElement = document.createElement('div');
      userMessageElement.className = 'message user';
      userMessageElement.textContent = inputPrompt;
      messagesContainer.appendChild(userMessageElement);

      try {
         const generatedText = await generateText(inputPrompt);
         const webTitle = "Website:";
        const webUrl = "https://splendos.org/search";
        const modifiedText = generatedText + `<br><br>${webTitle} <br><br><a href="${webUrl}" target="_blank">${webUrl}</a>`;

        // Crear y agregar la respuesta del asistente al contenedor de mensajes
        const assistantMessageElement = document.createElement('div');
        assistantMessageElement.className = 'message assistant';
        assistantMessageElement.innerHTML = modifiedText;
        messagesContainer.appendChild(assistantMessageElement);

        // Limpiar el campo de entrada y mantener el scroll en la parte inferior
        document.getElementById("inputPrompt").value = '';
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      } catch (error) {
        const errorMessageElement = document.createElement('div');
        errorMessageElement.className = 'message assistant';
        errorMessageElement.textContent = `Error: ${error.message}`;
        messagesContainer.appendChild(errorMessageElement);
      }
    });
