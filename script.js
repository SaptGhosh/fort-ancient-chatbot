const input = document.getElementById("question-input");
const sendButton = document.getElementById("send-button");
const chatBox = document.getElementById("chat-box");

async function sendMessage() {
    const question = input.value.trim();

    if (question === "") {
        return;
    }

    // Show user message
    addMessage(question, "user-message");

    // Clear input
    input.value = "";

    // Disable button while waiting
    sendButton.disabled = true;
    sendButton.textContent = "Thinking...";

    try {
        const response = await fetch("/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                question: question
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Something went wrong.");
        }

        addMessage(data.answer, "bot-message");

    } catch (error) {
        console.error(error);

        addMessage(
            "Sorry, something went wrong while contacting the chatbot.",
            "bot-message"
        );
    }

    // Re-enable button
    sendButton.disabled = false;
    sendButton.textContent = "Send";

    // Put cursor back in input box
    input.focus();
}

function addMessage(text, className) {
    const message = document.createElement("div");

    message.classList.add(className);

    message.textContent = text;

    chatBox.appendChild(message);

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
