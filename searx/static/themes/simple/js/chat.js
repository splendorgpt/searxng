    const API_KEY = "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";

    async function generateText(prompt) {
      const url = "https://api.openai.com/v1/engines/text-davinci-003/completions";

      const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`,
      };

      const data = {
        "prompt": prompt,
        "max_tokens": 100,
      };

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: headers,
          body: JSON.stringify(data),
        });

        if (response.ok) {
          const responseData = await response.json();
          const generatedText = responseData.choices[0].text;
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

        // Crear y agregar la respuesta del asistente al contenedor de mensajes
        const assistantMessageElement = document.createElement('div');
        assistantMessageElement.className = 'message assistant';
        assistantMessageElement.textContent = generatedText;
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
