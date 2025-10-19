 Hey Bro, I need your help in implementing APIs into  a front-end file named @script.js.
    The Implementation of the API is located in @index.js file. There are request body that has  to be made, and the response format success and error results are already present there.

    So, I need your help in implementing chat APIs that are already present. On the frontend, I have form with a text input and a submit button. 

    On the frontend, I have a form with a text input and a submit button. 
    When the user submits the form, I want to:- Add the user's message to the chat box.
    - Show a temporary "Thinking..." bot message.
    - Send the user's message as a POST request to /api/chat (with body format provide in @index.js file).
        - When the response arrives, replace the "Thinking..." message with the AI's reply (from the `data` property receive from the back-end).
    - If an error occurs or no result is received, show "Sorry, no response received." or "Failed to get response from server."
    
    Can you help me write the enhance @script.js complete script.js for the frontend (Vanilla JS, no frameworks) that covers this flow, including a proper error handling and DOM manipulation provided from there?
    
    Please make sure the code is simple and production-ready!
    
    The HTML structure is:
    <form id="chat-form">  
        <input type="text" id="user-input" />  
        <button type="submit">Send</button>
    </form><div id="chat-box"></div>
    
    Make sure to focus only on  @script.js file, matching the backend API spec above. I have tested the backend and it works wonderfully.

    can you help me, bro?