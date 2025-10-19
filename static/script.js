const form = document.getElementById('chat-form');
const input = document.getElementById('user-input');
const submitButton = form.querySelector('button');
const chatBox = document.getElementById('chat-box');

// Array to store the conversation history
let conversationHistory = [];

form.addEventListener('submit', async function (e) {
  e.preventDefault();

  const userMessage = input.value.trim();
  if (!userMessage) return;

  // Add user message to history and display it
  appendMessage('user', userMessage);
  conversationHistory.push({ role: 'user', text: userMessage });
  input.value = '';

  // Disable form while bot is thinking
  submitButton.disabled = true;
  input.disabled = true;
  // Show a temporary "thinking" message and get a reference to it
  const thinkingMessageElement = appendMessage('bot', 'Gemini is thinking...');

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // The backend expects an object with a 'conversation' property
        conversation: conversationHistory,
      }),
    });

    if (!response.ok) {
      // Try to parse the error response from the server
      const errorResult = await response.json().catch(() => null);
      const errorMessage = errorResult?.message || 'Failed to get response from server.';
      throw new Error(errorMessage);
    }

    const result = await response.json();


    if (result.success && result.data) {
      // Update the "thinking" message with the actual response
      thinkingMessageElement.textContent = result.data;
      // Add bot response to history
      conversationHistory.push({ role: 'model', text: result.data });
    } else {
      // Handle cases where the API returns success:false or no data
      thinkingMessageElement.textContent =
        result.message || 'Sorry, no response received.';
    }
  } catch (error) {
    console.error('Error:', error);
    // Update the "thinking" message with the specific error from the API or a generic one
    thinkingMessageElement.textContent = error.message || 'Sorry, an error occurred. Please try again.';
  } finally {
    // Re-enable the form
    submitButton.disabled = false;
    input.disabled = false;
  }
});

/**
 * Appends a message to the chat box.
 * @param {string} sender - The sender of the message ('user' or 'bot').
 * @param {string} text - The message text.
 * @returns {HTMLDivElement} The message element that was appended.
 */
function appendMessage(sender, text) {
  const msg = document.createElement('div');
  msg.classList.add('message', sender);
  msg.textContent = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
  return msg; // Return the element to allow modification
}
