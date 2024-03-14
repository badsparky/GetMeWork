function playSound() {
    var audio = document.getElementById("audioPlayer");
    audio.play();
}
function copyToClipboard() {
    var copyText = document.getElementById("card-id");
    navigator.clipboard.writeText(copyText.textContent);
    alert("Copied the text: " + copyText.textContent);
}

document.addEventListener('DOMContentLoaded', () => {
    // Connect to the Socket.IO server
    // IMPORTANT: Replace 'http://localhost:3000' with your actual server URL if different
    const socket = io('http://localhost:3000', {
        withCredentials: true,
        extraHeaders: {
            "content-type": "abcd"
        }
    });
    socket.on('connect', () => {
        const idCard = document.getElementById('card-id');
        idCard.textContent = socket.id;
    });

    // Send a message when the form is submitted
    const form = document.getElementById('messageForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent the form from submitting in the traditional way
        const destination = document.getElementById('destinationInput');
        const input = document.getElementById('messageInput');
        const message = input.value;
        socket.emit('sendMessage',{message:message,destination:destination.value}); // Emit the message to the server
        input.value = ''; // Clear the input field
        return false;
    });
    
    // Listen for messages from the server
    socket.on('receiveMessage', function(message) {
        playSound();
        const messagesList = document.getElementById('messages');
        const messageElement = document.createElement('li');
        messageElement.textContent = message;
        messagesList.appendChild(messageElement); // Add the message to the list of messages
    });
});