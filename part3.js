const chatbox = document.getElementById("chatbox");
const userInput = document.getElementById("userInput");

// Função para adicionar uma mensagem na caixa de chat
function addMessage(message, sender) {
  const messageElement = document.createElement("div");
  messageElement.classList.add("message");
  if (sender === "user") {
    messageElement.classList.add("user-message");
  } else {
    messageElement.classList.add("ai-message");
  }
  messageElement.innerText = message;
  chatbox.appendChild(messageElement);
  chatbox.scrollTop = chatbox.scrollHeight;
}

// Função para enviar a mensagem do usuário e obter a resposta da IA
function sendMessage() {
  const message = userInput.value;
  addMessage(message, "user");
  userInput.value = "";

  // Chame a função de IA aqui para obter a resposta
  getAIResponse(message)
    .then(response => {
      addMessage(response, "ai");
    })
    .catch(error => {
      console.error('Erro na solicitação da API do GPT-3:', error);
      addMessage('Desculpe, ocorreu um erro ao obter a resposta da IA.', 'ai');
    });
}

// Função para obter a resposta da IA usando a API do GPT-3
async function getAIResponse(message) {
  const apiKey = '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'; // Substitua pela sua chave de API do OpenAI

  const apiUrl = 'https://api.openai.com/v1/engines/davinci-codex/completions';
  const prompt = message;
  const maxTokens = 50;

  const response = await axios.post(apiUrl, {
    prompt,
    max_tokens: maxTokens
  }, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    }
  });

  const { choices } = response.data;
  const aiResponse = choices[0].text.trim();
  return aiResponse;
}