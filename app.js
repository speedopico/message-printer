function sendMessage() {
    const message = document.getElementById('messageInput').value;
    const wordCount = message.split(' ').filter(word => word.trim().length > 0).length;

    if (wordCount > 50) {
        alert("Please enter a message with 50 words or less.");
        return;
    }

    fetch('/print', {  // This assumes your Flask backend is served at the same domain
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: message })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('response').innerText = data.message;
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('response').innerText = 'Error sending message. Please try again.';
    });
}
