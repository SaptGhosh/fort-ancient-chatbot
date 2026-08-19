const input = document.getElementById("question-input");
const sendButton = document.getElementById("send-button");
const chatBox = document.getElementById("chat-box");


function sendMessage() {

    // Get what the user typed
    const question = input.value.trim();

    // Do nothing if the input is empty
    if (question === "") {
        return;
    }

    // Create a new message
    const userMessage = document.createElement("div");

    userMessage.classList.add("user-message");

    userMessage.textContent = question;

    // Add it to the chat
    chatBox.appendChild(userMessage);

    // Clear the input box
    input.value = "";

    // Scroll to the newest message
    chatBox.scrollTop = chatBox.scrollHeight;
}


// Send when button is clicked
sendButton.addEventListener("click", sendMessage);


// Send when Enter is pressed
input.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {

        sendMessage();

    }

});