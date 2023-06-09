const chatLog = document.getElementById('chat-log');
const userMessageInput = document.getElementById('user-message');
const sendButton = document.getElementById('send-button');
const clearButton = document.getElementById('clear-button');
const stopButton = document.getElementById('stop-button');
let isBotStopped = false;
let isBotTyping = false;

sendButton.addEventListener('click', sendMessage);
clearButton.addEventListener('click', clearMessages);
stopButton.addEventListener('click', stopBotMessages);
userMessageInput.addEventListener('keyup', function(event) {
  if (event.keyCode === 13) {
    sendMessage();
  }
});

function sendMessage() {
  const userMessage = userMessageInput.value;
  if (userMessage) {
    appendMessage('user', userMessage);
    if (!isBotStopped && !isBotTyping) {
      sendButton.innerHTML = 'Generating...'; // Update button text
      sendButton.disabled = true; // Disable the send button
      generateBotResponse(userMessage);
    }
    userMessageInput.value = '';
  }
}

function generateBotResponse(userMessage) {
  // Simulate bot response (replace with your own logic)
  const botMessage = 'This is a sample bot response.';

  displayBotResponseTyping(botMessage);
}

function displayBotResponseTyping(botMessage) {
  const botMessageDiv = document.createElement('div');
  botMessageDiv.classList.add('message');
  botMessageDiv.classList.add('bot-message');

  chatLog.appendChild(botMessageDiv);
  chatLog.scrollTop = chatLog.scrollHeight;

  let currentCharIndex = 0;

  const typingInterval = setInterval(function() {
    if (isBotStopped) {
      clearInterval(typingInterval);
      isBotStopped = false;
      stopButton.style.backgroundColor = '#f44336';
      isBotTyping = false;
      sendButton.disabled = false;
      sendButton.innerHTML = 'Send';
      return;
    }

    if (currentCharIndex < botMessage.length) {
      const currentText = botMessage.substr(0, currentCharIndex + 1);
      botMessageDiv.innerHTML = `<p><strong>Bot:</strong> ${currentText}</p>`;
      currentCharIndex++;
    } else {
      clearInterval(typingInterval);
      isBotTyping = false;
      sendButton.disabled = false;
      sendButton.innerHTML = 'Send';
    }
  }, 100); // Delay between each character typing
}

function appendMessage(sender, message) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message');
  if (sender === 'user') {
    messageDiv.classList.add('user-message');
    messageDiv.innerHTML = `
      <p><strong>You:</strong> ${message}</p>
    `;
  }
  chatLog.appendChild(messageDiv);
  chatLog.scrollTop = chatLog.scrollHeight;
}

function clearMessages() {
  chatLog.innerHTML = '';
  sendButton.innerHTML = 'Send'; // Reset button text
  sendButton.disabled = false; // Re-enable the send button
}

function stopBotMessages() {
  isBotStopped = true;
  stopButton.style.backgroundColor = '#ff0000';
}
