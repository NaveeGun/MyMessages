window.onload = function() {
    var params = new URLSearchParams(window.location.search);
    var chatName = params.get('name');
    var messageContainer = document.getElementById('messageContainer');

    // Update the title
    document.title = "Chat - " + chatName;

    // Display the chat name
    var chatNameElement = document.createElement('h2');
    chatNameElement.textContent = chatName;
    document.body.insertBefore(chatNameElement, messageContainer);

    // Create the back button
    var backButton = document.getElementById('backBtn');
    backButton.addEventListener('click', function() {
        window.location.href = 'index.html';
    });

    // Load messages from local storage
    var messages = getFromLocalStorage(chatName) || [];
    messages.forEach(function(message) {
        displayMessage(message.text, message.timestamp);
    });

    // Function to display a message with timestamp
    function displayMessage(message, timestamp) {
        var messageElement = document.createElement('div');
        messageElement.classList.add('message-bubble');

        // Check if the message contains a URL
        var urlRegex = /(https?:\/\/[^\s]+)/g;
        message = message.replace(urlRegex, function(url) {
            return `<a href="${url}" target="_blank">${url}</a>`;
        });

        var timestampElement = document.createElement('div');
        timestampElement.classList.add('message-timestamp');
        timestampElement.textContent = new Date(timestamp).toLocaleString();

        messageElement.innerHTML = message;
        messageElement.appendChild(timestampElement);

        messageContainer.appendChild(messageElement);
    }

    // Event listener for sending a message
    function sendMessage() {
        var messageInput = document.getElementById('messageInput');
        var messageText = messageInput.value.trim();
        if (messageText === "") {
            alert("Please enter a message.");
            return;
        }

        var timestamp = Date.now();

        // Add message to message container
        displayMessage(messageText, timestamp);

        // Save message to local storage
        var existingMessages = getFromLocalStorage(chatName) || [];
        existingMessages.push({ text: messageText, timestamp: timestamp });
        saveToLocalStorage(chatName, existingMessages);

        // Clear message input
        messageInput.value = "";
    }

    document.getElementById('sendMessageBtn').addEventListener('click', sendMessage);

    document.getElementById('messageInput').addEventListener('keydown', function(event) {
        if (event.keyCode === 13 && !event.shiftKey) {
            event.preventDefault(); // Prevent default action (e.g., line break in textarea)
            sendMessage(); // Call sendMessage function
        }
    });
};
