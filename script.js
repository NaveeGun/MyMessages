document.addEventListener('DOMContentLoaded', (event) => {
    const chatNameInput = document.getElementById('chatNameInput');
    const newChatBtn = document.getElementById('newChatBtn');
    const chatList = document.getElementById('chatList');

    // Load chats from local storage
    const chats = JSON.parse(localStorage.getItem('chats')) || [];

    // Function to display chat names in the list
    function displayChatNames() {
        chatList.innerHTML = ''; // Clear the current list
        chats.forEach(chat => {
            const li = document.createElement('li');
            li.textContent = chat;

            // Delete button for each chat
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.classList.add('delete-btn');
            deleteBtn.addEventListener('click', (event) => {
                event.stopPropagation();
                deleteChat(chat);
            });

            li.appendChild(deleteBtn);

            li.addEventListener('click', () => {
                window.location.href = `new_chat.html?name=${encodeURIComponent(chat)}`;
            });
            chatList.appendChild(li);
        });
    }

    function deleteChat(chat) {
        // Display a confirmation dialog
        if (confirm(`Are you sure you want to delete the chat "${chat}"?`)) {
            const index = chats.indexOf(chat);
            if (index > -1) {
                chats.splice(index, 1);
                localStorage.setItem('chats', JSON.stringify(chats));
                displayChatNames();
            }
        }
    }
    
    // Display chat names on load
    displayChatNames();

    // Add a new chat
    newChatBtn.addEventListener('click', () => {
        const chatName = chatNameInput.value.trim();
        if (chatName !== '') {
            if (!chats.includes(chatName)) {
                chats.unshift(chatName); // Add new chat name to the top
                localStorage.setItem('chats', JSON.stringify(chats));
                displayChatNames(); // Update the chat list
                chatNameInput.value = ''; // Clear the input field
            } else {
                alert('Chat name already exists!');
            }
        } else {
            alert('Please enter a chat name.');
        }
    });
});
