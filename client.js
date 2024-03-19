
let audioPlayer;
function initAudioPlayer() {
    audioPlayer = new Audio('audio/work.m4a');
}
function playSound() {
    if (!audioPlayer) {
        initAudioPlayer();
    }
    audioPlayer.play();
}

function copyToClipboard() {
    var copyText = document.getElementById("card-id");
    navigator.clipboard.writeText(copyText.textContent);
    alert("Copied the text: " + copyText.textContent);
}
let timeoutId;

function startTimeout() {
    // Clear the previous timeout
    if (timeoutId) {
        clearTimeout(timeoutId);
    }
    console.log('Timeout started');
    // Start a new timeout
    timeoutId = setTimeout(() => {
        console.log('Timeout reached');
        const form = document.getElementById('messageForm');
        form.classList.add('disabled');
        form.style.pointerEvents = 'none';
        window.location.href = './waiting.html';
    }, 50000); // 30 seconds
}

document.addEventListener('DOMContentLoaded', () => {
    const userAgent = navigator.userAgent.toLowerCase();

    if (!userAgent.includes('android') && !userAgent.includes('windows')) {
        console.log('Unsupported device',userAgent)
        window.location.href = 'sorry.html';
    } else {
        startTimeout(); // Start the timeout
        // Connect to the Socket.IO server
        const socket = io('https://getmework-2y4gxp7gca-an.a.run.app', {
            // const socket = io('http://localhost:8080', {
            withCredentials: true,
            extraHeaders: {
                "content-type": "abcd"
            },
            timeout: 5000
        });
        socket.on('connect', () => {
            const idCard = document.getElementById('card-id');
            idCard.textContent = "[" + socket.id.substr(3, 4) + "] " + socket.id;
        });
        socket.on('connect-approved', (message) => {
            const myId = socket.id;
            const ids = message.split(',');
            var dropdown = document.getElementById("dropdown");
            dropdown.innerHTML = "";
            ids.forEach(function (id) {
                var option = document.createElement("option");
                option.value = id;
                option.text = "[" + id.substr(3, 4) + "] " + id;
                if (id === myId) {
                    option.text += " (Me)";
                }
                dropdown.add(option);
            });
        });
        socket.on('connect_timeout', () => {
            alert('Connection timed out');
        });
        socket.on('receiveMessage', function (message) {
            playSound();
            const messagesList = document.getElementById('messages');
            const messageElement = document.createElement('li');
            messageElement.className = "list-group-item";
            messageElement.textContent =
                "[" + message.from.substr(3, 4) + "] " + message.message;
            messagesList.appendChild(messageElement); // Add the message to the list of messages
            startTimeout(); // Start the timeout
        });

        // Send a message when the form is submitted
        const form = document.getElementById('messageForm');
        form.addEventListener('submit', function (e) {
            e.preventDefault(); // Prevent the form from submitting in the traditional way
            const destination = document.getElementById('dropdown');
            const input = document.getElementById('messageInput');
            const message = input.value;
            socket.emit('sendMessage', { message: message, to: destination.value }); // Emit the message to the server
            input.value = ''; // Clear the input field
            startTimeout(); // Start the timeout
            return false;
        });
        const dropdown = document.getElementById('dropdown');
        dropdown.addEventListener('change', startTimeout);
    }
});