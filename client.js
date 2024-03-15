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
    // const socket = io('https://getmework-2y4gxp7gca-an.a.run.app', {   
    const socket = io('http://localhost:8080', {
        withCredentials: true,
        extraHeaders: {
            "content-type": "abcd"
        },
        timeout: 5000
    });
    socket.on('connect', () => {
        const idCard = document.getElementById('card-id');
        idCard.textContent ="[" + socket.id.substr(3,4)+"] "+ socket.id;
    });
    socket.on('connect-approved', (message) => {
        const myId = socket.id;
        const ids=message.split(',');
        var dropdown = document.getElementById("dropdown");
        ids.forEach(function(id) {
            var option = document.createElement("option");
            option.value = id;
            option.text = "[" + socket.id.substr(3,4)+"] " + id;
            if (id === myId) {
                option.text += " (Me)";
            }
            dropdown.add(option);
        });
    });
    socket.on('connect_timeout', () => {
        alert('Connection timed out');
    });

    // Send a message when the form is submitted
    const form = document.getElementById('messageForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent the form from submitting in the traditional way
        const destination = document.getElementById('dropdown');
        const input = document.getElementById('messageInput');
        const message = input.value;
        socket.emit('sendMessage',{message:message,to:destination.value}); // Emit the message to the server
        input.value = ''; // Clear the input field
        return false;
    });
    
    // Listen for messages from the server
    socket.on('receiveMessage', function(message) {
        playSound();
        const messagesList = document.getElementById('messages');
        const messageElement = document.createElement('li');
        messageElement.className = "list-group-item";
        messageElement.textContent =
        "[" + message.from.substr(3,4)+"] "  + message.message;
        messagesList.appendChild(messageElement); // Add the message to the list of messages
    });
});